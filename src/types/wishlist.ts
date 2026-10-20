import { ProductI } from "./product"

export interface WishlistI {
  status: string
  count: number
  data: ProductI[]
}

export interface WishlistMutationI {
  status: string
  message: string
  data: string[]
}
