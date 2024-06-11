'use client';
import { getUserUploadedFiles } from '@/app/actions';
import { useSelectedFileStore } from '@/app/store/useSelectedFiles';
import { useUploadedFileStore } from '@/app/store/useUploadedFiles';

import { formatDate, truncateString } from '@/lib/utils';
import { Listbox, ListboxItem, ScrollShadow } from '@nextui-org/react';
import { FileObject } from '@supabase/storage-js';
import { FC, ReactNode, useEffect, useState } from 'react';
import { IconPDF, IconTXT } from './ui/icons';

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <ScrollShadow
    hideScrollBar
    className='border-small overflow-y-auto h-full px-1 py-2 rounded-small border-default-200 dark:border-default-100'
  >
    {children}
  </ScrollShadow>
);

interface UploadedFilesProps {
  // selectedKeys: Set<string>;
  // setSelectedKeys: Dispatch<SetStateAction<Set<string>>>;
}

export interface UploadedFileItemProps {
  item: FileObject;
}

const UploadedFiles: FC<UploadedFilesProps> = ({}) => {
  const [files, setFiles] = useState<FileObject[]>();

  const newUploadedFiles = useUploadedFileStore(
    (state) => state.newUploadedFiles
  );

  useEffect(() => {
    console.log('fetching');
    console.log('uploaded files', newUploadedFiles);

    const fetchFiles = async () => {
      const uploaded = await getUserUploadedFiles();
      console.log('files uploaded', uploaded);
      setFiles(uploaded);
    };

    fetchFiles();
  }, [newUploadedFiles]);

  const selectedFiles = useSelectedFileStore((state) => state.selectedFiles);
  const setSelectedFiles = useSelectedFileStore(
    (state) => state.setSelectedFiles
  );

  const iconFactory = (type: string) => {
    const iconClasses =
      'text-xl text-default-500 pointer-events-none flex-shrink-0';
    switch (type) {
      case 'application/pdf':
        return <IconPDF className={iconClasses} />;
      case 'text/plain':
        return <IconTXT className={iconClasses} />;
      default:
        return <span>icon</span>;
    }
  };

  console.log('selectedFiles', selectedFiles);

  return (
    <div className='flex flex-col h-full'>
      <h2 className='text-xl font-bold text-center mb-8 mt-4'>
        Uploaded Files
      </h2>
      <ListboxWrapper>
        {files && files?.length > 0 ? (
          <Listbox
            aria-label='Multiple selection example'
            variant='flat'
            selectionMode='multiple'
            selectedKeys={selectedFiles}
            disallowEmptySelection={false}
            onSelectionChange={setSelectedFiles}
          >
            {files && files?.length > 0 ? (
              files.map((item) => (
                <ListboxItem
                  key={item.id}
                  description={formatDate(item.created_at)}
                  startContent={iconFactory(item.metadata.mimetype)}
                >
                  {truncateString(item.name, { maxLength: 30 })}
                </ListboxItem>
              ))
            ) : (
              <ListboxItem key='empty-item'>No item</ListboxItem>
            )}
          </Listbox>
        ) : (
          <div className='p-8 text-center'>
            <p className='text-sm text-muted-foreground'>No uploaded file</p>
          </div>
        )}
      </ListboxWrapper>
    </div>
  );
};

export default UploadedFiles;
