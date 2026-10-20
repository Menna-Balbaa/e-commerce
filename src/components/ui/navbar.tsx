"use client";
import { Heart, Search, ShoppingCart, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NavMenu } from "@/components/ui/nav-menu";
import { NavigationSheet } from "@/components/ui/navigation-sheet";
import { Input } from "./input";
import { Avatar, AvatarBadge, AvatarFallback } from "./avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  LogOutIcon,
  PackageIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartContext } from "@/context/cartContext";
import { WishlistContext } from "@/context/wishlistContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";



const Navbar = () => {

  const session = useSession()
  const router = useRouter()
  const [searchText, setSearchText] = useState("")

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = searchText.trim()
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products")
  }
  const {noOfCartItems} = useContext(CartContext)!
  const {noOfWishlistItems} = useContext(WishlistContext)!

  async function logoutUser() {
    // redirect:false -> don't let next-auth build the URL from NEXTAUTH_URL (localhost in prod)
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="h-18 border-b bg-background">
      <div className="mx-auto flex h-full container items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 xl:gap-8">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <button type="submit" aria-label="Search" className=" cursor-pointer">
             <Search className="absolute inset-e-0 inset-y-0  my-auto p-1.5 text-white bg-green-600 rounded-full h-8 w-8" />

</button>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-56 flex-1 rounded-full border-none bg-muted shadow-none xl:w-70"
              placeholder="Search by product or category"
            />
          </form>
          <NavMenu className="hidden lg:block" />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {session.status === "authenticated" ? <>

                <Link href={"/wishlist"} className="border-s-[1.5px] border-primary ps-3">
              <Avatar className="">
                <AvatarFallback className="bor">
                  <Heart />
                </AvatarFallback>
                <AvatarBadge className="-top-1 bg-red-600 -inset-e-2 p-2.5 text-[12px]">
                  <span>{noOfWishlistItems}</span>
                </AvatarBadge>
              </Avatar>

            </Link>
            <Link href={"/cart"}>
              <Avatar className="">
                <AvatarFallback className="bor">
                  <ShoppingCart />
                </AvatarFallback>
                <AvatarBadge className="-top-1 -inset-e-2 p-2.5 text-[12px]">
                  <span>{noOfCartItems}</span>
                </AvatarBadge>
              </Avatar>

            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="max-w-32 sm:max-w-40"><User2 className="sm:hidden" /><span className="hidden truncate sm:inline">{session.data.user?.name}</span></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/allorders">
                    <PackageIcon />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logoutUser}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </> : <>
            <Button>
              <Link href={"/login"} className="flex gap-2 items-center"><User2 />  Sign In </Link>
            </Button>
          </>}

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;