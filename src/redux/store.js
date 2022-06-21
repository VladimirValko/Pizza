import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import searchReducer from './slices/searchSlice'
import cartReducer from './slices/cartSlice';
import pizzazDBReducer from './slices/pizzazDBSlice';


export const store = configureStore({
  reducer: { 
    filterReducer,
    searchReducer,
    cartReducer,
    pizzazDBReducer,
  }
});