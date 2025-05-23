import { Route, Routes } from "react-router"
import { Cart, Home, NotFound } from "../pages"

export const PATH = {
  HOME: "/",
  CART: "/cart",
  NOTFOUND: '*',
} as const

type Props = {
  searchValue: string
}

export const Routing = ({searchValue}: Props) => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home searchValue={searchValue} />} />
      <Route path={PATH.CART} element={<Cart />} />
      <Route path={PATH.NOTFOUND} element={<NotFound />} />
    </Routes>
  )
}
