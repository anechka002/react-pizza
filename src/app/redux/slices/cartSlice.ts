import type { CartItemType } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  totalPrice: number
  items: CartItemType[]
}

const initialState: CartState = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    selectTotalPrice: (state: CartState) => state.totalPrice,
    selectItems: (state: CartState) => state.items,
    selectTotalCount: (state: CartState) => 
      state.items.reduce((sum, item) => sum + item.count, 0),
  },
  reducers: (create) => ({
    addItem: create.reducer<CartItemType>((state, action) => {

      const {id, size, type} = action.payload

      const findItem = state.items.find((obj) => {
        return obj.id === id //&& obj.size === size && obj.type === type
      })

      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + (item.price * item.count)
      }, 0)
    }),
    minusItem: create.reducer<{id: string}>((state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count -= 1
      }
    }),
    removeItem: create.reducer<{id: string}>((state, action) => {
      state.items = state.items.filter((el) => el.id !== action.payload.id)
    }),
    clearItems: create.reducer((state) => {
      state.items = []
      state.totalPrice = 0
    }),
  }) 
})
export const cartReducer = cartSlice.reducer

export const { addItem, removeItem, minusItem, clearItems} = cartSlice.actions

export const { selectTotalPrice, selectItems, selectTotalCount } = cartSlice.selectors

export const selectCartItem = (id: string) => (state: {cart: CartState}) => state.cart.items.find((el) => el.id === id)