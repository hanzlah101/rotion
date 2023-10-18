"use client"

import { ThemeProvider } from "next-themes"
import { ConvexReactClient } from "convex/react"
import { ClerkProvider, useAuth } from "@clerk/clerk-react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

import { ModalsProvider } from "./modals-provider"

import { EdgeStoreProvider } from "@/utils/edgestore"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="system"
            storageKey="rotion:theme"
            disableTransitionOnChange={true}
          >
            <ModalsProvider />
            {children}
          </ThemeProvider>
        </EdgeStoreProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
