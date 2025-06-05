import { PATH } from "@/common/routing/Routing"
import type { PizzasType } from "@/common/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import s from './FullPizza.module.scss'

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
    <div className={s.root}>
      <img className={s.img} src={pizza.imageUrl} alt="pizza" />
      <h2 className={s.title}>{pizza.title}</h2>
      <p className={s.desc}>{pizza.desc}</p>
    </div>
  )
}
