import { ProductI } from "./product"

export interface CartI {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartDataI
}

export interface CartDataI {
  _id: string
  cartOwner: string
  products: CartProducttI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProducttI {
  count: number
  _id: string
  product: ProductI
  price: number
}

