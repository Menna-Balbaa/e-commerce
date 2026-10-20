const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getUserOrders(userId: string, token: string) {
    const response = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
        method: "GET",
        headers: { token },
        cache: "no-store",
    })
    if (!response.ok) throw new Error("Unable to load your orders.")
    return response.json()
}
