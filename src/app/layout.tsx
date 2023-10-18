import "./globals.css"
import { Toaster } from "sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/utils"
import { Providers } from "@/components/providers"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rotion",
  description: "A personal project",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background dark:bg-[#1f1f1f]", font.className)}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
