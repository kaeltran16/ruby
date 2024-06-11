'use client';

import { CreateMessage, useChat, type Message } from 'ai/react';

import { useSelectedFileStore } from '@/app/store/useSelectedFiles';
import { useSelectedPromptStore } from '@/app/store/useSelectedPrompt';
import { ChatList } from '@/components/chat-list';
import { ChatPanel } from '@/components/chat-panel';
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor';
import { EmptyScreen } from '@/components/empty-screen';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import { ScrollShadow } from '@nextui-org/react';
import { ChatRequestOptions } from 'ai';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  console.log('render chat component');
  const router = useRouter();
  const path = usePathname();
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  );
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW);
  const [previewTokenInput, setPreviewTokenInput] = useState(
    previewToken ?? ''
  );

  const selectedFiles = useSelectedFileStore((state) => state.selectedFiles);

  const selectedFileIds = useMemo(
    () => Array.from(selectedFiles),
    [selectedFiles]
  );

  const selectedPrompt = useSelectedPromptStore(
    (state) => state.selectedPrompt
  );

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput,
    setMessages
  } = useChat({
    initialMessages,
    id,
    body: {
      id,
      previewToken
    },
    sendExtraMessageFields: true,
    onResponse(response) {
      console.log('call onResponse on chat page');
      console.log('response', response);

      if (response.status === 401) {
        toast.error(response.statusText);
      }
    },
    onFinish(message) {
      console.log('onFinish on chat page');
      console.log('messages', messages);
      console.log('onFinish message', message);
      if (!path.includes('chat')) {
        router.push(`/chat/${id}`, { scroll: false });
        router.refresh();
      }
    }
  });

  const appendWithAdditionalData = (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ): Promise<string | null | undefined> => {
    return append(message, {
      ...chatRequestOptions,
      options: {
        body: {
          selectedFileIds,
          selectedPrompt: selectedPrompt
        }
      }
    });
  };
  return (
    <div className='flex flex-col w-full h-full'>
      <ScrollShadow
        className={cn(
          'w-full grow overflow-y-auto no-scrollbar pt-20',
          className
        )}
      >
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </ScrollShadow>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={appendWithAdditionalData}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        setMessages={setMessages}
      />
    </div>
  );
}
