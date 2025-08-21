"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Card, CardHeader, CardContent } from "@mui/material";
import { CardTitle, CardDescription, CardFooter } from "../ui/Card";
import { Label } from "@radix-ui/react-label";

export default function SignInForm() {
  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: siteUrl });
  };

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage(null);

    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    if (!identifier || !password) {
      setErrorMessage("Please provide both email/username and password.");
      return;
    }

    startTransition(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        email: identifier,
        password,
      });

      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        window.location.href = "/"; // Redirect after success
      }
    });
  };

  return (
    <div className="w-full max-w-md">
      <form
        action={async (formData: FormData) => handleSubmit(formData)}
        className="space-y-4"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                required
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Sign In"
              loadingText="Signing in…"
            />
          </CardFooter>
        </Card>

        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="/signup">
            Sign Up
          </Link>
        </div>
      </form>

      <div className="flex flex-col gap-2 pt-2">
        <span className="text-center text-sm text-gray-500">Or sign in with</span>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          onClick={() => handleOAuthSignIn("google")}
        >
          <FaGoogle className="text-red-500" /> Google
        </button>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          onClick={() => handleOAuthSignIn("github")}
        >
          <FaGithub className="text-gray-800" /> GitHub
        </button>
      </div>
    </div>
  );
}
