"use client";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { getUserWishlist } from "@/actions/wishlist.action";
import { getUserCart } from "@/actions/cart.action";
import { CartI } from "@/types/cart";
import WishlistItem from "@/components/wishlist/wishlistItem";
import { Spinner } from "@/components/ui/spinner";
import { WishlistContext } from "@/context/wishlistContext";
import { ProductI } from "@/types/product";
import { WishlistI } from "@/types/wishlist";

export default function Wishlist() {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { setWishlistIds } = useContext(WishlistContext)!;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [wishlist, cart]: [WishlistI, CartI | null] = await Promise.all([
          getUserWishlist(),
          getUserCart().catch(() => null),
        ]);
        if (!cancelled) {
          setProducts(wishlist?.data ?? []);
          setCartIds(cart?.data?.products?.map((p) => p.product._id) ?? []);
        }
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

  const removeFromList = useCallback(
    (productId: string, remainingIds: string[]) => {
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setWishlistIds(remainingIds);
    },
    [setWishlistIds]
  );

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
        <Heart className="size-25 rounded-full bg-gray-100 p-5 text-gray-400" />
        <span className="mt-4 text-2xl font-bold">Your wishlist is empty</span>
        <span className="mt-2 text-lg text-gray-500">
         Browse products and save your favorites here.
        </span>
       
        <Link
          href="/products"
          className="mt-4 rounded-md bg-green-700 px-5 py-3 text-lg font-medium text-white hover:bg-green-800"
        >
          Browse Products <ArrowRight className="ms-1 inline-block size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm mb-4 text-slate-500">
            <Link href="/" className="hover:text-green-600">Home</Link> /{" "}
            <span className="font-semibold text-slate-800">Wishlist</span>
          </p>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Heart className="h-6 w-6 fill-current" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">My Wishlist</h1>
              <p className="text-sm text-slate-500">{products.length} items saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">

          <div className="hidden grid-cols-[minmax(0,1fr)_130px_150px_240px] gap-4 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500 md:grid">
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>
          {products.map((product) => (
            <WishlistItem key={product._id} product={product} isInCart={cartIds.includes(product._id)} removeFromList={removeFromList} />
          ))}
        </div>

        <Link href="/products" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-green-600">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}