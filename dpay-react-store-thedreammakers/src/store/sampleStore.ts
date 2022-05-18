import create from "zustand";

interface SampleState {
  sampleString: string;
  setSampleString: (content: string) => void;
  sampleNumber: number;
  increaseSampleNumber: () => void;
}

const useStore = create<SampleState>((set) => ({
  sampleString: "샘플",
  setSampleString: (content: string) =>
    set((state) => ({ sampleString: content })),
  sampleNumber: 0,
  increaseSampleNumber: () =>
    set((state) => ({ sampleNumber: state.sampleNumber + 1 })),
}));

export default useStore;
