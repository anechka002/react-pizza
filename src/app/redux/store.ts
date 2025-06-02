import { configureStore } from '@reduxjs/toolkit'
import { pizzasReducer } from './slices/pizzasSlice'
import { filterReducer } from './slices/filterSlice'
import { cartReducer } from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzasReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store