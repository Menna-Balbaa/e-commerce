import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Name must be atleast 3 characters").max(12, "Name must not exceed 12 characters"),
    email: z.email("Email must be a valid one").nonempty("Email is Required"),
    password: z.string().nonempty("Password is required").regex(/^.{8,}$/ , "Password must be at least 8 charecters"),
    rePassword: z.string().nonempty("Confirm password is Required"),
    phone: z.string().nonempty("Phone is Required").regex(/^01[0125][0-9]{8}$/)

}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "RePassword must match with Password"
})


export const loginSchema = z.object({
    email: z.email("Email must be a valid one").nonempty("Email is Required"),
    password: z.string().nonempty("Password is required").regex(/^.{8,}$/ , "Password must be at least 8 charecters"),
})


export type RegisterSchemaType = z.infer<typeof registerSchema>

export type LoginSchemaType = z.infer<typeof loginSchema>

