"use server"

import { headers } from "next/headers";
import { getServerToken } from "@/lib/auth";
import { cashCheckout, onlineCheckout } from "@/services/checkout.services";
import type { CheckoutFormValues, CheckoutResponse } from "@/types/checkout";

const fail = (message: string): CheckoutResponse => ({ status: "error", message });

async function getOrigin() {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
    return `${proto}://${host}`;
}

export async function onlinePayment(cartId: string, formData: CheckoutFormValues): Promise<CheckoutResponse> {
    const token = await getServerToken();
    if (!token) return fail("Please log in to complete your order.");
    if (!cartId) return fail("Your cart is empty. Add some products first.");
    try {
        return await onlineCheckout(cartId, formData, token, await getOrigin());
    } catch (error) {
        return fail(error instanceof Error ? error.message : "Unable to start checkout.");
    }
}

export async function cashPayment(cartId: string, formData: CheckoutFormValues): Promise<CheckoutResponse> {
    const token = await getServerToken();
    if (!token) return fail("Please log in to complete your order.");
    if (!cartId) return fail("Your cart is empty. Add some products first.");
    try {
        return await cashCheckout(cartId, formData, token);
    } catch (error) {
        return fail(error instanceof Error ? error.message : "Unable to place your order.");
    }
}
