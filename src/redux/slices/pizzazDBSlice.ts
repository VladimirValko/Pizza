import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';

type TSort = {
  name: string;
  sortProp: 'rating' | 'price' | 'title';
}

type TPizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  count: number;
} 

type TPizzazDB = {
  pizzas: TPizza[];
  status: string;
}

type TFetchParams = {
  searchValue: string;
  categoryId: number;
  sort: TSort;
}

const initialState: TPizzazDB = { // state
  pizzas: [],
  status: '',
}

export const fetchPizzasDB = createAsyncThunk(
    //эта функция диспатчится в основном коде и возвращает action + payload
    'pizzas/fetchPizzas',
    async ( params: TFetchParams ) => {
      const { searchValue, categoryId, sort} = params;

      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      const { data } = await axios.get<TPizza[]>(`https://629778388d77ad6f7503cbba.mockapi.io/items?${category}&sortBy=${sort.sortProp}${search}`);

      return data as TPizza[] // это массив объектов с пиццами
    }
  )

// объект с логикой обработки слайса - стэйта
export const pizzasDBSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: { // setState -- экшены -- cartSlice.actions
    setPizzas(state, action: PayloadAction<TPizza[]> ){
        state.pizzas = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzasDB.pending, (state) => {
      state.status = 'loading';
    }),
    builder.addCase(fetchPizzasDB.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = 'succese';
    }),
    builder.addCase(fetchPizzasDB.rejected, (state) => {
      console.log('smthng goes wrong');
      state.pizzas = [];
    })

  }

  // extraReducers: { не работает с TS
  //   [fetchPizzasDB.pending] : (state) => {
  //       state.status = 'loading';
  //   },
  //   [fetchPizzasDB.fulfilled] : (state, action) => {
  //       // action это объект в нем есть ключ payload
  //       // payload это массив объектов с пиццами
  //       // сама функция экспортируетс отсюда и вызывается в коде
  //       state.pizzas = action.payload;
  //       state.status = 'succese';
  //   },
  //   [fetchPizzasDB.rejected] : (state) => {
  //       console.log('smthng goes wrong');
  //       state.pizzas = [];
  //   },
  // },
})

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasDBSlice.actions

export const pizzaDBSelector = (state: RootState) => state.pizzazDBReducer 

export default pizzasDBSlice.reducer