"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
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
          "fixed flex flex-col md:flex-row gap-5 md:gap-0 min-w-full h-screen md:h-fit justify-center md:justify-between backdrop-blur-lg inset-0 translate-x-0 transition-all duration-500 md:p-4 shadow-md",
          {
            "translate-x-full md:translate-x-0": !open,
          }
        )}
      >
        <Link
          href="/"
          className="relative p-1 mt-2 rounded-xl md:mt-0 dark:bg-neutral-950"
        >
          <span className="flex py-1 px-2 text-2xl font-bold rounded-lg border-2 border-r-4 border-b-4 transition-all md:block flex-shrink-1 border-neutral-950 dark:border-neutral-50 hover:-translate-y-[2px]">
            @sinciere_ph
          </span>
        </Link>
        <div className="overflow-y-auto w-screen min-h-[100px] max-h-[calc(100%-360px)] md:min-h-full md:max-h-full md:overflow-hidden md:w-fit">
          <NavigationMenuList className="flex flex-col gap-5 w-full md:flex-row md:flex-wrap md:w-fit">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Головна
                  <Star
                    className={cn(
                      "hidden w-4 animate-spin fill-neutral-950 dark:fill-neutral-50",
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
                      "hidden w-4 animate-spin fill-neutral-950 dark:fill-neutral-50",
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
                      "hidden w-4 animate-spin fill-neutral-950 dark:fill-neutral-50",
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
                      "hidden w-4 animate-spin fill-neutral-950 dark:fill-neutral-50",
                      {
                        block: activeLink === "/conditions",
                      }
                    )}
                  />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>

        <div className="flex flex-col gap-5 items-center mb-2 md:flex-row md:mb-0">
          <SignInButton className="p-4 text-lg font-medium tracking-widest uppercase h-fit">
            Отримати фотографії
          </SignInButton>
        </div>
      </NavigationMenu>
    </>
  );
};

export default Navbar;
