"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { loginSchema, LoginSchemaType } from "@/lib/schema/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { Mail, Lock } from "lucide-react"
import loginCart from "@/assets/loginCart.png"
import Image from "next/image"
import Link from "next/link"

export default function Login() {

    const router = useRouter()
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function submitData(formData: LoginSchemaType) {
        const response = await signIn("credentials",
            {
                email: formData.email,
                password: formData.password,
                redirect: false
            })

        if (response?.ok) {
            toast.success("Account Logged In Successfully")
            router.push("/")
        }
        else {
            toast.error(response?.error)
        }
    }
    return (
        <>
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
                <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-10">

                    {/* Left side: photo */}
                    <div className="order-2 text-center lg:order-1 lg:mt-15">
                        <Image
                            src={loginCart}
                            alt="Fresh groceries"
                            className="h-screen w-full rounded-2xl object-cover lg:object-bottom shadow-lg sm:h-80 lg:h-128"
                        />
                        <h2 className="mt-6 text-xl font-bold text-slate-800 sm:text-2xl lg:mt-8 lg:text-3xl">
                            FreshCart - Your One-Stop Shop for Fresh Products
                        </h2>
                        <p className="mx-auto mt-3 mb-6 max-w-md text-base text-slate-500 sm:text-lg lg:mb-10 lg:text-xl">
                            Join thousands of happy customers who trust FreshCart for their daily grocery needs
                        </p>
                    </div>

                    {/* Right side: form card */}
                    <div className="order-1 mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-8 lg:order-2">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-green-600 sm:text-4xl">
                                Fresh<span className="text-slate-800">Cart</span>
                            </h1>
                            <h2 className="mt-4 text-2xl font-bold text-slate-800">Welcome Back!</h2>
                            <p className="mt-1 text-md text-slate-500">
                                Sign in to continue your fresh shopping experience
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(submitData)} className="space-y-5">

                            <Controller
                                name="email"
                                control={control}
                                render={({ field, formState }) => {
                                    return <Field>
                                        <FieldLabel>Email Address</FieldLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input type="email" className="h-11 bg-blue-50 pl-10" {...field} />
                                        </div>
                                        {formState.errors &&
                                            <FieldError errors={[formState.errors.email]} />
                                        }
                                    </Field>
                                }}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, formState }) => {
                                    return <Field>
                                        <FieldLabel>Password</FieldLabel>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input type="password" className="h-11 bg-blue-50 pl-10" {...field} />
                                        </div>
                                        {formState.errors &&
                                            <FieldError errors={[formState.errors.password]} />
                                        }
                                    </Field>
                                }}
                            />

                            <Button type="submit" className="mt-5 h-11 w-full text-md bg-green-600 font-semibold hover:bg-green-700">{isSubmitting ? <Spinner /> : "Login"}</Button>

                            <div className="mt-2 flex justify-center text-base sm:text-lg">
                                <p>New to FreshCart? 
                                    <span> </span>
                                    <Link href={"/register"} className="text-green-600 font-semibold">
                                    Create an account
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}