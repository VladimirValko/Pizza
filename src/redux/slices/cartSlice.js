import { createSlice } from '@reduxjs/toolkit'

const initialState = { // state
  totalPrice: 0,
  products: [],
}

// объект с логикой обработки слайса - стэйта
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: { // setState -- экшены -- cartSlice.actions
    addProduct(state, action ){
      // state.products.push(action.payload);
      // state.totalPrice = state.products.reduce((sum, obj) => {
      //   return obj.price + sum
      // }, 0)

      const foundPizza = state.products.find(obj => obj.id === action.payload.id)

      if (foundPizza) {
        foundPizza.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)
    },


    removeProduct(state, action){
      const foundPizza = state.products.find(obj => obj.id === action.payload.id)
    
      if (foundPizza && foundPizza.count !== 0) {
        foundPizza.count--;
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },

    deleteProduct(state, action){
      state.products = state.products.filter((obj) => obj.id !== action.payload)
    
      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },


    clearProducts(state){
      state.products = [];

      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, deleteProduct, clearProducts } = cartSlice.actions

export default cartSlice.reducer