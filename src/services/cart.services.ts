
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function addProductToCart(productId : string, token : string) {
    const response = await fetch (`${BASE_URL}/api/v2/cart`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            token : token
    },
    body : JSON.stringify({productId})
    })
    const data = await response.json()
    return data
}

export async function getLoggedUserCart(token : string) {
    const response = await fetch (`${BASE_URL}/api/v2/cart`, {
        method : "GET",
        headers : {
            token : token
    },
    })
    const data = await response.json()
    return data
}

export async function removeProductFromCart(productId : string, token : string) {
    const response = await fetch (`${BASE_URL}/api/v2/cart/${productId}`, {
        method : "DELETE",
        headers : {
            token : token
    },
    })
    const data = await response.json()
    return data
}

export async function updateCartProductQuantity(productId : string, count : number, token : string) {
    const response = await fetch (`${BASE_URL}/api/v2/cart/${productId}`, {
        method : "PUT",
        headers : {
            token : token,
            "Content-Type": "application/json",
    },
    body :  JSON.stringify({count})
    })
    const data = await response.json()
    return data
}

export async function clearLoggedUserCart(token : string) {
    const response = await fetch (`${BASE_URL}/api/v2/cart`, {
        method : "DELETE",
        headers : {
            token : token
    },
    })
    const data = await response.json()
    return data
}

