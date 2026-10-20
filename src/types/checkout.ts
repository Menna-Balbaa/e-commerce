export interface CheckoutFormValues {
    shippingAddress: {
        city: string
        details: string
        phone: string
    }
}

export interface CheckoutResponse {
    status: string
    message?: string
    session?: {
        url?: string
    }
}
