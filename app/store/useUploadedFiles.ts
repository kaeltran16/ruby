import { create } from 'zustand';

type State = {
  newUploadedFiles: number;
};

type Action = {
  addNewUploadedFiles: () => void;
  setNewUploadedFiles: (quantity: number) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUploadedFileStore = create<State & Action>((set) => ({
  newUploadedFiles: 0,
  setNewUploadedFiles: (quantity) =>
    set(() => ({ newUploadedFiles: quantity })),
  addNewUploadedFiles: () =>
    set((state) => ({ newUploadedFiles: state.newUploadedFiles + 1 }))
}));
