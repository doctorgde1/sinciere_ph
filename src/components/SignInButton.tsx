"use client";
import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";

const SignInButton: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  return <Button onClick={() => signIn()} {...props} />;
};

export default SignInButton;
