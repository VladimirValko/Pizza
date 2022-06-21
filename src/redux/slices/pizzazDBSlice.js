import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = { // state
  pizzas: [],
  status: '',
}

export const fetchPizzasDB = createAsyncThunk(
    //эта функция диспатчится в основном коде и возвращает action + payload
    'pizzas/fetchPizzas',
    async (_, {getState}) => {
      const {categoryId, sort} = getState().filterReducer;
      const { searchValue } = getState().searchReducer;

      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      const { data } = await axios.get(`https://629778388d77ad6f7503cbba.mockapi.io/items?${category}&sortBy=${sort.sortProp}${search}`);

      return data // это массив объектов с пиццами
    }
  )

// объект с логикой обработки слайса - стэйта
export const pizzasDBSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: { // setState -- экшены -- cartSlice.actions
    setPizzas(state, action ){
        state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzasDB.pending] : (state) => {
        state.status = 'loading';
    },
    [fetchPizzasDB.fulfilled] : (state, action) => {
        // action это объект в нем есть ключ payload
        // payload это массив объектов с пиццами
        // сама функция экспортируетс отсюда и вызывается в коде
        state.pizzas = action.payload;
        state.status = 'succese';
    },
    [fetchPizzasDB.rejected] : (state) => {
        console.log('smthng goes wrong');
        state.pizzas = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasDBSlice.actions

export const pizzaDBSelector = (state) => state.pizzazDBReducer 

export default pizzasDBSlice.reducer