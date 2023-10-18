"use client"

import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/utils"

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
})

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        width={20}
        height={20}
        alt="Rotion"
        src={"/logo.svg"}
        className="dark:hidden"
      />
      <Image
        width={20}
        height={20}
        alt="Rotion"
        src={"/logo-dark.svg"}
        className="dark:block hidden"
      />
      <p className={cn("font-semibold", font.className)}>Rotion</p>
    </div>
  )
}
