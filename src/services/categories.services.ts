const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getALLCategories() {
    const response = await fetch (`${BASE_URL}/api/v1/categories`)
    const data = await response.json()
    return data
}

export async function getSpecificCategory(id:string) {
    const response = await fetch (`${BASE_URL}/api/v1/categories/${id}`)
    const data = await response.json()
    return data
}