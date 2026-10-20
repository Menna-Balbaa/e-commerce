
import type { CheckoutFormValues, CheckoutResponse } from "@/types/checkout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function onlineCheckout(cartId: string, formData: CheckoutFormValues, token: string, origin: string) {
    const response = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token,
        },
        body: JSON.stringify(formData),
    })
    const data: CheckoutResponse = await response.json()

    if (!response.ok) {
        throw new Error(data.message ?? "Unable to create checkout session.")
    }

    return data
}

export async function cashCheckout(cartId: string, formData: CheckoutFormValues, token: string) {
    const response = await fetch(`${BASE_URL}/api/v2/orders/${cartId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token,
        },
        body: JSON.stringify(formData),
    })
    const data: CheckoutResponse = await response.json()

    if (!response.ok) {
        throw new Error(data.message ?? "Unable to create order.")
    }

    return data
}

