import { getSpecificProduct } from "@/services/products.services";
import { ProductI } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCarousel from "@/components/products/productCarousel";
import AddProductToCartBtn from "@/components/cart/addProductToCartBtn";

export default async function productDetals({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const data = await getSpecificProduct(productId);
  const product: ProductI = data.data;

  return (
    <div className="container mx-auto px-4 py-6 sm:p-10">
      {/* breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList className="text-sm sm:text-xl">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 1 column on mobile/tablet, side by side on desktop */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        {/* images */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm lg:sticky lg:top-24">
            <ProductCarousel images={product.images} />
          </div>
        </div>

        {/* details */}
        <div className="lg:col-span-7 xl:col-span-8">
          <Card className="flex h-full flex-col gap-4 rounded-2xl p-5 sm:gap-5 sm:p-8">
            {/* badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base">
                {product.category.name}
              </Badge>
              {product.brand?.name && (
                <Badge
                  variant="secondary"
                  className="px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base"
                >
                  {product.brand.name}
                </Badge>
              )}
            </div>

            {/* title */}
            <h1
              className="text-2xl font-bold leading-tight sm:text-3xl"
              title={product.title}
            >
              {product.title}
            </h1>

            {/* rating */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((star) => {
                  const filled = star < Math.floor(product.ratingsAverage);
                  return (
                    <Star
                      key={star}
                      className={
                        filled
                          ? "size-5 fill-yellow-500 text-yellow-500"
                          : "size-5 fill-gray-300 text-gray-300"
                      }
                    />
                  );
                })}
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {product.ratingsAverage}
                {product.ratingsQuantity !== undefined && (
                  <span className="font-normal text-gray-500">
                    {" "}
                    ({product.ratingsQuantity} reviews)
                  </span>
                )}
              </p>
            </div>

            {/* price */}
            <p className="text-[33px] font-bold">
              {product.price} EGP
            </p>

            {/* stock */}
            {product.quantity > 0 ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-600">
                <span className="size-2 rounded-full bg-green-500" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600">
                <span className="size-2 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}

            {/* description */}
            <div className="border-t pt-4">
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                {product.description}
              </p>
            </div>

            {/* add to cart */}
            <div className="mt-auto">
              <AddProductToCartBtn productId={product._id} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}