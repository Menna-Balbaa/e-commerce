"use client"
import { getUserWishlist } from "@/actions/wishlist.action";
import { WishlistI } from "@/types/wishlist";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";

type WishlistContextType = {
    noOfWishlistItems: number;
    wishlistIds: string[];
    handleWishlist: () => Promise<void>;
    setWishlistIds: (ids: string[]) => void;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

async function fetchIds(): Promise<string[]> {
    try {
        const data: WishlistI = await getUserWishlist();
        return data?.data?.map((p) => p._id) ?? [];
    } catch {
        return [];
    }
}

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);

    const handleWishlist = useCallback(async () => {
        setWishlistIds(await fetchIds());
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const ids = status === "authenticated" ? await fetchIds() : [];
            if (!cancelled) setWishlistIds(ids);
        })();
        return () => {
            cancelled = true;
        };
    }, [status]);

    return (
        <WishlistContext.Provider
            value={{ noOfWishlistItems: wishlistIds.length, wishlistIds, handleWishlist, setWishlistIds }}
        >
            {children}
        </WishlistContext.Provider>
    )
}
