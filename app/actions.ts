'use server';
import { Chat } from '@/lib/types';
import { createClient } from './../lib/supabase-server';

import { supabase } from '@/lib/supabase';
import { Json, Tables } from '@/types/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getChats(userId: string) {
  console.log('getting chats for userId', userId);

  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('userId', userId)
    .order('updated_at', { ascending: false });

  console.log('chats are', data);

  if (error) {
    console.error('Error getting chats from supabase', error);
    return [];
  }
  return data as unknown as Chat[];
}

export async function getChat(id: string, userId: string): Promise<Chat> {
  console.log(`getting chat for chat id ${id} and userId ${userId}`);

  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('id', id)
    .eq('userId', userId)
    .maybeSingle();

  console.log('chat is', data);

  if (error) {
    console.error('Error getting chat', error);
    throw new Error('error trying to get single chat');
  }
  return data as unknown as Chat;
}

export async function addChats(
  payload: Pick<Chat, 'id' | 'userId' | 'title' | 'messages'>
) {
  console.info('adding new chat for user', payload.userId);

  console.log('add chat payload', payload);

  const { error } = await supabase.from('chats').upsert({
    ...payload,
    messages: payload.messages as unknown as Json[]
  });

  if (error) {
    console.error('Error adding chats to supabase', error);
    throw new Error('error trying to add chats to supabase');
  }
}

export async function removeChat(id: string) {
  const cookieStore = cookies();

  const supabaseServer = createClient(cookieStore);

  const user = (await supabaseServer.auth.getUser()).data.user;

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: chat, error: getChatError } = await supabase
    .from('chats')
    .select()
    .eq('id', id)
    .maybeSingle();

  console.log('get chat from removeChat', chat);

  if (getChatError) {
    console.error(getChatError);
    throw new Error(
      `error getting chat with id ${id}: ${getChatError.message}`
    );
  }

  if (chat?.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  const { error: removeChatError } = await supabase
    .from('chats')
    .delete()
    .eq('id', id);

  if (removeChatError) {
    console.error('cannot remove chat due to', removeChatError);
    throw new Error(`error when remove chat ${id}: removeChatError.message`);
  }

  revalidatePath('/');
  return revalidatePath(`/chat/${id}`);
}

export async function clearChats() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    console.log('Unauthorized');
    throw new Error('Unauthorized');
  }

  const { error: removeChatError } = await supabase
    .from('chats')
    .delete()
    .eq('userId', user.id);

  if (removeChatError) {
    console.error(`error removing chats: ${removeChatError}`);
    throw new Error(`error removing chats due to ${removeChatError.message}`);
  }

  revalidatePath('/');
  return redirect('/');
}

export const getSharedChat = async (id: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('error getting chat', error);
    throw new Error(`error getting chat with id ${id}: ${error.message}`);
  }

  return data as unknown as Chat;
};

export async function shareChat(id: string) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    console.error('Unauthorized');
    return {
      error: 'Unauthorized'
    };
  }

  const { data: chat, error: getChatError } = await supabase
    .from('chats')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (getChatError) {
    console.error('error getting chat', getChatError);
    return {
      error: 'Something went wrong'
    };
  }

  if (!chat) {
    console.error('chat is empty');
    return {
      error: 'Something went wrong'
    };
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  };

  const { data, error } = await supabase
    .from('chats')
    .upsert(payload)
    .select()
    .single();

  if (error) {
    console.error(`error add sharePath to chat ${id}`, error);
    return {
      error: 'Something went wrong'
    };
  }

  return data as unknown as Chat;
}

export async function getUserUploadedFiles() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error('Unauthorized');
  }

  // const { data, error } = await supabase.storage.from('uploads').list(user.id);

  const { data, error } = await supabase.storage.from('uploads').list(user.id);

  if (error) {
    console.error(`cannot get uploaded files for user ${user.id}`);
    throw new Error(`cannot get uploaded files for user ${user.id}`);
  }

  return data;
}

export async function getPrompts() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const user = await (await supabase.auth.getSession()).data.session?.user;

  if (!user) {
    throw new Error('Unauthorized');
  }

  console.log('getting chats for userId', user.id);

  const { data, error } = await supabase
    .from('prompts')
    .select()
    .eq('userId', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error getting prompts from supabase', error);
    throw new Error('error trying get prompts');
  }
  return data;
}

export async function addPrompt(
  payload: Omit<Tables<'prompts'>, 'updated_at' | 'inserted_at'>
) {
  const { data, error } = await supabase
    .from('prompts')
    .upsert(payload)
    .select()
    .single();
  if (error) {
    console.error('Error adding prompts to supabase', error);
    throw new Error('error trying to add prompts to supabase');
  }
  revalidatePath('/');

  return data;
}

export async function getPrompt(id: string, userId: string) {
  const { data, error } = await supabase
    .from('prompts')
    .select()
    .eq('id', id)
    .eq('userId', userId)
    .maybeSingle();

  if (error) {
    console.error('Error getting prompt', error);
    throw new Error('error trying to get single prompt');
  }
  return data;
}

export async function removePrompt(id: string) {
  const cookieStore = cookies();

  const supabaseServer = createClient(cookieStore);

  const user = (await supabaseServer.auth.getUser()).data.user;

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data, error: getPromptError } = await supabase
    .from('prompts')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (getPromptError) {
    throw new Error(
      `error getting prompt with id ${id}: ${getPromptError.message}`
    );
  }

  if (data?.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  const { error: removePromptError } = await supabase
    .from('prompts')
    .delete()
    .eq('id', id);

  if (removePromptError) {
    throw new Error(
      `error when remove prompt ${id}: ${removePromptError.message}`
    );
  }

  revalidatePath('/');
}
