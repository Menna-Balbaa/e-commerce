import { getALLCategories } from "@/services/categories.services";
import { CategoryI } from "@/types/category";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

export default async function Categories() {
  const data = await getALLCategories();
  const categories: CategoryI[] = data.data;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* hero */}
      <div className="bg-linear-to-r from-green-600 to-green-400 py-8 text-white sm:py-14">
        <div className="container mx-auto px-4 sm:px-10">
          <p className="mb-3 text-sm sm:mb-4 sm:text-base">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            / <span className="font-semibold text-white">Categories</span>
          </p>

          <div className="mt-3 flex items-center gap-3 sm:gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 sm:size-16 sm:rounded-2xl">
              <Layers className="size-6 sm:size-8" />
            </span>
            <div className="min-w-0">
              <h1 className="mb-1 text-2xl font-bold leading-tight sm:text-4xl">
                All Categories
              </h1>
              <p className="text-sm sm:text-base">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="container mx-auto px-4 py-6 sm:p-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-3 sm:p-5"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <p className="line-clamp-2 text-center text-sm font-semibold text-slate-800 group-hover:text-green-600 sm:text-[15px]">
                {category.name}
              </p>

              <span className="hidden items-center gap-1 text-[13px] font-medium text-green-600 sm:flex sm:invisible sm:group-hover:visible">
                View Subcategories <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}