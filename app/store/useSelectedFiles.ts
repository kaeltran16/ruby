import { Selection } from '@nextui-org/react';
import { create } from 'zustand';

type State = {
  selectedFiles: Selection;
};

type Action = {
  setSelectedFiles: (selectedFiles: State['selectedFiles']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSelectedFileStore = create<State & Action>((set) => ({
  selectedFiles: new Set<string>([]),
  setSelectedFiles: (selectedFiles) => set(() => ({ selectedFiles }))
}));
