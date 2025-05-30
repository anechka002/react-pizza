import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../redux/slices/filterSlice'
import cartReducer from '../redux/slices/cartSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store