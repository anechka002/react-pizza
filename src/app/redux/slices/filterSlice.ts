import type { SortType } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export interface FilterState {
  categoryId: number
  sort: SortType
  search: string
  currentPage: number
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {name: 'популярности', sortProperty: 'rating'},
  search: '',
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectCategoryId: (state: FilterState) => state.categoryId,
    selectSort: (state: FilterState) => state.sort,
    selectSearch: (state: FilterState) => state.search,
    selectCurrentPage: (state: FilterState) => state.currentPage,
  },
  reducers: (create) => ({
    setCategoryId: create.reducer<{id: number}>((state, action) => {
      state.categoryId = action.payload.id
    }),
    setSort: create.reducer<SortType>((state, action) => {
      state.sort = action.payload
    }),
    setSearch: create.reducer<{value: string}>((state, action) => {
      state.search = action.payload.value
    }),
    setCurrentPage: create.reducer<{value: number}>((state, action) => {
      state.currentPage = action.payload.value
    }),
    setFilters: create.reducer<{currentPage: number, categoryId: number, sort: SortType}>((state, action) => {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
    }),
    
  }) 
})
export const filterReducer = filterSlice.reducer

export const { setCategoryId, setSort, setSearch, setCurrentPage, setFilters } = filterSlice.actions

export const { selectCategoryId, selectSort, selectSearch, selectCurrentPage } = filterSlice.selectors

