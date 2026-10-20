import Link from "next/link";
import { ShoppingCart, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-linear-to-b from-green-50/60 to-white px-4 text-center">
      {/* Icon card with 404 badge */}
      <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl bg-white shadow-xl shadow-green-100">
        <ShoppingCart className="h-16 w-16 text-green-500" />
        <span className="absolute -right-8 -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-extrabold text-white ring-8 ring-white shadow-lg">
          404
        </span>
      </div>
      {/* Text */}
      <h1 className="mt-8 text-5xl font-extrabold text-slate-900">
        Oops! Nothing Here
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate-500">
        Looks like this page went out of stock! Don&apos;t worry, there&apos;s
        plenty more fresh content to explore.
      </p>

      {/* Buttons */}
      <div className="mt-7 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
        >
          <Home className="h-5 w-5" />
          Go to Homepage
        </Link>
    
      </div>
    </section>
  );
}