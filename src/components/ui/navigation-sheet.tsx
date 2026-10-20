"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Headset, Heart, LogOut, Menu, PackageCheck, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";
import { CartContext } from "@/context/cartContext";
import { WishlistContext } from "@/context/wishlistContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];

export const NavigationSheet = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const session = useSession();
  const { noOfCartItems } = useContext(CartContext)!;
  const { noOfWishlistItems } = useContext(WishlistContext)!;

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = searchText.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-[85%] max-w-sm flex-col gap-0 overflow-y-auto px-6 py-6">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>

        <Link href="/" onClick={() => setOpen(false)} className="w-fit">
          <Logo />
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative mt-6">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-full border-none bg-muted pe-11 shadow-none"
            placeholder="Search by product or category"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute inset-y-0 inset-e-0 my-auto me-1 flex size-8 items-center justify-center rounded-full bg-green-600 text-white"
          >
            <Search className="size-4" />
          </button>
        </form>

        {/* Links */}
        <nav className="mt-6 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Wishlist / Cart (only when logged in) */}
        {session.status === "authenticated" && (
          <div className="mt-2 flex flex-col border-t pt-2">
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-2 py-3 text-base font-medium hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Heart className="size-5" /> Wishlist
              </span>
              <span className="rounded-full bg-red-600 px-2 text-xs text-white">
                {noOfWishlistItems}
              </span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-2 py-3 text-base font-medium hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="size-5" /> Cart
              </span>
              <span className="rounded-full bg-green-600 px-2 text-xs text-white">
                {noOfCartItems}
              </span>
            </Link>
            <Link
              href="/allorders"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-2 py-3 text-base font-medium hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <PackageCheck className="size-5" /> My Orders
              </span>
            </Link>
          </div>
        )}

        {/* Support */}
        <div className="mt-4 flex items-center gap-2 border-t pt-4">
          <Headset className="size-10 rounded-full bg-green-100 p-3 text-green-700" />
          <div className="flex flex-col font-medium">
            <p className="text-xs text-gray-500">Support</p>
            <span className="text-[13px]">24/7 Help</span>
          </div>
        </div>

        {/* Auth */}
        <div className="mt-auto pt-6">
          {session.status === "authenticated" ? (
            <Button
              variant="outline"
              className="w-full text-red-600"
              onClick={async () => {
                await signOut({ redirect: false });
                setOpen(false);
                router.push("/login");
                router.refresh();
              }}
            >
              <LogOut /> Log out
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link href="/login" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};