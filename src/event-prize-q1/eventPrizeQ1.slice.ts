import { boolean } from 'yup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ICountryTableValue, IFormCreateProvince, StateProps } from "./interface";
import { GridRowId } from "@mui/x-data-grid";

const initialState: StateProps = {
    fields: [],
    formStartDate: null,
    formEndDate: null,
    provinceInFo: {},
    isStoreExclusion: false,
    isStoreGroupExclusion: false,
    isCustomerExclusion: false,
    isCustomerGroupExclusion:false,
    crmTypeIdEdit: 0,
    giftIdEdit: 0,
    openConfirmDelete: false,
    idPrizeDelete: 0,
    countPrizeEvent: 0,
    countPrizeProvince: 0,
    rowProvinceId: null,
    statusPrize: true,
    prizeQuantityChange: null
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
        },
        setGiftIdEdit: (state, action: PayloadAction<number>) => {
            state.giftIdEdit = action.payload;
        },
        setOpenConfirmDelete: (state) => {
            state.openConfirmDelete = true
        },
        setCloseConfirmDelete: (state) => {
            state.openConfirmDelete = false
        },
        setIdPrizeDelete: (state, action: PayloadAction<number>) => {
            state.idPrizeDelete = action.payload;
        },
        setCountPrizeEvent: (state, action: PayloadAction<number>) => {
            state.countPrizeEvent = action.payload;
        },
        setCountPrizeProvince: (state, action: PayloadAction<number>) => {
            state.countPrizeProvince = action.payload;
        },
        setRowProvinceId: (state, action: PayloadAction<GridRowId | null>) => {
            state.rowProvinceId = action.payload;
        },
        setStatusPrize: (state, action: PayloadAction<boolean>) => {
            state.statusPrize = action.payload;
        },
        setPrizeQuantityChange: (state, action: PayloadAction<number | null>) => {
            state.prizeQuantityChange = action.payload;
        }
    }
})

export const {
    handleAddNewRow,
    handleRemoveRow,
    setFormStartDate,
    setFormEndDate,
    setProvinceInFo,
    setIsStoreExclusion,
    setIsStoreGroupExclusion,
    setIsCustomerExclusion,
    setIsCustomerGroupExclusion,
    setCrmTypeIdEdit,
    setGiftIdEdit,
    setOpenConfirmDelete,
    setCloseConfirmDelete,
    setIdPrizeDelete,
    setCountPrizeEvent,
    setCountPrizeProvince,
    setRowProvinceId,
    setStatusPrize,
    setPrizeQuantityChange
} = eventPrizeQ1Slice.actions;

export const setProvinceInFoSelector = (state: RootState) =>
    state.eventPrizeQ1.provinceInFo;

export default eventPrizeQ1Slice.reducer;