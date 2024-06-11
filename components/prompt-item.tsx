'use client';

import { motion } from 'framer-motion';

import { removePrompt } from '@/app/actions';
import { useSelectedPromptStore } from '@/app/store/useSelectedPrompt';
import { Button, buttonVariants } from '@/components/ui/button';
import { IconPrompt } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import { PromptItemAction } from './prompt-item-action';

interface PromptItemProp {
  index: number;
  prompt: Tables<'prompts'>;
  onOpen: () => void;
  isActive: boolean;
  // children: React.ReactNode;
}

export function PromptItem({
  index,
  prompt,
  onOpen,
  isActive
}: PromptItemProp) {
  // const pathname = usePathname();

  // const isActive = pathname === `/chat/${chat.id}`;

  const setSelectedPrompt = useSelectedPromptStore(
    (state) => state.setSelectedPrompt
  );

  const shouldAnimate = index === 0 && isActive;

  if (!prompt?.id) return null;

  const handleClick = () => {
    setSelectedPrompt(isActive ? undefined : prompt);
  };

  return (
    <motion.div
      className='relative h-8'
      variants={{
        initial: {
          height: 0,
          opacity: 0
        },
        animate: {
          height: 'auto',
          opacity: 1
        }
      }}
      initial={shouldAnimate ? 'initial' : undefined}
      animate={shouldAnimate ? 'animate' : undefined}
      transition={{
        duration: 0.25,
        ease: 'easeIn'
      }}
    >
      <div className='absolute left-2 top-1 flex h-6 w-6 items-center justify-center'>
        <IconPrompt className='mr-2 dark:fill-white' />
      </div>
      <Button
        onClick={handleClick}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full px-8 bg-transparent transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10 dark:text-white text-start',
          isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
        )}
      >
        <div
          className='relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all'
          title={prompt.name}
        >
          <span className='whitespace-nowrap'>
            {shouldAnimate ? (
              prompt.name.split('').map((character, index) => (
                <motion.span
                  key={index}
                  variants={{
                    initial: {
                      opacity: 0,
                      x: -100
                    },
                    animate: {
                      opacity: 1,
                      x: 0
                    }
                  }}
                  initial={shouldAnimate ? 'initial' : undefined}
                  animate={shouldAnimate ? 'animate' : undefined}
                  transition={{
                    duration: 0.25,
                    ease: 'easeIn',
                    delay: index * 0.05,
                    staggerChildren: 0.05
                  }}
                >
                  {character}
                </motion.span>
              ))
            ) : (
              <span>{prompt.name}</span>
            )}
          </span>
        </div>
      </Button>
      {isActive && (
        <div className='flex absolute right-2 top-1'>
          <PromptItemAction
            prompt={prompt}
            removePrompt={removePrompt}
            openDialog={onOpen}
          />
        </div>
      )}
    </motion.div>
  );
}
