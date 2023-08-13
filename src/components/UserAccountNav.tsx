"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";
import { User2 } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface IUserAccountNav {
  user: Pick<User, "name" | "image" | "id">;
  className?: string;
}

const UserAccountNav: React.FC<IUserAccountNav> = ({ user, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("flex relative flex-col items-center", className)}
      >
        <Avatar>
          {user.image ? (
            <AvatarImage src={user.image} alt="avatar" />
          ) : (
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          )}
        </Avatar>
        <span className="text-xs">{user?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Мій акаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/galleries/${user.id}`}>Мої фото</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={() => signOut()}>Вийти</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
