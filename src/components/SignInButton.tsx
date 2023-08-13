"use client";
import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";
import { usePathname } from "next/navigation";

const SignInButton: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  const currentPage = usePathname();
  return currentPage !== "/login" ? (
    <Button onClick={() => signIn()} {...props} />
  ) : null;
};

export default SignInButton;
