"use client"

import { cn } from "@/utils"
import { useConvexAuth } from "convex/react"
import { SignInButton, UserButton } from "@clerk/clerk-react"

import { Spinner } from "@/components/spinner"
import { useScrollTop } from "@/hooks/use-scroll-top"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"

import { Logo } from "./logo"
import Link from "next/link"

export const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 bg-background dark:bg-[#1f1f1f] flex items-center w-full p-6",
        scrolled && "border-b dark:border-b-neutral-700 shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between flex w-full items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button variant="ghost" size={"sm"}>
              Log in
            </Button>
          </SignInButton>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex md:flex-row-reverse items-center gap-x-2">
            <UserButton afterSignOutUrl="/" />
            <Link
              href={"/documents"}
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Enter Rotion
            </Link>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  )
}
