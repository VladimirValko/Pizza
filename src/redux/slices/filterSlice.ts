import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TSort = {
  name: string;
  sortProp: 'rating' | 'price' | 'title';
}

type TFilterState = {
  categoryId: number;
  sort: TSort
}

const initialState: TFilterState = { // state
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProp: 'rating',
  }
}

// объект с логикой обработки слайса - стэйта
export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: { // setState -- экшены -- filterSlice.actions
    setCategoryId(state, action: PayloadAction<number>){
      state.categoryId = action.payload
    },
    setSortType(state, action: PayloadAction<TSort>){
      state.sort = action.payload
    },
    setURLFilters(state, action: PayloadAction<TFilterState>){
      state.categoryId = action.payload.categoryId
      state.sort = action.payload.sort
      console.log(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setURLFilters } = filterSlice.actions

export const filterSelector = (state: RootState) => state.filterReducer
export const filterSelectorSort = (state: RootState) => state.filterReducer.sort


export default filterSlice.reducer