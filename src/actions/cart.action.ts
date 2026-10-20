"use server"

import { getServerToken } from "@/lib/auth";
import { addProductToCart, clearLoggedUserCart, getLoggedUserCart, removeProductFromCart, updateCartProductQuantity } from "@/services/cart.services";

async function requireToken() {
    const token = await getServerToken();
    if (!token) throw new Error("You must be logged in");
    return token;
}

export type AddToCartResult = { ok: boolean; message: string; unauthenticated?: boolean };

export async function addToCart(productId: string): Promise<AddToCartResult> {
    const token = await getServerToken();
    if (!token) return { ok: false, unauthenticated: true, message: "Please log in to add products to your cart." };
    try {
        const data = await addProductToCart(productId, token);
        const ok = data?.status === "success";
        return { ok, message: data?.message ?? (ok ? "Product added to your cart" : "Unable to add product to cart.") };
    } catch {
        return { ok: false, message: "Unable to add product to cart. Please try again." };
    }
}

export async function getUserCart() {
    return await getLoggedUserCart(await requireToken());
}

export async function removeUserCart(productId: string) {
    return await removeProductFromCart(productId, await requireToken());
}

export async function updateProductQuantity(productId: string, count: number) {
    return await updateCartProductQuantity(productId, count, await requireToken());
}

export async function clearUserCart() {
    return await clearLoggedUserCart(await requireToken());
}