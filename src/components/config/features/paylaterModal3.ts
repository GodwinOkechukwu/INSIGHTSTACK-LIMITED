import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isAliasOpen: false,
};

export const paylaterModal3Slice = createSlice({
  name: 'paylaterModal3',
  initialState,
  reducers: {
    togglePaylaterModal3: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleAliasModal: (state) => {
      state.isAliasOpen = !state.isAliasOpen;
    },
  },
});

export const { togglePaylaterModal3, toggleAliasModal } = paylaterModal3Slice.actions;

export default paylaterModal3Slice.reducer;
