'use client';
import { addPrompt } from '@/app/actions';
import { useSelectedPromptStore } from '@/app/store/useSelectedPrompt';
import { Tables } from '@/types/supabase';
import { ScrollShadow, cn, useDisclosure } from '@nextui-org/react';
import { User } from '@supabase/supabase-js';
import { FC } from 'react';
import toast from 'react-hot-toast';
import LLMPromptDialog from './llm-prompt-dialog';
import { PromptItem } from './prompt-item';
import { Button, buttonVariants } from './ui/button';
import { IconPlus } from './ui/icons';

export interface LLMPromptProps {
  prompts: Tables<'prompts'>[];
  user: User;
}

const LLMPrompt: FC<LLMPromptProps> = ({ prompts, user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const [selectedPrompt, setSelectedPrompt] = useState<Tables<'prompts'>>();

  const selectedPrompt = useSelectedPromptStore(
    (state) => state.selectedPrompt
  );
  const setSelectedPrompt = useSelectedPromptStore(
    (state) => state.setSelectedPrompt
  );

  // TODO: get from store instead of hard code

  // const selectedPrompt = prompts[0];

  // useEffect(() => {
  //   setSelectedPrompt(prompts[0]);
  // }, []);

  const handleSubmit = async (
    prompt: Pick<Tables<'prompts'>, 'name' | 'description' | 'prompt' | 'id'>
  ) => {
    try {
      console.log(
        `Submitted with value ${prompt.name}, ${prompt.prompt}, ${prompt.description}`
      );

      const added = await addPrompt({
        ...prompt,
        userId: user.id
      });

      setSelectedPrompt(added);
      toast.success('New prompt added');
    } catch (e) {
      toast.error('Adding new prompt failed');
    }
  };

  const handleNewPrompt = () => {
    setSelectedPrompt(undefined);
    onOpen();
  };

  return (
    <>
      <div className='flex flex-col h-full gap-4'>
        <h2 className='text-xl font-bold text-center mt-4 mb-2'>Prompts</h2>
        <Button
          onClick={handleNewPrompt}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none dark:text-white transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
          )}
        >
          <IconPlus className='-translate-x-2 stroke-2 dark:text-white' />
          New Prompt
        </Button>

        <ScrollShadow
          hideScrollBar
          className='flex flex-col gap-2 grow overflow-auto'
        >
          {prompts.map((item, index) => (
            <PromptItem
              isActive={item.id === selectedPrompt?.id}
              index={index}
              key={`prompt-${item.id}`}
              prompt={item}
              onOpen={onOpen}
            />
          ))}
        </ScrollShadow>
      </div>

      <LLMPromptDialog
        prompt={selectedPrompt}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default LLMPrompt;
