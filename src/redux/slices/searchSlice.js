import { createSlice } from '@reduxjs/toolkit'

const initialState = { // state
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

  export const searchSelector = (state) => state.searchReducer.searchValue
  
  export default searchSlice.reducer