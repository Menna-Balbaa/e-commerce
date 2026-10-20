import AddProductToCartBtn from "@/components/cart/addProductToCartBtn";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getALLProducts } from "@/services/products.services";
import { ProductI } from "@/types/product";
import { Box, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddProductToWishlistBtn from "@/components/wishlist/addProductToWishlistBtn";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search } = await searchParams;
  const query = (Array.isArray(search) ? search[0] : search)?.trim().toLowerCase() ?? "";

  const data = await getALLProducts();

  const allProducts: ProductI[] = data.data;
  const products = query
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category?.name.toLowerCase().includes(query)
      )
    : allProducts;

  return (
    <>
    <div className="bg-linear-to-r from-green-600 to-green-400 py-14 text-white">
        <div className="container mx-auto px-10">
          <p className=" text-md mb-4">
            <Link href="/" className="hover:underline ">Home</Link> /{" "}
            <span className="font-semibold text-white">All Products</span>
          </p>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white/20">
              <Box className="size-8" />
            </span>
            <div>
              <h1 className="text-4xl font-bold mb-1">All Products</h1>
              <p className="text-md">Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>
    
      <div className="container mx-auto p-10">
    

      {query && (
        <p className="mb-6 text-gray-600">
          {products.length} result(s) for &quot;{query}&quot;
        </p>
      )}

      <div className="grid grid-cols-12 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          >
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

                <AddProductToWishlistBtn productId={product._id}/>
               
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
                        className={
                          filled
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-500 text-gray-500"
                        }
                      />
                    );
                  })}
                  <p className="ms-1 text-sm font-semibold text-gray-700">
                    {product.ratingsAverage}
                  </p>
                </div>
              </CardHeader>

              <CardFooter className="mt-auto">
                <AddProductToCartBtn productId={product._id} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
    </>
  
  );
}