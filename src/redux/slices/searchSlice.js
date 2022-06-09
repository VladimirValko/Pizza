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
        console.log(state.searchValue + ' это state.searchValue')
        console.log(action.payload + ' это пэйлоад')
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSearchValue } = searchSlice.actions
  
  export default searchSlice.reducer