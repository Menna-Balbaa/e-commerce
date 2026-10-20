import * as z from "zod"

export const checkoutSchema = z.object({
    shippingAddress: z.object({
        city: z.string().trim()
            .nonempty("City is Required")
            .min(3, "City must be at least 3 characters")
            .max(20, "City must not exceed 20 characters"),
        details: z.string().trim()
            .nonempty("Address details are Required")
            .min(10, "Please enter your full address (at least 10 characters)")
            .max(100, "Address must not exceed 100 characters"),
        phone: z.string().trim()
            .nonempty("Phone is Required")
            .regex(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number (e.g. 01012345678)"),
    }),
})

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>