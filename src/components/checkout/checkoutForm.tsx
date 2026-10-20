"use client"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Building2, Check, MapPin, Phone } from 'lucide-react'
import { cashPayment, onlinePayment } from '@/actions/checkout.action'
import { checkoutSchema, CheckoutSchemaType } from '@/lib/schema/checkout.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react'
import { CartContext } from '@/context/cartContext'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

type CheckoutFormProps = {
    cartId: string
}

export default function CheckoutForm({ cartId }: CheckoutFormProps) {

    const router = useRouter()
    const { handleCart } = useContext(CartContext)!
    const [orderPlaced, setOrderPlaced] = useState(false)
    const { control, handleSubmit } = useForm({
        mode: "all",
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        }
    })

    function goHome() {
        setOrderPlaced(false)
        router.push("/")
        router.refresh()
    }

    useEffect(() => {
        if (!orderPlaced) return
        const timer = setTimeout(() => {
            setOrderPlaced(false)
            router.push("/")
            router.refresh()
        }, 3000)
        return () => clearTimeout(timer)
    }, [orderPlaced, router])

   async function submitData(formData: CheckoutSchemaType, event?: BaseSyntheticEvent) {
    const form = event?.target as HTMLFormElement
    const method = new FormData(form).get("paymentMethod")

    try {
        // Cash on delivery
        if (method === "cash") {
            const response = await cashPayment(cartId, formData)

            if (response.status !== "success") {
                toast.error(response.message ?? "Unable to place your order.")
                return
            }

            await handleCart()
            setOrderPlaced(true) 
            return
        }

        // Online payment 
        const response = await onlinePayment(cartId, formData)

        if (response.status !== "success" || !response.session?.url) {
            toast.error(response.message ?? "Unable to start checkout.")
            return
        }

        window.location.assign(response.session.url)
    } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to place your order.")
    }
}

    const inputBase =
        "w-full rounded-xl border-2 bg-white py-4 ps-16 pe-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4"
    const ok = "border-gray-200 focus:border-green-600 focus:ring-green-100"
    const bad = "border-red-400 focus:border-red-500 focus:ring-red-100"
    const iconBox =
        "pointer-events-none absolute start-3 flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500"

    return (
        <>
        <form id="checkout-form" onSubmit={handleSubmit(submitData)} className="flex flex-col gap-6">
            {/* City */}
            <Controller
                name="shippingAddress.city"
                control={control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="city" className="text-base font-semibold text-gray-800">
                            City <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative flex items-center">
                            <span className={iconBox}><Building2 className="size-5" /></span>
                            <input
                                id="city"
                                type="text"
                                placeholder="e.g. Cairo, Alexandria, Giza"
                                className={`${inputBase} ${fieldState.error ? bad : ok}`}
                                {...field}
                            />
                        </div>
                        <FieldError errors={[fieldState.error]} />
                    </Field>
                )}
            />

            {/* Street address */}
            <Controller
                name="shippingAddress.details"
                control={control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="details" className="text-base font-semibold text-gray-800">
                            Street Address <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative">
                            <span className={`${iconBox} top-3`}><MapPin className="size-5" /></span>
                            <textarea
                                id="details"
                                rows={4}
                                placeholder="Street name, building number, floor, apartment..."
                                className={`${inputBase} resize-none ${fieldState.error ? bad : ok}`}
                                {...field}
                            />
                        </div>
                        <FieldError errors={[fieldState.error]} />
                    </Field>
                )}
            />

            {/* Phone */}
            <Controller
                name="shippingAddress.phone"
                control={control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="phone" className="text-base font-semibold text-gray-800">
                            Phone Number <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative flex items-center">
                            <span className={iconBox}><Phone className="size-5" /></span>
                            <input
                                id="phone"
                                type="tel"
                                inputMode="tel"
                                placeholder="01xxxxxxxxx"
                                className={`${inputBase} sm:pe-44 ${fieldState.error ? bad : ok}`}
                                {...field}
                            />
                            <span className="pointer-events-none absolute inset-e-4 hidden text-sm text-gray-400 sm:block">
                                Egyptian numbers only
                            </span>
                        </div>
                        <FieldError errors={[fieldState.error]} />
                    </Field>
                )}
            />
        </form>

        <Dialog open={orderPlaced} onOpenChange={(open) => { if (!open) goHome() }}>
            <DialogContent className="max-w-sm text-center">
                <DialogHeader className="items-center">
                    <span className="mb-2 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="size-8" strokeWidth={3} />
                    </span>
                    <DialogTitle className="text-xl">Order placed successfully 🎉</DialogTitle>
                    <DialogDescription>
                        Thank you for your order. You will pay in cash when it arrives at your door.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
    )
}