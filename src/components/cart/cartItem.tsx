"use client";

import { removeUserCart, updateProductQuantity } from "@/actions/cart.action";
import { CartProducttI } from "@/types/cart";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function CarttItem({product, setProducts}: {product: CartProducttI; setProducts: (products: CartProducttI[]) => void}) {

  const [loading, setLoading] = useState<boolean>(false);

    async function removeProduct() {
        try {
            setLoading(true);
            const data = await removeUserCart(product.product._id);
            toast.success("Product removed from cart successfully");
            setProducts(data.data.products);
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove product from cart"); 
        }
        finally {
            setLoading(false);
        }
    }   

        async function updateProduct(count: number) {
        try {
            setLoading(true);
            const data = await updateProductQuantity(product.product._id, count);
            console.log("update response:", data);
            toast.success("Product quantity updated successfully");
            setProducts(data.data.products); 
        } catch (error) {
            console.log(error);
             console.log("update error:", error);
            toast.error("Failed to update product quantity"); 
        }
        finally {
            setLoading(false);
        }
    }   


  return (
    <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] sm:gap-5 sm:p-6">
  {loading ?  <>
  <div className="flex h-40 w-full gap-2 items-center justify-center">
<Spinner className="size-6 text-green-500" />Loading... 
  </div>
  </> : <>
      {/* Image */}
      <div className="relative shrink-0 self-start pb-3">
        <div className="flex size-20 items-center sm:size-28 justify-center overflow-hidden rounded-xl bg-linear-to-br from-gray-50 to-gray-100">
        
          <img
            src={product.product.imageCover}
            alt={product.product.title}
            className="size-full object-contain"
          />
        </div>
        <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-green-500 px-2.5 py-0.5 text-[11px] font-medium text-white">
          <Check className="size-3" />
          {product.product.quantity > 0 ?  "in stock" : "Out of stock"}
        </span>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
        <h3 className="text-base font-semibold text-gray-900 sm:text-xl">{product.product.title}</h3>

        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
            {product.product.category.name}
          </span>
        </div>

        <p className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-green-600 sm:text-xl">{product.price} EGP</span>
          <span className="text-sm text-gray-400">per unit</span>
        </p>

        <div className="mt-1 flex flex-wrap items-end justify-between gap-x-3 gap-y-3 sm:mt-2 sm:gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 sm:gap-4">
            <button
              type="button"
              disabled={product.count <= 1}
                onClick={() => updateProduct(product.count - 1)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-white sm:size-9 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-4 text-center text-base sm:text-lg font-semibold text-gray-900">
              {product.count}
            </span>
            <button
              type="button"
                onClick={() => updateProduct(product.count + 1)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-green-600 sm:size-9 text-white transition hover:bg-green-700"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {/* Total + remove */}
          <div className="ms-auto flex items-center gap-3 sm:gap-5">
            <div className="text-right">
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product.price * product.count}{" "}
                <span className="text-base font-normal text-gray-500">EGP</span>
              </p>
            </div>
            <button
              type="button"
              onClick={removeProduct}
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl sm:size-12 border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100"
            >
              <Trash2 className="size-5" />
            </button>
          </div>
        </div>
      </div>
  </>}
    </div>
  );
}