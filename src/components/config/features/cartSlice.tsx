import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  // ... Other properties
}

interface CartState {
  isCartOpen: boolean;
  cart: CartItem[];
  items: any[]; // Adjust the type accordingly
}

const initialState: CartState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<{ item: CartItem }>) => {
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.map((item:any) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.map((item:any) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
