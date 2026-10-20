import Link from 'next/link'
import { ArrowLeft, Receipt, ShoppingBag } from 'lucide-react'
import { Banknote, Check, CreditCard, ShieldCheck, Wallet } from 'lucide-react'
import { House, Info} from 'lucide-react'
import OrderSummary from '@/components/cart/orderSummary'
import { getUserCart } from '@/actions/cart.action'
import { CartI } from '@/types/cart'
import CheckoutForm from '@/components/checkout/checkoutForm'

export default async function Checkout() {

    let cartData: CartI | null = null
    try {
        cartData = await getUserCart()
    } catch {
        cartData = null
    }

    // No cart / empty cart -> friendly empty state instead of a broken checkout form
    if (!cartData?.data?.products?.length) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <div className="flex size-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <ShoppingBag className="size-12" />
                </div>
                <h1 className="mt-6 text-2xl font-bold text-gray-900">Your cart is empty</h1>
                <p className="mt-2 max-w-md text-gray-500">
                    You need at least one product in your cart before you can check out.
                </p>
                <Link
                    href="/products"
                    className="mt-6 rounded-md bg-green-700 px-6 py-3 text-lg font-medium text-white hover:bg-green-800"
                >
                    Start Shopping
                </Link>
            </main>
        )
    }

    const itemsCount = cartData.numOfCartItems
    const total = cartData.data.totalCartPrice

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-gray-500">
                    <Link href="/" className="hover:text-green-600">Home</Link>
                    <span>/</span>
                    <Link href="/cart" className="hover:text-green-600">Cart</Link>
                    <span>/</span>
                    <span className="text-gray-900">Checkout</span>
                </nav>

                {/* Title */}
                <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-white">
                                <Receipt className="size-8" />
                            </div>
                            <h1 className="text-[33px] font-bold text-gray-900">Complete Your Order</h1>
                        </div>
                        <p className="mt-2 text-md text-gray-600">Review your items and complete your purchase</p>
                    </div>

                    <Link href="/cart" className="flex items-center gap-2 pt-4 text-green-600 transition hover:text-green-700">
                        <ArrowLeft className="size-4" />
                        Back to Cart
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
                    {/* Forms */}
                    <div className="flex flex-col gap-8 lg:col-span-2">
                        {/* Shipping address */}
                        <section className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                            {/* Header */}
                            <div className="bg-linear-to-r from-green-600 to-green-700 px-7 py-5 text-white">
                                <h2 className="flex items-center gap-2 text-lg font-bold">
                                    <House className="size-5" />
                                    Shipping Address
                                </h2>
                                <p className="mt-1 text-[15px] text-green-100">Where should we deliver your order?</p>
                            </div>

                            <div className="flex flex-col gap-6 p-7">
                                {/* Notice */}
                                <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                    <Info className="mt-0.5 size-5 shrink-0 text-blue-500" />
                                    <div>
                                        <p className="font-semibold text-sm text-blue-700">Delivery Information</p>
                                        <p className="text-xs text-blue-600">Please ensure your address is accurate for smooth delivery</p>
                                    </div>
                                </div>

                                <CheckoutForm cartId={cartData.cartId} />
                            </div>
                        </section>

                        {/* Payment method */}
                        <section className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                            {/* Header */}
                            <div className="bg-linear-to-r from-green-600 to-green-700 px-7 py-6 text-white">
                                <h2 className="flex items-center gap-3 text-xl font-bold">
                                    <Wallet className="size-5" />
                                    Payment Method
                                </h2>
                                <p className="mt-1 text-green-100">Choose how you&apos;d like to pay</p>
                            </div>

                            <div className="flex flex-col gap-5 p-7">
                                {/* Cash on delivery */}
                                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-gray-200 p-5 transition has-checked:border-green-600 has-checked:bg-green-50">
                                    <input type="radio" name="paymentMethod"  form="checkout-form"  value="cash" defaultChecked className="peer sr-only" />
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition peer-checked:bg-green-600 peer-checked:text-white">
                                        <Banknote className="size-6" />
                                    </span>
                                    <span className="flex-1">
                                        <span className="block font-semibold text-gray-900 transition peer-checked:text-green-700">Cash on Delivery</span>
                                        <span className="block text-sm text-gray-500">Pay when your order arrives at your doorstep</span>
                                    </span>
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 text-white transition peer-checked:border-green-600 peer-checked:bg-green-600">
                                        <Check className="size-3.5 opacity-0 peer-checked:opacity-100" strokeWidth={4} />
                                    </span>
                                </label>

                                {/* Online payment */}
                                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-gray-200 p-5 transition has-checked:border-green-600 has-checked:bg-green-50">
                                    <input type="radio" name="paymentMethod"  form="checkout-form"  value="online" className="peer sr-only" />
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition peer-checked:bg-green-600 peer-checked:text-white">
                                        <CreditCard className="size-6" />
                                    </span>
                                    <span className="flex-1">
                                        <span className="block font-semibold text-gray-900 transition peer-checked:text-green-700">Pay Online</span>
                                        <span className="block text-sm text-gray-500">Secure payment with Credit/Debit Card via Stripe</span>
                                        <span className="mt-2 flex items-center gap-2">
                                            <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">VISA</span>
                                            <span className="rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">MC</span>
                                            <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[10px] font-bold text-white">AMEX</span>
                                        </span>
                                    </span>
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 text-white transition peer-checked:border-green-600 peer-checked:bg-green-600">
                                        <Check className="size-3.5 opacity-0 peer-checked:opacity-100" strokeWidth={4} />
                                    </span>
                                </label>

                                {/* Security notice */}
                                <div className="flex gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Secure &amp; Encrypted</p>
                                        <p className="text-sm text-green-700">Your payment info is protected with 256-bit SSL encryption</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Summary */}
                    <OrderSummary
                        mode="checkout"
                        itemsCount={itemsCount}
                        total={total}
                        products={cartData.data.products}
                    />
                </div>
            </div>
        </main>
    )
}