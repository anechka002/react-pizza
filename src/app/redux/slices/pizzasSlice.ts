import type { LoadingType, PizzasParams, PizzasType } from '@/common/types'
import { pizzasApi } from '../api/pizzasApi'
import { createAppSlice } from '@/common/utils'

export interface PizzaState {
  items: PizzasType[]
  status: LoadingType
}

const initialState: PizzaState = {
  items: [],
  status: 'idle' as LoadingType,
}

export const pizzasSlice = createAppSlice({
  name: 'pizza',
  initialState,
  selectors: {
    selectPizzas: state => state.items,
    selectStatus: state => state.status
  },
  reducers: (create) => ({
    // action
    getPizzas: create.reducer<PizzasType[]>((state, action) => {
      state.items = action.payload
    }),
    // async action (thunk)
    fetchPizza: create.asyncThunk(async(params: PizzasParams, thunkAPI) => {
      try {
        const res = await pizzasApi.getPizzas(params)
        return res.data
      } catch (error) {
        return thunkAPI.rejectWithValue(null)
      }
    }, {
      pending: (state) => {
        state.status = 'loading'
        state.items = []
      },
      fulfilled: (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      },
      rejected: (state) => {
        state.status = 'failed'
        state.items = []
      }
    }),
  }) 
})
export const pizzasReducer = pizzasSlice.reducer

export const { fetchPizza } = pizzasSlice.actions

export const { selectPizzas, selectStatus } = pizzasSlice.selectors

