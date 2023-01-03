import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountryTableValue, StateProps } from "./interface";

const initialState: StateProps = {
    fields: [],
    formStartDate: null,
    formEndDate: null
}

export const eventPrizeQ1Slice = createSlice({
    name: 'event-q1',
    initialState,
    reducers: {
        setFormStartDate: (state, action: PayloadAction<string | null>) => {
            state.formStartDate = action.payload
        },
        setFormEndDate: (state, action: PayloadAction<string | null>) => {
            state.formEndDate = action.payload
        },
        handleAddNewRow: (state, action: PayloadAction<ICountryTableValue>) => {
            state.fields.push(action.payload)
        },
        handleRemoveRow: (state, action: PayloadAction<string>) => {
            state.fields = state.fields.filter((item) => item?.id !== action.payload)
        }
    }
})

export const {
    handleAddNewRow,
    handleRemoveRow,
    setFormStartDate,
    setFormEndDate
} = eventPrizeQ1Slice.actions;

export default eventPrizeQ1Slice.reducer;