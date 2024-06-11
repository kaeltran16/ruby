'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-hot-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { IconEdit, IconSpinner, IconTrash } from '@/components/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ServerActionResult } from '@/lib/types';
import { Tables } from '@/types/supabase';

interface PromptItemActionProps {
  prompt: Tables<'prompts'>;
  removePrompt: (id: string) => ServerActionResult<void>;
  openDialog: () => void;
}

export function PromptItemAction({
  prompt,
  removePrompt,
  openDialog
}: PromptItemActionProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isRemovePending, startRemoveTransition] = React.useTransition();

  return (
    <>
      <div className='space-x-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              className='w-6 h-6 p-0 hover:bg-background'
              onClick={() => openDialog()}
            >
              <IconEdit />
              <span className='sr-only'>Edit</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit prompt</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              className='w-6 h-6 p-0 hover:bg-background'
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className='sr-only'>Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete prompt</TooltipContent>
        </Tooltip>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your prompt and remove your data from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemovePending}
              onClick={(event) => {
                event.preventDefault();
                // @ts-ignore
                startRemoveTransition(async () => {
                  const result = await removePrompt(prompt.id);

                  if (result && 'error' in result) {
                    toast.error(result.error);
                    return;
                  }

                  setDeleteDialogOpen(false);
                  router.refresh();
                  router.push('/');
                  toast.success('Chat deleted');
                });
              }}
            >
              {isRemovePending && <IconSpinner className='mr-2 animate-spin' />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
