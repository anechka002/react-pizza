import type { SortType } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export interface FilterState {
  categoryId: number
  sort: SortType
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {name: 'популярности', sortProperty: 'rating'},
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectCategoryId: (state: FilterState) => state.categoryId,
    selectSort: (state: FilterState) => state.sort
  },
  reducers: (create) => ({
    setCategoryId: create.reducer<{id: number}>((state, action) => {
      state.categoryId = action.payload.id
    }),
    setSort: create.reducer<SortType>((state, action) => {
      state.sort = action.payload
    }),
  }) 
})
export default filterSlice.reducer

export const { setCategoryId, setSort } = filterSlice.actions

export const { selectCategoryId, selectSort } = filterSlice.selectors

