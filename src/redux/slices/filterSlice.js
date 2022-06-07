import { createSlice } from '@reduxjs/toolkit'

const initialState = { // state
  value: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState, //value: 0,
  reducers: { // setState
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = filterSlice.actions

export default filterSlice.reducer