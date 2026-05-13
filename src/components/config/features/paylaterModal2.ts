import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isAliasOpen: false,
};

export const paylaterModal2Slice = createSlice({
  name: 'paylaterModal2',
  initialState,
  reducers: {
    togglePaylaterModal2: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleAliasModal: (state) => {
      state.isAliasOpen = !state.isAliasOpen;
    },
  },
});

export const { togglePaylaterModal2, toggleAliasModal } = paylaterModal2Slice.actions;

export default paylaterModal2Slice.reducer;
