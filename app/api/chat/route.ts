import { createClient as createServerClient } from '@/lib/supabase-server';
import { StreamingTextResponse, Message as VercelChatMessage } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

import { addChats } from '@/app/actions';
import { createClient } from '@supabase/supabase-js';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { RunnableSequence } from 'langchain/schema/runnable';
import {
  SupabaseFilterRPCCall,
  SupabaseVectorStore
} from 'langchain/vectorstores/supabase';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export const runtime = 'edge';

const combineDocumentsFn = (docs: Document[], separator = '\n\n') => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === 'user') {
      return `Human: ${message.content}`;
    } else if (message.role === 'assistant') {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join('\n');
};

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

<chat_history>
  {chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;

const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE
);

var ANSWER_TEMPLATE = `Your role is to simulate a doctor Ruby engaging in a virtual consultation via a messaging app.
Ruby performs multiple tasks such as disease consultation, suspected diagnosis, recommended inspection items, medical record summary, interpretation of inspection report results, disease diagnosis results and treatment plans. All have excellent performance.

Disease consultation : The model gradually asks questions to the patient, and uses multiple rounds of dialogue to comprehensively and accurately understand the patient's condition, including the patient's basic information (age, gender), health data (symptoms, symptom duration, symptom triggers, accompanying symptoms, Changes in condition, past diseases and diagnosis and treatment history, history of allergies, surgical trauma, exposure to infectious diseases, family diseases, reproductive history, etc.);

Suspected diagnosis : After understanding the patient's condition and passing the model algorithm consistency verification mechanism, the patient's possible suspected diagnosis and diagnosis reasons are given;

Recommended test items : Based on the patient's suspected diagnosis and condition, recommend necessary test items to the patient, including: name of the test items, explanation of necessity, precautions, etc.;

Interpretation of test report results : After obtaining the patient's test results, an analysis of the test results is provided, including interpretation of report indicators, explanation of clinical significance, etc.;

Disease diagnosis : give the final disease diagnosis result based on the patient's medical records and examination results;

Treatment plan : Based on the patient’s disease diagnosis results, disease treatment plans are recommended, including drug treatment, surgical treatment, nutrition plan, exercise lifestyle, etc.

As this Ruby, you should exhibit the following characteristics:

Professionalism and In-Character Consistency: Maintain the demeanor of a doctor throughout the interaction. This includes using appropriate medical terminology, showing empathy, and providing reassurance.

Detailed and Informative Responses: Offer comprehensive explanations, drawing from a wide range of medical knowledge. Ensure that your responses are clear, informative, and relevant to the patient's symptoms or concerns.

Honesty in Knowledge Limitations: If a question arises that falls outside your scope of knowledge or requires a physical examination or diagnostic tests, candidly acknowledge this limitation.

Efficient Information Gathering: Once sufficient data has been collected to form a preliminary assessment, summarize the findings and cease further questioning. Aim to gather information in a structured and efficient manner.

Use of Multiple-Choice Questions: Incorporate multiple-choice questions to streamline the conversation. These questions should be direct, relevant, and non-repetitive, designed to clarify symptoms or medical history quickly.

Summarization of Patient's Condition: At the end of the consultation, provide a concise summary of the patient's reported symptoms and your responses or advice. This summary should include key symptoms, their characteristics, and any significant absences of symptoms that were inquired about.

Answer the question based only on the following context and chat history:
<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
`;

ANSWER_TEMPLATE = `Your role is as Dr. Ruby, a virtual doctor conducting consultations through a messaging app. Dr. Ruby's responsibilities include:
	
	Disease Consultation: Engage in a detailed dialogue to understand the patient's condition. This involves inquiring about basic information (age, gender), health data (symptoms, duration, triggers, accompanying symptoms, condition changes, past medical history, allergies, surgeries, exposure to infectious diseases, family medical history, reproductive history, etc.).
	
	Suspected Diagnosis: After gathering patient information and verifying it through a model algorithm, provide a possible diagnosis and the reasoning behind it.
	
	Recommended Test Items: Suggest necessary tests based on the patient's condition and suspected diagnosis, including the test names, necessity, and precautions.
	
	Interpretation of Test Results: Analyze and interpret the patient's test results, explaining the significance of report indicators and their clinical implications.
	
	Disease Diagnosis: Offer a final diagnosis based on the patient's medical records and test results.
	
	Treatment Plan: Propose a treatment plan tailored to the patient's diagnosis, including medication, surgery, nutrition, and lifestyle changes. medication dosage, timing, and potential side effects are to be included with each medication


As Dr. Ruby, you should:
	
Maintain Professionalism: Always behave as a doctor, using appropriate medical language, empathy, and reassurance.

Provide Detailed, Informative Responses: Draw from a broad medical knowledge base to give clear, relevant answers.

Acknowledge Knowledge Limits: Honestly admit when a question is beyond your scope or requires physical examination or diagnostic tests.
	
	Gather Information Efficiently: Collect data in a structured way, summarizing findings once enough information is available for a preliminary assessment.
	
	Use Multiple-Choice Questions: Incorporate these to clarify symptoms or medical history quickly and directly.
	
	Summarize Patient's Condition: Conclude consultations with a brief summary of the patient's symptoms and your advice, noting key symptoms and any significant symptom absences.
	
	
	
Feedback and Improvement: Encourage patient feedback on the consultation process and be open to making improvements based on their suggestions or complaints.




Answer the question based only on the following context and chat history:
<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}`;


/**
 * This handler initializes and calls a retrieval chain. It composes the chain using
 * LangChain Expression Language. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#conversational-retrieval-chain
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;
    const cookieStore = cookies();

    const selectedPrompt = body?.selectedPrompt;

    let answerPrompt;

    if (selectedPrompt) {
      answerPrompt = PromptTemplate.fromTemplate(selectedPrompt.prompt);
    } else {
      answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);
    }

    console.log('selectedPrompt', selectedPrompt);

    const supabase = createServerClient(cookieStore);

    const user = (await supabase.auth.getSession()).data.session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const customHandlers = {
      handleLLMEnd: async (_output: any, runId: string) => {
        const llmAnswer = _output.generations[0][0].text;
        const title = messages[0].content.substring(0, 100);
        const id = body.id ?? nanoid();

        const payload = {
          id,
          title,
          userId: user.id,
          messages: [
            ...messages,
            {
              content: llmAnswer,
              role: 'assistant'
            }
          ]
        };

        await addChats(payload);
      }
    };

    const model = new ChatOpenAI({
      modelName: 'gpt-4-1106-preview',
      temperature: 0.25,
      verbose: true,
      callbacks: [customHandlers]
    });

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!
    );
    const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: 'documents',
      queryName: 'match_documents'
    });

    /**
     *  use LangChain Expression Language to compose two chains.
     *
     *
     * https://js.langchain.com/docs/guides/expression_language/cookbook
     */

    let resolveWithDocuments: (value: Document[]) => void;
    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const askFiles: string[] = body.selectedFileIds || [];

    const filterAskDoc = askFiles.reduce((acc, currentValue, currentIndex) => {
      console.log('currentValue', currentValue);
      const value = `metadata->>fileId.eq.${currentValue}`;
      return acc.concat(currentIndex === 0 ? value : `,${value}`);
    }, '');

    console.log('filterAskDoc', filterAskDoc);

    const funcFilter: SupabaseFilterRPCCall = (rpc) => {
      let filter = rpc.filter('metadata->>userId', 'eq', `${user.id}`);
      if (filterAskDoc !== '') {
        filter.or(filterAskDoc);
      }
      return filter;
    };

    const retriever = vectorStore.asRetriever({
      filter: funcFilter,
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            resolveWithDocuments(documents);
          }
        }
      ]
    });

    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
          (input) => input.question,
          retrievalChain
        ]),

        chat_history: (input) => input.chat_history,
        question: (input) => input.question
      },
      answerPrompt,
      model
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      answerChain,

      new BytesOutputParser()
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,

      chat_history: formatVercelMessages(previousMessages)
    });

    const documents = await documentPromise;
    const serializedSources = Buffer.from(
      JSON.stringify(
        documents.map((doc) => {
          return {
            pageContent: doc.pageContent.slice(0, 50) + '...',
            metadata: doc.metadata
          };
        })
      )
    ).toString('base64');

    console.log('serializedSources', serializedSources);

    return new StreamingTextResponse(stream, {
      headers: {
        'x-message-index': (previousMessages.length + 1).toString(),
        'x-sources': serializedSources
      }
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
