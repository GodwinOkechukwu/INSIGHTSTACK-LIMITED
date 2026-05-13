import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface payLaterDataStateProps {
    data?: any;
}

const initialState: payLaterDataStateProps = {
    data: '',

};

export const payLaterDataState = createSlice({
    name: "payLaterDataStateType",
    initialState,
    reducers: {
        setPayLaterDataState: (state, action: PayloadAction<payLaterDataStateProps>) => {
            state.data = action?.payload?.data;
        }
    }
});

export const { setPayLaterDataState } = payLaterDataState.actions;

export default payLaterDataState.reducer;