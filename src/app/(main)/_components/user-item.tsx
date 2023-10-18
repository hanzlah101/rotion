"use client"

import { ChevronsLeftRight } from "lucide-react"
import { SignOutButton, useUser } from "@clerk/clerk-react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export const UserItem = () => {
  const { user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="flex items-center gap-x-2 max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? ""} />
            </Avatar>
            {user?.fullName && (
              <span className="text-start font-medium break-words line-clamp-1">
                {user?.fullName}&apos;s Rotion
              </span>
            )}
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-80"
        alignOffset={11}
        forceMount={true}
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs leading-none text-muted-foreground font-medium">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? ""} />
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.firstName}&apos;s Rotion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
