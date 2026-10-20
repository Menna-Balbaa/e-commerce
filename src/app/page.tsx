"use client"
import AddProductToCartBtn from "@/components/cart/addProductToCartBtn";
import Benefits from "@/components/home/benefits";
import PromoCards from "@/components/home/promoCards";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CarouselWithPagination from "@/components/ui/carousel-06";
import AddProductToWishlistBtn from "@/components/wishlist/addProductToWishlistBtn";
import { productsAction } from "@/redux/Slices/productsSlice";
import { AppDispatcher, RootState } from "@/redux/store";
import { ProductI } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./(pages)/categories/page";

export default function Home() {

  const state = useSelector((state: RootState) => state.products)
  const products = state.products as ProductI[]
  const dispatcher= useDispatch<AppDispatcher>()

  useEffect(() => {
    dispatcher(productsAction());
  }, []);
  
  return (
    <>
        <CarouselWithPagination />
      <section className="container mx-auto">
      <Benefits />
      </section>

        <section className="container mx-auto">
      <PromoCards />

      </section>


       <section className="container mx-auto p-10">
        <h2 className="relative mb-8 ps-4 text-4xl font-bold before:absolute before:inset-s-0 before:top-0 before:h-full before:w-1.5 before:rounded-full before:bg-primary">
          Featured <span className="text-primary">Products</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => (
            <div key={product._id}>
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
      </section>

      <section className="container mx-auto p-10">
        <h2 className="relative mb-8 ps-4 text-4xl font-bold before:absolute before:inset-s-0 before:top-0 before:h-full before:w-1.5 before:rounded-full before:bg-primary">
          Featured <span className="text-primary">Products</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => (
            <div key={product._id}>
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
      </section>
    </>
  );
}