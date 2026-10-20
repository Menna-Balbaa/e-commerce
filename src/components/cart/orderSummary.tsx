import Link from "next/link";
import { ArrowLeft, Lock, Receipt, ShieldCheck, ShoppingBag, Truck,} from "lucide-react";
import Image from "next/image";
import { CartI } from "@/types/cart";

type OrderSummaryProps = {
  itemsCount: number;
  total: number;
  products?: CartI["data"]["products"];
  mode?: "cart" | "checkout"; 
};

export default function OrderSummary({ itemsCount, total, products, mode = "cart" }: OrderSummaryProps) {
  return (
    <aside className="h-fit overflow-hidden sticky top-24 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-green-700 px-7 py-6 text-white">
        <h2 className="flex items-center gap-3 text-xl font-bold">
          <ShoppingBag className="size-5" />
          Order Summary
        </h2>
        <p className="mt-1 text-green-100">{itemsCount} {itemsCount === 1 ? "item" : "items"} in your cart</p>
      </div>

      <div className="flex flex-col gap-5 p-7">

        {/* Products (checkout page only) */}
        {products && products.length > 0 && (
          <div className="flex max-h-60 flex-col gap-3 overflow-y-auto">
            {products.map((prod) => (
              <div key={prod._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <Image
                  alt={prod.product.title}
                  width={60}
                  height={60}
                  src={prod.product.imageCover}
                  className="rounded-lg bg-white object-contain"
                />
                <div className="flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-gray-900">{prod.product.title}</p>
                  <p className="text-xs text-gray-500">{prod.count} × {prod.price} EGP</p>
                </div>
                <span className="font-semibold text-gray-900">{prod.count * prod.price}</span>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        <div className="flex justify-between text-lg">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{total} EGP</span>
        </div>
        <div className="flex justify-between border-b border-dashed border-gray-200 pb-5 text-lg">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-gray-900">
            {total}{" "}
            <span className="text-base font-normal text-gray-500">EGP</span>
          </span>
        </div>

        {/* Checkout / Place order */}
        {mode === "checkout" ? (
          <button
            type="submit"
            form="checkout-form"
            className="flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/30 transition hover:from-green-700 hover:to-green-800"
          >
            <Receipt className="size-5" />
            Place Order
          </button>
        ) : (
          <Link
            href="/checkout"
            className="flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/30 transition hover:from-green-700 hover:to-green-800"
          >
            <Lock className="size-5" />
            Secure Checkout
          </Link>
        )}

        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-green-500" />
            Secure Payment
          </span>
          <span className="h-4 w-px bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <Truck className="size-4 text-blue-500" />
            Fast Delivery
          </span>
        </div>

        {/* Continue shopping (cart page only) */}
        {mode !== "checkout" && (
          <Link
            href="/products"
            className="mt-3 flex items-center justify-center gap-2 text-green-600 transition hover:text-green-700"
          >
            <ArrowLeft className="size-4" />
            Continue Shopping
          </Link>
        )}
      </div>
    </aside>
  );
}