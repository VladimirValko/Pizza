import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string; 
  type: string; 
  sizes: number; 
  price: number; 
  count: number; 
  imageUrl: string;
}

type TCartState = {
  totalPrice: number;
  products: TCartItem[];
}

const initialState: TCartState = { // state
  totalPrice: 0,
  products: [],
}

// объект с логикой обработки слайса - стэйта
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: { // setState -- экшены -- cartSlice.actions
    addProduct(state, action: PayloadAction<TCartItem> ){ // PayloadAction<> что хранит пэйлоад
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


    removeProduct(state, action: PayloadAction<TCartItem>){
      const foundPizza = state.products.find(obj => obj.id === action.payload.id)
    
      if (foundPizza && foundPizza.count !== 0) {
        foundPizza.count--;
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },

    deleteProduct(state, action: PayloadAction<string> ){
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

export const  cartReducer = (state: RootState) => state.cartReducer;
export const  selectCartItemById = (id: string) => (state: RootState) => state.cartReducer.products.find((obj) => obj.id === id)

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, deleteProduct, clearProducts } = cartSlice.actions

export default cartSlice.reducer