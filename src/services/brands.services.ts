const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getALLBrands() {
    const response = await fetch (`${BASE_URL}/api/v1/brands`)
    const data = await response.json()
    return data
}

export async function getSpecificBrand(id:string) {
    const response = await fetch (`${BASE_URL}/api/v1/brands/${id}`)
    const data = await response.json()
    return data
}