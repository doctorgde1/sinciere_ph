"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ModeToggle from "./ModeToggle";
import { useEffect, useState } from "react";
import { Menu, Star, X } from "lucide-react";
import SignInButton from "./SignInButton";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const currentPage = usePathname();
  const [activeLink, setActiveLink] = useState(currentPage);

  useEffect(() => {
    setActiveLink(currentPage);
    setOpen(false);
  }, [currentPage]);

  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn("visible md:hidden fixed top-0 right-0 z-50 m-2")}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Menu className={cn({ hidden: open })} />
        <X className={cn({ hidden: !open })} />
      </Button>
      <NavigationMenu
        className={cn(
          "fixed md:relative backdrop-blur-lg md:backdrop-blur-none overflow-y-auto top-0 left-0 translate-x-0 transition-all duration-500 p-2",
          {
            "translate-x-full md:translate-x-0": !open,
          }
        )}
      >
        <NavigationMenuList className="flex flex-col gap-5 w-screen h-screen md:flex-row md:flex-wrap md:w-fit md:h-fit">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Головна
                <Star
                  className={cn(
                    "hidden w-4 animate-spin fill-neutral-800 dark:fill-neutral-50",
                    {
                      block: activeLink === "/",
                    }
                  )}
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/portfolio" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Портфоліо
                <Star
                  className={cn(
                    "hidden w-4 animate-spin fill-neutral-800 dark:fill-neutral-50",
                    {
                      block: activeLink === "/portfolio",
                    }
                  )}
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/price" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Прайс
                <Star
                  className={cn(
                    "hidden w-4 animate-spin fill-neutral-800 dark:fill-neutral-50",
                    {
                      block: activeLink === "/price",
                    }
                  )}
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/conditions" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Умови праці
                <Star
                  className={cn(
                    "hidden w-4 animate-spin fill-neutral-800 dark:fill-neutral-50",
                    {
                      block: activeLink === "/conditions",
                    }
                  )}
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-5 items-center">
            <SignInButton className="text-base font-medium tracking-widest uppercase shrink-0">
              Отримати фотографії
            </SignInButton>
            <ModeToggle className="shrink-0" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navbar;
