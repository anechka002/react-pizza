import { Route, Routes } from "react-router"
import { Cart, Home, NotFound } from "../pages"

export const PATH = {
  HOME: "/",
  CART: "/cart",
  NOTFOUND: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.CART} element={<Cart />} />
      <Route path={PATH.NOTFOUND} element={<NotFound />} />
    </Routes>
  )
}
