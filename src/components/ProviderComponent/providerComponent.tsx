"use client"

import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/authContext";
import CartContextProvider from "@/context/cartContext";
import WishlistContextProvider from "@/context/wishlistContext";
import {Provider} from "react-redux";
import { store } from "@/redux/store";

export default function ProviderComponent({children}: {children: React.ReactNode}) {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <CartContextProvider>
          <WishlistContextProvider>
            <header className="sticky top-0 z-50">
              <Navbar />
            </header>
            <Toaster position="top-center" richColors />
            {children}
          </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        </Provider>
    </>
  )
}
