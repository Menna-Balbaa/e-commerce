import AddProductToCartBtn from "@/components/cart/addProductToCartBtn";
import AddProductToWishlistBtn from "@/components/wishlist/addProductToWishlistBtn";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getSpecificBrand } from "@/services/brands.services";
import { getProductsByBrand } from "@/services/products.services";
import { BrandI } from "@/types/brands";
import { ProductI } from "@/types/product";
import { Box, Filter, Star, Tag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BrandDetails({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;

  const brandData = await getSpecificBrand(brandId);
  const brand: BrandI | undefined = brandData?.data;
  if (!brand) notFound();

  const productsData = await getProductsByBrand(brandId);
  const products: ProductI[] = productsData?.data ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-b from-green-600 to-green-400 py-10 text-white">
        <div className="container mx-auto px-10">
          <p className="text-md mb-4 text-green-50">
            <Link href="/" className="hover:underline">Home</Link> /{" "}
            <Link href="/brands" className="hover:underline">Brands</Link> /{" "}
            <span className="font-semibold text-white">{brand.name}</span>
          </p>
          <div className="mt-5 flex items-center gap-5">
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white/25 p-3">
       
              <img src={brand.image} alt={brand.name} className="max-h-full max-w-full rounded bg-white object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">{brand.name}</h1>
              <p className="text-lg text-green-50">Shop {brand.name} products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-10">

        <div className="mb-6 flex items-center gap-3 text-sm text-slate-600">
          <Filter className="size-4" />
          <span>Active Filters:</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 text-[#8945FF]">
            <Tag className="size-3.5" />
            {brand.name}
            <Link href="/products" aria-label="Remove filter">
              <X className="size-3.5" />
            </Link>
          </span>
          <Link href="/products" className="underline decoration-2 underline-offset-2 hover:text-green-600">
            Clear all
          </Link>
        </div>

        <p className="mb-6 text-sm text-slate-600">Showing {products.length} products</p>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="flex size-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Box className="size-12" />
            </span>
            <span className="mt-4 text-xl font-bold">No Products Found</span>
            <span className="mt-1 text-lg text-gray-500">No products match your current filters.</span>
            <Link
              href="/products"
              className="mt-5 rounded-lg text-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {products.map((product) => (
              <div key={product._id} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Card className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                  <div className="relative">
                    <Link href={`/products/${product._id}`}>
                      <Image
                        width={600}
                        height={600}
                        src={product.imageCover}
                        alt={product.title}
                        className="h-72 w-full  border-b-4 border-primary object-cover"
                      />
                    </Link>

                    <AddProductToWishlistBtn productId={product._id} />
                  </div>

                  <CardHeader>
                    <p className="text-sm text-gray-500">{product.category.name}</p>

                    <Link href={`/products/${product._id}`}>
                      <CardTitle
                        className="line-clamp-2 min-h-14 text-xl font-semibold leading-7 hover:text-primary"
                        title={product.title}
                      >
                        {product.title}
                      </CardTitle>
                    </Link>

                    <p className="text-lg font-medium">{product.price} EGP</p>

                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((star) => {
                        const filled = star < Math.floor(product.ratingsAverage);
                        return (
                          <Star
                            key={star}
                            className={filled ? "fill-yellow-500 text-yellow-500" : "fill-gray-500 text-gray-500"}
                          />
                        );
                      })}
                      <p className="ms-1 text-sm font-semibold text-gray-700">{product.ratingsAverage}</p>
                    </div>
                  </CardHeader>

                  <CardFooter className="mt-auto">
                    <AddProductToCartBtn productId={product._id} />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}