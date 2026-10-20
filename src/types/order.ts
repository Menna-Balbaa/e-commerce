export interface OrderItemI {
  _id: string
  count: number
  price: number
  product: { _id: string; title: string; imageCover: string }
}

export interface OrderI {
  _id: string
  id: number
  totalOrderPrice: number
  paymentMethodType: "cash" | "card"
  isPaid: boolean
  isDelivered: boolean
  createdAt: string
  shippingAddress?: { details: string; phone: string; city: string }
  cartItems: OrderItemI[]
}
