import { SortProperty } from '@/common/enum/enum'
import type { SortType } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

interface FilterState {
  categoryId: number
  sort: SortType
  searchValue: string
  currentPage: number
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {name: 'популярности', sortProperty: SortProperty.RATING_DESC},
  searchValue: '',
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectCategoryId: state => state.categoryId,
    selectSort: state => state.sort,
    selectSearchValue: state=> state.searchValue,
    selectCurrentPage: state => state.currentPage,
  },
  reducers: (create) => ({
    setCategoryId: create.reducer<{id: number}>((state, action) => {
      state.categoryId = action.payload.id
    }),
    setSort: create.reducer<SortType>((state, action) => {
      state.sort = action.payload
    }),
    setSearchValue: create.reducer<{value: string}>((state, action) => {
      state.searchValue = action.payload.value
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

export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } = filterSlice.actions

export const { selectCategoryId, selectSort, selectSearchValue, selectCurrentPage } = filterSlice.selectors

