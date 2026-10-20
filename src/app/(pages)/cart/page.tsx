"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Box, ShoppingCart, Trash2 } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import CarttItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/orderSummary";
import { clearUserCart, getUserCart } from "@/actions/cart.action";
import { CartI, CartProducttI } from "@/types/cart";
import { Spinner } from "@/components/ui/spinner";
import { CartContext } from "@/context/cartContext";

export default function Cart() {
  const [products, setProducts] = useState<CartProducttI[]>([]);
  const [loading, setLoading] = useState(true);
  const { handleCart } = useContext(CartContext)!;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data: CartI = await getUserCart();
        if (!cancelled) setProducts(data?.data?.products ?? []);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateProducts = useCallback(
    (next: CartProducttI[]) => {
      setProducts(next);
      handleCart();
    },
    [handleCart]
  );

  async function clearCart() {
    try {
      await clearUserCart();
      setProducts([]);
      handleCart();
      toast.success("Cart cleared successfully");
    } catch {
      toast.error("Failed to clear cart");
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2">
        <Spinner className="size-6 text-green-500" /> Loading...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Box className="size-25 rounded-full bg-gray-100 p-5 text-gray-400" />
        <span className="mt-4 text-2xl font-bold">Your cart is empty</span>
        <span className="mt-2 text-lg text-gray-500">
          Looks like you haven&apos;t added any products to your cart yet.
        </span>
        <span className="mt-2 text-lg text-gray-500">start exploring our products.</span>
        <Link
          href="/products"
          className="mt-4 rounded-md bg-green-700 px-5 py-3 text-lg font-medium text-white hover:bg-green-800"
        >
          Start Shopping <ArrowRight className="ms-1 inline-block size-4" />
        </Link>
      </div>
    );
  }

  const itemsCount = products.length;
  const total = products.reduce((acc, p) => acc + p.price * p.count, 0);

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
      <p className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-green-600">Home</Link> /{" "}
        <span className="font-medium text-slate-800">Shopping Cart</span>
      </p>
      <div className="mb-8 flex items-center gap-3 sm:gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white sm:size-16">
          <ShoppingCart className="size-6 sm:size-8" />
        </span>
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Shopping Cart</h1>
          <p className="mt-1 text-base text-gray-500 sm:text-lg">
            You have <span className="font-semibold text-green-600">{itemsCount} {itemsCount === 1 ? "item" : "items"}</span> in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          {products.map((item) => (
            <CarttItem key={item._id} product={item} setProducts={updateProducts} />
          ))}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 pt-3">
            <Link
              href="/products"
              className="flex items-center gap-2 text-green-600 transition hover:text-green-700"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="flex cursor-pointer items-center gap-2 text-gray-500 transition hover:text-red-500"
            >
              <Trash2 className="size-4" />
              Clear all items
            </button>
          </div>
        </div>
        <OrderSummary itemsCount={itemsCount} total={total} />
      </div>
    </div>
  );
}