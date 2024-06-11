import { Tables } from '@/types/supabase';
import { create } from 'zustand';

type State = {
  selectedPrompt: Tables<'prompts'> | undefined;
};

type Action = {
  setSelectedPrompt: (selectedPrompt: State['selectedPrompt']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSelectedPromptStore = create<State & Action>((set) => ({
  selectedPrompt: undefined,
  setSelectedPrompt: (selectedPrompt) => set(() => ({ selectedPrompt }))
}));
