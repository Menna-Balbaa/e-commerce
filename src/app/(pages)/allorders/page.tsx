import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ChevronDown, Clock, CreditCard, Banknote, MapPin, PackageCheck, Phone, ShoppingBag } from "lucide-react"
import { getServerToken, getUserIdFromToken } from "@/lib/auth"
import { getUserOrders } from "@/services/orders.services"
import type { OrderI } from "@/types/order"

export default async function AllOrders() {
    const token = await getServerToken()
    const userId = token ? getUserIdFromToken(token) : null

    let orders: OrderI[] = []
    let failed = false
    if (token && userId) {
        try {
            const data = await getUserOrders(userId, token)
            orders = Array.isArray(data) ? data : (data?.data ?? [])
        } catch {
            failed = true
        }
    }
    orders = [...orders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-white">
                        <PackageCheck className="size-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                        <p className="text-gray-600">Track and review everything you&apos;ve ordered</p>
                    </div>
                </div>

                {failed && <p className="mt-8 rounded-xl bg-red-50 p-4 text-red-600">We couldn&apos;t load your orders. Please try again.</p>}

                {!failed && orders.length === 0 && (
                    <div className="mt-16 flex flex-col items-center text-center">
                        <ShoppingBag className="size-16 rounded-full bg-gray-100 p-4 text-gray-400" />
                        <h2 className="mt-4 text-xl font-bold">No orders yet</h2>
                        <Link href="/products" className="mt-4 rounded-md bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800">Start Shopping</Link>
                    </div>
                )}

                <div className="mt-8 flex flex-col gap-6">
                    {orders.map((order) => {
                        const isCash = order.paymentMethodType === "cash"
                        const itemsCount = order.cartItems.reduce((sum, item) => sum + item.count, 0)
                        const firstItem = order.cartItems[0]

                        return (
                            // <details> gives a native show/hide toggle, so no client JS / extra component is needed
                            <details key={order._id} className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                                {/* Always-visible summary */}
                            <summary className="flex cursor-pointer list-none flex-col gap-4 bg-green-50 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between [&::-webkit-details-marker]:hidden">
    {/* Left: image + order info */}
    <div className="flex min-w-0 items-center gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
            {firstItem && (
                <Image src={firstItem.product.imageCover} alt={firstItem.product.title} fill sizes="80px" className="object-contain p-1.5" />
            )}
            {order.cartItems.length > 1 && (
                <span className="absolute bottom-1 right-1 rounded-full bg-green-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                    +{order.cartItems.length - 1}
                </span>
            )}
        </div>
        <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">Order #{order.id}</p>
            <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()} · {itemsCount} {itemsCount === 1 ? "item" : "items"} · {order.totalOrderPrice} EGP
            </p>
        </div>
    </div>

    {/* Right: status + button */}
    <div className="flex items-center justify-between gap-4 text-sm font-medium md:shrink-0 md:justify-end">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={`flex items-center gap-1 whitespace-nowrap ${order.isPaid ? "text-green-700" : "text-amber-600"}`}>
                {order.isPaid ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                {order.isPaid ? "Paid" : "Payment pending"}
            </span>
            <span className={`whitespace-nowrap ${order.isDelivered ? "text-green-700" : "text-gray-500"}`}>
                {order.isDelivered ? "Delivered" : "On its way"}
            </span>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
            <span className="group-open:hidden">Details</span>
            <span className="hidden group-open:inline">Hide</span>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </span>
    </div>
</summary>

                                {/* Hidden until "Show details" is clicked */}
                                <div className="flex flex-col gap-5 border-t p-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-xl bg-gray-50 p-4">
                                            <p className="mb-2 text-sm font-semibold text-gray-900">Shipping address</p>
                                            {order.shippingAddress ? (
                                                <div className="flex flex-col gap-1.5 text-sm text-gray-600">
                                                    <span className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-green-600" />{order.shippingAddress.details}, {order.shippingAddress.city}</span>
                                                    <span className="flex items-center gap-2"><Phone className="size-4 shrink-0 text-green-600" />{order.shippingAddress.phone}</span>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-400">Not available</p>
                                            )}
                                        </div>
                                        <div className="rounded-xl bg-gray-50 p-4">
                                            <p className="mb-2 text-sm font-semibold text-gray-900">Payment</p>
                                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                                {isCash ? <Banknote className="size-4 text-green-600" /> : <CreditCard className="size-4 text-green-600" />}
                                                {isCash ? "Cash on delivery" : "Paid online by card"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {order.cartItems.map((item) => (
                                            <div key={item._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                                                <Image src={item.product.imageCover} alt={item.product.title} width={56} height={56} className="rounded-lg bg-white object-contain" />
                                                <div className="flex-1">
                                                    <p className="line-clamp-1 text-sm font-medium text-gray-900">{item.product.title}</p>
                                                    <p className="text-xs text-gray-500">{item.count} × {item.price} EGP</p>
                                                </div>
                                                <span className="font-semibold">{item.count * item.price} EGP</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between border-t border-dashed pt-4 text-lg">
                                        <span className="text-gray-600">Total</span>
                                        <span className="font-bold text-gray-900">{order.totalOrderPrice} EGP</span>
                                    </div>
                                </div>
                            </details>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}