"use client"

import { redirect } from "next/navigation"
import { useConvexAuth } from "convex/react"

import { Spinner } from "@/components/spinner"
import { SearchCommand } from "@/components/search-command"

import { Navigation } from "./_components/navigation"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner size="xl" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect("/")
  }

  return (
    <div className="h-full flex">
      <Navigation />
      <SearchCommand />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  )
}

export default MainLayout
