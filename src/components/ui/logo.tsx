import Image from "next/image";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Image
    src="https://freshcart-route.vercel.app/_next/static/media/freshcart-logo.49f1b44d.svg"
    alt="FreshCart logo"
    width={160}
    height={40}
    priority
    className={`h-8 w-auto shrink-0 sm:h-9 ${className}`}
  />
);