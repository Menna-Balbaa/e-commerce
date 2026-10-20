import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

   interface UserDataI {
        name: string,
        email: string,
        role: string
    }

declare module "next-auth" {
    interface User {
        token: string,
        user: UserDataI
    }
}


declare module "next-auth/jwt" {
    interface JWT { 
        user: UserDataI
    }
}