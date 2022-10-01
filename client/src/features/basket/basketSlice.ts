import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/Basket";
import { getCookie } from "../../app/util/util";

export interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
  'basket/fetchBasketAsync',
  async (_, thunkAPI) => {
      try {
          return await agent.Basket.get();
      } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
      }
  },
  {
      condition: () => {
          if (!getCookie('buyerId')) return false;
      }
  }
)

//createAsyncThunk<return, input parameter, {}>
//thunkAPI.rejectWithValue ส่ง axios Intercepters
export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.RemoveItem(productId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
}); 

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
      state.basket = action.payload;
      state.status = 'idle';
    });
    builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
        console.log(action.payload);
        state.status = 'idle';
    });

  },
});

// Action creators are generated for each case reducer function
export const { setBasket, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
