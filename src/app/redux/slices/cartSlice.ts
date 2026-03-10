import type { CartItemType } from '@/common/types'
import { calcTotalPrice, getCartFromLS, getCartItemKey } from '@/common/utils'
import { createSlice } from '@reduxjs/toolkit'

interface CartState {
  totalPrice: number
  items: CartItemType[]
}

const {items, totalPrice} = getCartFromLS()

const initialState: CartState = {
  totalPrice: totalPrice,
  items: items
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    selectTotalPrice: state => state.totalPrice,
    selectItems: state=> state.items,
    selectTotalCount: state => 
      state.items.reduce((sum, item) => sum + item.count, 0),
  },
  reducers: (create) => ({
    addItem: create.reducer<CartItemType>((state, action) => {

      const findItem = state.items.find((obj) => {
        return getCartItemKey(obj) === getCartItemKey(action.payload)
      })

      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = calcTotalPrice(state.items)
    }),

    minusItem: create.reducer<{id: string}>((state, action) => {
      const findItem = state.items.find((obj) => getCartItemKey(obj) === action.payload.id)
      if (findItem) {
        findItem.count -= 1
      }
      state.totalPrice = calcTotalPrice(state.items)
    }),

    removeItem: create.reducer<{id: string}>((state, action) => {
      state.items = state.items.filter((el) => getCartItemKey(el) !== action.payload.id)
      state.totalPrice = calcTotalPrice(state.items)
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

export const selectCartItem = (id: string, type: CartItemType['type'], size: CartItemType['size']) =>
  (state: {cart: CartState}) => state.cart.items.find((el) => getCartItemKey(el) === getCartItemKey({ id, type, size }))
