import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface searchDataStateProps {
    data: any;
}

const initialState: searchDataStateProps = {
    data: '',

};

export const searchDataState = createSlice({
    name: "searchDataStateType",
    initialState,
    reducers: {
        setSearchDataState: (state, action: PayloadAction<searchDataStateProps>) => {
            state.data = action?.payload?.data;
        }
    }
});

export const { setSearchDataState } = searchDataState.actions;

export default searchDataState.reducer;