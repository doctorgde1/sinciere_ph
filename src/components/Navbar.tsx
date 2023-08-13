"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Turn as Hamburger } from "hamburger-react";

interface INavbar {
  links: NavItem[];
}

export type NavItem = { displayName: string; href: string };

const Navbar: React.FC<INavbar> = ({ links }) => {
  const [open, setOpen] = useState(false);
  const currentPage = usePathname();

  return (
    <NavigationMenu className={cn("relative w-fit h-fit", {})}>
      {/*Container to fixed position for full screen on open*/}
      <div
        className={cn("hidden md:block md:h-fit md:w-fit", {
          "backdrop-blur-lg md:backdrop-blur-none flex justify-center items-center top-0 left-0 fixed w-screen h-screen md:relative":
            open,
        })}
      >
        {/*Container to limit size of list and add scroll*/}
        <div className="overflow-y-auto w-2/3 h-4/6 md:w-fit md:h-fit">
          <NavigationMenuList className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-2 md:w-fit">
            {links.map((link) => (
              <NavigationMenuItem key={link.displayName}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-2xl md:text-lg"
                    )}
                  >
                    {link.displayName}
                    {link.href === currentPage ? (
                      <Star className="w-4 animate-spin fill-neutral-950 dark:fill-neutral-50" />
                    ) : null}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
      </div>
      <span className={cn("relative md:hidden", {})}>
        <Hamburger toggled={open} toggle={setOpen} rounded />
      </span>
    </NavigationMenu>
  );
};

export default Navbar;
