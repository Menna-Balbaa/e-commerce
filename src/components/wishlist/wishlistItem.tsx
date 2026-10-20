"use client";

import { removeUserWishlist } from "@/actions/wishlist.action";
import { addToCart } from "@/actions/cart.action";
import { ProductI } from "@/types/product";
import { Check, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/context/cartContext";

export default function WishlistItem({ product, isInCart, removeFromList }: { product: ProductI; isInCart: boolean; removeFromList: (productId: string, remainingIds: string[]) => void }) {

  const [removing, setRemoving] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(isInCart);
  const { handleCart } = useContext(CartContext)!;

  async function removeProduct() {
    try {
      setRemoving(true);
      const data = await removeUserWishlist(product._id);
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message ?? "Product removed from wishlist successfully");
      removeFromList(product._id, (data.data as string[] | undefined) ?? []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product from wishlist");
    } finally {
      setRemoving(false);
    }
  }

  async function addProductToCart() {
    try {
      setAdding(true);
      const data = await addToCart(product._id);
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setInCart(true);
      handleCart();
    } catch {
      toast.error("Failed to add product to cart");
    } finally {
      setAdding(false);
    }
  }

  const inStock = product.quantity > 0;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 p-4 first:border-t-0 md:grid md:grid-cols-[minmax(0,1fr)_130px_150px_240px] md:items-center md:gap-4 md:px-6">
      {/* Product */}
      <Link href={`/products/${product._id}`} className="flex min-w-0 items-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">

          <img src={product.imageCover} alt={product.title} className="size-full object-contain p-1.5" />
        </div>
        <div className="min-w-0">
          <h3 className="mb-1 line-clamp-2 text-base font-semibold text-slate-800">{product.title}</h3>
          <p className="text-sm text-slate-400">{product.category?.name}</p>
        </div>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 md:justify-center">
        <span className="text-sm text-slate-500 md:hidden">Price:</span>
        <p className="font-bold text-slate-800">
          {(product.priceAfterDiscount ?? product.price).toLocaleString()} EGP
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 md:justify-center">
        <span className="text-sm text-slate-500 md:hidden">Status:</span>
        {inCart ? (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-green-50 px-2.5 py-1 text-sm font-medium text-green-600">
            <Check className="h-3 w-3" />
            In your cart
          </span>
        ) : (
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-medium ${
              inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:justify-center">
        <button
          type="button"
          onClick={addProductToCart}
          disabled={!inStock || adding || removing}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 md:flex-none"
        >
          {adding ? <Spinner className="size-4" /> : <ShoppingCart className="h-4 w-4" />}
          Add to Cart
        </button>
        <button
          type="button"
          onClick={removeProduct}
          disabled={removing || adding}
          aria-label="Remove from wishlist"
          className="cursor-pointer rounded-lg border border-slate-200 p-2.5 text-slate-400 transition hover:border-red-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {removing ? <Spinner className="size-4" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}