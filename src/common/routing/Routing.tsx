import { Route, Routes } from "react-router"
import { Cart, FullPizza, Home, NotFound } from "../pages"

export const PATH = {
  HOME: "/",
  CART: "/cart",
  PIZZA: "/pizza/:id",
  NOTFOUND: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home/>} />
      <Route path={PATH.CART} element={<Cart />} />
      <Route path={PATH.PIZZA} element={<FullPizza />} />
      <Route path={PATH.NOTFOUND} element={<NotFound />} />
    </Routes>
  )
}
