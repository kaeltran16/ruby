'use client';

import { useUploadedFileStore } from '@/app/store/useUploadedFiles';
import { cn } from '@/lib/utils';
import { Spinner } from '@nextui-org/react';
import { type UseChatHelpers } from 'ai/react';
import { nanoid } from 'nanoid';
import { FC, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { buttonVariants } from './ui/button';
import { IconCheck, IconClip, IconClose } from './ui/icons';

interface FileUploaderProps
  extends Pick<UseChatHelpers, 'setMessages' | 'messages' | 'reload'> {
  onUploadFinished?: () => void;
}

const FileUploader: FC<FileUploaderProps> = ({
  onUploadFinished,
  setMessages,
  messages,
  reload
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewUploadedFiles = useUploadedFileStore(
    (state) => state.addNewUploadedFiles
  );

  const uploadFile = async (e: any) => {
    let files = [...e.target.files];

    console.log('file', files);

    const file = files[0];

    setMessages([
      ...messages,
      {
        id: nanoid(),
        content: `*${file.name} is uploading*`,
        role: 'system',
        ui: <Spinner />
      }
    ]);

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    console.log('file', file);

    const response = await fetch('/api/process-pdf', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('process pdf api');
      toast.success('File uploaded');
      setIsUploading(false);
      addNewUploadedFiles();
      setMessages([
        ...messages,
        {
          id: nanoid(),
          content: `*${file.name} is uploaded*`,
          role: 'system',
          ui: <IconCheck fill='green' className='h-8 w-8' />
        }
      ]);
      if (onUploadFinished) {
        onUploadFinished();
      }
    } else {
      toast.error('Error uploading file');
      setMessages([
        ...messages,
        {
          id: nanoid(),
          content: `*${file.name} failed to upload*`,
          role: 'system',
          ui: <IconClose fill='red' className='h-8 w-8' />
        }
      ]);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
        className={cn(
          buttonVariants({ size: 'sm', variant: 'outline' }),
          'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
        )}
      >
        <IconClip className='h-6 w-6' />
        <span className='sr-only'>New Chat</span>
      </button>
      <input
        ref={inputRef}
        type='file'
        onChange={uploadFile}
        className='hidden'
      />
    </>
  );
};

export default FileUploader;
