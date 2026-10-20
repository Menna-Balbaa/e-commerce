import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    icon: Truck,
    iconClassName: "bg-blue-50 text-blue-500",
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: ShieldCheck,
    iconClassName: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    icon: RotateCcw,
    iconClassName: "bg-orange-50 text-orange-500",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    icon: Headphones,
    iconClassName: "bg-purple-50 text-purple-500",
  },
];

export default function Benefits() {
  return (
    <section className="container mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-4 py-8">
      {benefits.map(({ title, description, icon: Icon, iconClassName }) => (
        <Card key={title} size="sm" className="rounded-2xl duration-400 hover:shadow-xl">
          <CardContent className="flex items-center gap-4">
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-sm">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
