import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isAliasOpen: false,
};

export const paylaterPlanModalSlice = createSlice({
  name: 'paylaterPlanModal',
  initialState,
  reducers: {
    togglePaylaterPlanModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleAliasModal: (state) => {
      state.isAliasOpen = !state.isAliasOpen;
    },
  },
});

export const { togglePaylaterPlanModal, toggleAliasModal } = paylaterPlanModalSlice.actions;

export default paylaterPlanModalSlice.reducer;