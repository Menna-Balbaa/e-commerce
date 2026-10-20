const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getALLProducts() {
    const response = await fetch (`${BASE_URL}/api/v1/products`)
    const data = await response.json()
    return data
}

export async function getSpecificProduct(id:string) {
    const response = await fetch (`${BASE_URL}/api/v1/products/${id}`)
    const data = await response.json()
    return data
}

export async function getProductsByBrand(brandId:string) {
    const response = await fetch (`${BASE_URL}/api/v1/products?brand=${brandId}`)
    const data = await response.json()
    return data
}

export async function getProductsByCategory(categoryId:string) {
    const response = await fetch (`${BASE_URL}/api/v1/products?category[in]=${categoryId}`)
    const data = await response.json()
    return data
}
