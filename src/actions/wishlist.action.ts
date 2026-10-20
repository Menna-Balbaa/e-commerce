"use server"

import { getServerToken } from "@/lib/auth";
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from "@/services/wishlist.services";

async function requireToken() {
    const token = await getServerToken();
    if (!token) throw new Error("You must be logged in");
    return token;
}

export type WishlistResult = { ok: boolean; message: string; unauthenticated?: boolean; data?: unknown };

const NOT_LOGGED_IN: WishlistResult = { ok: false, unauthenticated: true, message: "Please log in to use your wishlist." };

export async function addToWishlist(productId: string): Promise<WishlistResult> {
    const token = await getServerToken();
    if (!token) return NOT_LOGGED_IN;
    try {
        const d = await addProductToWishlist(productId, token);
        return { ok: d?.status === "success", message: d?.message ?? "Wishlist updated", data: d?.data };
    } catch {
        return { ok: false, message: "Unable to update wishlist. Please try again." };
    }
}

export async function getUserWishlist() {
    return await getLoggedUserWishlist(await requireToken());
}

export async function removeUserWishlist(productId: string): Promise<WishlistResult> {
    const token = await getServerToken();
    if (!token) return NOT_LOGGED_IN;
    try {
        const d = await removeProductFromWishlist(productId, token);
        return { ok: d?.status === "success", message: d?.message ?? "Wishlist updated", data: d?.data };
    } catch {
        return { ok: false, message: "Unable to update wishlist. Please try again." };
    }
}