"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useConvexAuth } from "convex/react"
import { SignInButton } from "@clerk/clerk-react"

import { Spinner } from "@/components/spinner"
import { Button, buttonVariants } from "@/components/ui/button"

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans Unified. Welcome to{" "}
        <span className="underline">Rotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Rotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Link href={"/documents"} className={buttonVariants()}>
          Enter Rotion <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Rotion Free <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
