import { createSlice } from '@reduxjs/toolkit'

const initialState = { // state
  totalPrice: 0,
  products: [],
}

// объект с логикой обработки слайса - стэйта
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: { // setState -- экшены -- filterSlice.actions
    addProduct(state, action ){
      state.products.push(action.payload);
    },
    removeProduct(state, action){
        state.products = state.products.filter(obj => obj.id !== action.payload);
    },
    clearProducts(state, action){
        state.products = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, setSoremoveProduct, clearProducts } = cartSlice.actions

export default cartSlice.reducer