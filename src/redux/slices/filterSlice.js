import { createSlice } from '@reduxjs/toolkit'

const initialState = { // state
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
    setCategoryId(state, action ){
      state.categoryId = action.payload
    },
    setSortType(state, action){
      state.sort = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer