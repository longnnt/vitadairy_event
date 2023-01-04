import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ICountryTableValue, IFormCreateProvince, StateProps } from "./interface";

const initialState: StateProps = {
    fields: [],
    formStartDate: null,
    formEndDate: null,
    provinceInFo: {},
    openDeleteModal: false,
    isStoreExclusion: false,
    isStoreGroupExclusion: false,
    isCustomerExclusion: false,
    isCustomerGroupExclusion:false,
    crmTypeIdEdit: 0
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
        },
        setProvinceInFo: (state, action: PayloadAction<IFormCreateProvince>) => {
            state.provinceInFo = action.payload;
        },
        setOpenDeleteModal: (state) => {
            state.openDeleteModal = true
        },
        setCloseDeleteModal: (state) => {
            state.openDeleteModal = false;
        },
        setIsStoreExclusion: (state, action: PayloadAction<boolean>) => {
            state.isStoreExclusion = action.payload;
        },
        setIsStoreGroupExclusion: (state, action: PayloadAction<boolean>) => {
            state.isStoreGroupExclusion = action.payload;
        },
        setIsCustomerExclusion: (state, action: PayloadAction<boolean>) => {
            state.isCustomerExclusion = action.payload;
        },
        setIsCustomerGroupExclusion: (state, action: PayloadAction<boolean>) => {
            state.isCustomerGroupExclusion = action.payload
        },
        setCrmTypeIdEdit: (state, action: PayloadAction<number>) => {
            state.crmTypeIdEdit = action.payload;
        }
    }
})

export const {
    handleAddNewRow,
    handleRemoveRow,
    setFormStartDate,
    setFormEndDate,
    setProvinceInFo,
    setOpenDeleteModal,
    setCloseDeleteModal,
    setIsStoreExclusion,
    setIsStoreGroupExclusion,
    setIsCustomerExclusion,
    setIsCustomerGroupExclusion,
    setCrmTypeIdEdit
} = eventPrizeQ1Slice.actions;

export const setProvinceInFoSelector = (state: RootState) =>
    state.eventPrizeQ1.provinceInFo;

export default eventPrizeQ1Slice.reducer;