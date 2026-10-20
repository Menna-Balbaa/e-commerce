import { LoginSchemaType, RegisterSchemaType } from "@/lib/schema/auth.schema"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function signUpUser(formData: RegisterSchemaType) {
    const response = await fetch (`${BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function signInUser(formData: LoginSchemaType) {
    const response = await fetch (`${BASE_URL}/api/v1/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
