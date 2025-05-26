import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../redux/slices/filterSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store