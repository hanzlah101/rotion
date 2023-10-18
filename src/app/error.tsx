"use client"

import Link from "next/link"
import Image from "next/image"

import { buttonVariants } from "@/components/ui/button"

const Error = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center h-full w-full">
      <Image
        alt="Error"
        width={300}
        height={300}
        src="/error.png"
        className="dark:hidden"
      />
      <Image
        alt="Error"
        width={300}
        height={300}
        src="/error-dark.png"
        className="dark:block hidden"
      />
      <h3 className="text-lg font-medium text-muted-foreground">
        Something went wrong
      </h3>
      <Link
        href={"/documents"}
        className={buttonVariants({ variant: "default" })}
      >
        Go Back
      </Link>
    </div>
  )
}

export default Error
