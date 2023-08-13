"use client";

import { cn } from "@/lib/utils";

interface IHeader {
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ className, children }) => {
  return (
    <header
      className={cn(
        "fixed flex items-center gap-4 min-w-full h-fit z-20 backdrop-blur-lg bg-[#FFFFFF] dark:bg-[#1C1B22] inset-0 p-2 shadow-md bg-opacity-25 dark:bg-opacity-25",
        className
      )}
    >
      {children}
    </header>
  );
};

export default Header;
