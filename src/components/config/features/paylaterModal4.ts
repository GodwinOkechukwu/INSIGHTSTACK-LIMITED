import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isAliasOpen: false,
};

export const paylaterModal4Slice = createSlice({
  name: 'paylaterModal4',
  initialState,
  reducers: {
    togglePaylaterModal4: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleAliasModal: (state) => {
      state.isAliasOpen = !state.isAliasOpen;
    },
  },
});

export const { togglePaylaterModal4, toggleAliasModal } = paylaterModal4Slice.actions;

export default paylaterModal4Slice.reducer;