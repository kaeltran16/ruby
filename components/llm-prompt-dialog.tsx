'use client';
import { Tables } from '@/types/supabase';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@nextui-org/react';
import { FC, useMemo, useState } from 'react';
import { v4 } from 'uuid';

export interface LLMPromptDialogProps {
  prompt?: Tables<'prompts'>;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  handleSubmit: ({
    name,
    description,
    prompt
  }: Pick<Tables<'prompts'>, 'name' | 'description' | 'prompt' | 'id'>) => void;
}

const LLMPromptDialog: FC<LLMPromptDialogProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  prompt,
  handleSubmit
}) => {
  console.log('prompt', prompt);

  const [name, setName] = useState(prompt?.name || '');
  const [description, setDescription] = useState(prompt?.description || '');
  const [content, setContent] = useState(prompt?.prompt || '');
  const [id, setId] = useState(prompt?.id || v4());

  console.log('name', name);

  useMemo(() => {
    setName(prompt?.name || '');
    setDescription(prompt?.description || '');
    setContent(prompt?.prompt || '');
    setId(prompt?.id || v4());
  }, [prompt]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                New Prompt
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label='Name'
                  placeholder='Enter prompt name'
                  variant='bordered'
                />
                <Input
                  label='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Enter prompt description'
                  variant='bordered'
                />
                <Textarea
                  label='Prompt'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Enter prompt'
                  minRows={10}
                  variant='bordered'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={() => {
                    handleSubmit({
                      name,
                      description,
                      prompt: content,
                      id: id
                    });

                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LLMPromptDialog;
