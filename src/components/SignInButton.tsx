"use client";
import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";

const SignInButton: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button
      className="text-base font-light tracking-widest uppercase focus-visible:outline-none"
      onClick={() => signIn()}
      {...props}
    />
  );
};

export default SignInButton;
