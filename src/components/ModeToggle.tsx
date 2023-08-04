"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ModeToggle = ({ className, ...props }: ButtonProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme((theme === "light" ? "dark" : "light") as string)}
      className={cn("hover:bg-neutral-200", className)}
      variant="outline"
      size="icon"
      {...props}
    >
      <Sun className="transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-neutral-950 h-[1.2rem] w-[1.2rem]" />
      <Moon className="absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
