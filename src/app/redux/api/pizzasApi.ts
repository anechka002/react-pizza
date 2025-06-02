import type { PizzasParams, PizzasType } from "@/common/types"
import axios from "axios"

export const pizzasApi = {
  getPizzas(params: PizzasParams) {
    return axios.get<PizzasType[]>(`https://682df928746f8ca4a47b67c3.mockapi.io/items`, { params })
  },
  
}