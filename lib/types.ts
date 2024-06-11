import { Tables } from '@/types/supabase';
import { type Message } from 'ai';

export interface Chat extends Omit<Tables<'chats'>, 'messages'> {
  messages: Message[];
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;
