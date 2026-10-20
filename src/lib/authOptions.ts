import { signInUser } from "@/services/auth.services"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials) return null
                const data = await signInUser(credentials)
                if (data.message == "success") {
                    return data
                } else {
                    throw new Error(data.message || "Invalid Credentials")
                }

            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session({ session, token }) {
            if (session) {
                session.user = token.user
            }
            return session
        }
    }
}