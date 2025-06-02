import { PATH } from "@/common/routing/Routing"
import type { PizzasType } from "@/common/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export const FullPizza = () => {

  const [pizza, setPizza] = useState<PizzasType>()

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function getPizza() {
      try {       
        const res = await axios.get(`https://682df928746f8ca4a47b67c3.mockapi.io/items/${id}`)
        setPizza(res.data)
      } catch (error) {
        alert('Ошибка при получении пиццы!')
        navigate(PATH.HOME)
      }
    }

    getPizza()
  }, [])

  if(!pizza) {
    return 'Загрузка...'
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}
