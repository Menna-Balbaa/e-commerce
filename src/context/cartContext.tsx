"use client"
import { getUserCart } from "@/actions/cart.action";
import { CartI } from "@/types/cart";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";

type CartContextType = {
    noOfCartItems: number;
    handleCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);

async function fetchCount(): Promise<number> {
    try {
        const data: CartI = await getUserCart();
        return data?.data?.products?.reduce((acc, p) => acc + p.count, 0) ?? 0;
    } catch {
        return 0;
    }
}

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const [noOfCartItems, setNoOfCartItems] = useState(0);

    const handleCart = useCallback(async () => {
        setNoOfCartItems(await fetchCount());
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const count = status === "authenticated" ? await fetchCount() : 0;
            if (!cancelled) setNoOfCartItems(count);
        })();
        return () => {
            cancelled = true;
        };
    }, [status]);

    return (
        <CartContext.Provider value={{ noOfCartItems, handleCart }}>
            {children}
        </CartContext.Provider>
    )
}