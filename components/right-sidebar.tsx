import { getPrompts } from '@/app/actions';
import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import LLMPrompt from './llm-prompt';
import UploadedFiles from './uploaded-files';

const RightSidebar = async () => {
  const prompts = await getPrompts();

  const cookieStore = cookies();

  const supabase = await createClient(cookieStore);

  const user = (await supabase.auth.getSession()).data.session?.user;

  // TODO: handle UnAuthorized
  if (!user) {
    return;
  }

  console.log('prompts', prompts);

  return (
    <div className='flex flex-col'>
      <div className='h-3/5'>
        <UploadedFiles />
      </div>
      <div className='h-2/5'>
        <LLMPrompt user={user} prompts={prompts} />
      </div>
    </div>
  );
};

export default RightSidebar;
