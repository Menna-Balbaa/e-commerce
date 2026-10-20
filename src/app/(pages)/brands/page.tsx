import { getALLBrands } from "@/services/brands.services";
import { BrandI } from "@/types/brands";
import { ArrowRight, Tags } from "lucide-react";
import Link from "next/link";

export default async function Brands() {
  const data = await getALLBrands();

  const brands: BrandI[] = data.data;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#7d26ff] to-[#af6cfc] py-14 text-white">
        <div className="container mx-auto px-10">
          <p className="text-md mb-4">
            <Link href="/" className="hover:underline ">Home</Link> /{" "}
            <span className="font-semibold text-white">Brands</span>
          </p>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white/20">
              <Tags className="size-8" />
            </span>
            <div>
              <h1 className="text-4xl font-bold mb-1">Top Brands</h1>
              <p className="text-md">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands grid */}
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands?.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="group flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3">

                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-[15px] font-semibold text-slate-800 group-hover:text-[#8945FF]">
                {brand.name}
              </p>
              <span className="invisible flex items-center gap-1 text-[13px] font-medium text-[#8945FF] group-hover:visible">
                View Products <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}