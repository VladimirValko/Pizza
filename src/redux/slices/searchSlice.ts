import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TSearchState = {
  searchValue: string;
}

const initialState: TSearchState = { // state
    searchValue: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: { // setState -- экшены -- filterSlice.actions
        setSearchValue(state, action ){
        state.searchValue = action.payload
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSearchValue } = searchSlice.actions

  export const searchSelector = (state: RootState) => state.searchReducer.searchValue
  
  export default searchSlice.reducer