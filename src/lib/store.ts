import { create } from 'zustand';

interface ConversionState {
  category: string;
  fromUnit: string;
  toUnit: string;
  value: string;
  setCategory: (category: string) => void;
  setFromUnit: (unit: string) => void;
  setToUnit: (unit: string) => void;
  setValue: (value: string) => void;
}

export const useConversionStore = create<ConversionState>((set) => ({
  category: 'length',
  fromUnit: 'meters',
  toUnit: 'feet',
  value: '',
  setCategory: (category) => set({ category }),
  setFromUnit: (fromUnit) => set({ fromUnit }),
  setToUnit: (toUnit) => set({ toUnit }),
  setValue: (value) => set({ value }),
}));