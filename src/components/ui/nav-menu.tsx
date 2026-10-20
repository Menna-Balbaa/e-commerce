"use client";

import { Headset, type LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-1 space-x-0 ms-3.5  rtl:space-x-reverse">

    <NavigationMenuItem>
        <Button asChild variant="ghost" className="text-md text-gray-800">
          <Link href="/">Home</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild variant="ghost" className="text-md text-gray-800">
          <Link href="/products">Shop</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild variant="ghost" className="text-md text-gray-800">
          <Link href="/categories">Categories</Link>
        </Button>
      </NavigationMenuItem>
       <NavigationMenuItem>
        <Button asChild variant="ghost" className="text-md text-gray-800">
          <Link href="/brands">Brands</Link>
        </Button>
      </NavigationMenuItem>
      <div className="hidden xl:flex justify-center items-center gap-2 ms-2 whitespace-nowrap">
        <Headset className="text-green-700 bg-green-100 p-3 rounded-full size-10"/>
        <div className="flex flex-col font-medium">
          <p className="text-gray-500 text-xs">Support</p>
          <span className="text-[13px]">24/7 Help</span>
        </div>
      </div>
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "select-none flex-col items-start rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          <props.icon className="mb-3 size-6" />
          <div className="font-medium  leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";