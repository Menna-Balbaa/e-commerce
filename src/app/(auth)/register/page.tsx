"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { registerSchema, RegisterSchemaType } from "@/lib/schema/auth.schema"
import { signUpUser } from "@/services/auth.services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Star, Truck, ShieldCheck, UserRound, StarIcon } from "lucide-react"
import Link from "next/link"

export default function Register() {

    const router = useRouter()
    const { control, handleSubmit, formState: {isSubmitting} } = useForm({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }
    })

    async function submitData(formdata: RegisterSchemaType) {
        try {
            const response = await signUpUser(formdata)
            if(response.message == "success") {
                toast.success("Account Registered Successfully")
                router.push("/login")
            }
            else{
                toast.error(response.message)
            }
            console.log(response);
            

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-14 m">
                <div className="grid w-full items-start gap-10 lg:grid-cols-2">

                    {/* Left side: welcome text */}
                    <div className="">
                        <h1 className="text-4xl font-bold text-slate-800">
                            Welcome to <span className="text-green-600">FreshCart</span>
                        </h1>
                        <p className="mt-2 text-xl text-slate-600">
                            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
                        </p>

                        <ul className="mt-8 space-y-6">
                            <li className="flex items-center gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <StarIcon className="h-5 w-5 " />
                                </span>
                                <div>
                                    <h3 className="font-semibold text-xl text-slate-800">Premium Quality</h3>
                                    <p className="text-lg text-slate-600">Premium quality products sourced from trusted suppliers.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Truck className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="font-semibold text-xl text-slate-800">Fast Delivery</h3>
                                    <p className="text-lg text-slate-600">Same-day delivery available in most areas</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="font-semibold text-xl text-slate-800">Secure Shopping</h3>
                                    <p className="text-lg text-slate-600">Your data and payments are completely secure</p>
                                </div>
                            </li>
                        </ul>

                        {/* Testimonial */}
                        <div className="mt-8 max-w-xl rounded-xl bg-white p-5 shadow-md">
                            <div className="flex items-center gap-3">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <UserRound className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-md font-medium text-slate-800 mb-0.5">Sarah Johnson</p>
                                    <div className="flex gap-0.5 text-yellow-400">
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 italic text-slate-600 text-md">
                                &quot;FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!&quot;
                            </p>
                        </div>
                    </div>

                    {/* Right side: form card */}
                    <div className="mx-auto w-full rounded-2xl bg-white p-8 shadow-xl">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-slate-800">Create Your Account</h2>
                            <p className="mt-1 text-sm text-slate-500">Start your fresh journey with us today</p>
                        </div>

                        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, formState }) => {
                                    return <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input type="text" placeholder="Ali" className="h-11" {...field} />
                                        {formState.errors &&
                                            <FieldError errors={[formState.errors.name]} />
                                        }
                                    </Field>
                                }}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, formState }) => {
                                    return <Field>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input type="email" placeholder="ali@example.com" className="h-11" {...field} />
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
                                        <Input type="password" placeholder="create a strong password" className="h-11" {...field} />
                                        {formState.errors &&
                                            <FieldError errors={[formState.errors.password]} />
                                        }
                                    </Field>
                                }}
                            />
                            <Controller
                                name="rePassword"
                                control={control}
                                render={({ field, formState }) => {
                                    return <Field>
                                        <FieldLabel>Confirm Password</FieldLabel>
                                        <Input type="password" placeholder="confirm your password" className="h-11" {...field} />
                                        {formState.errors &&
                                            <FieldError errors={[formState.errors.rePassword]} />
                                        }
                                    </Field>
                                }}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, formState }) => {
                                    return <Field>
                                        <FieldLabel>Phone</FieldLabel>
                                        <Input type="tel" placeholder="+1 234 567 8900" className="h-11" {...field} />
                                        {formState.errors &&
                                            <FieldError errors={[formState.errors.phone]} />
                                        }
                                    </Field>
                                }}
                            />

                            <Button type="submit" className="mt-5 text-md h-11 w-full bg-green-600 font-semibold hover:bg-green-700">{isSubmitting ? <Spinner/> : "Register"}</Button>
                        
                             <div className="text-lg flex justify-center mt-3">
                                <p>Already have an account?
                                    <span> </span>
                                    <Link href={"/login"} className="text-green-600 font-semibold">
                                    Sign In
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