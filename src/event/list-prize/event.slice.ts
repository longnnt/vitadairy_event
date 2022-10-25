import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  filterName: string;
};

const initialState: StateProps = {
  filterName: '',
};

export const listPrizeEventSlice = createSlice({
  name: 'eventAdmin',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
  },
});

export const { setFilterName } = listPrizeEventSlice.actions;
export const filterNameSelector = (state: RootState) => state.listPrize.filterName;
export default listPrizeEventSlice.reducer;
