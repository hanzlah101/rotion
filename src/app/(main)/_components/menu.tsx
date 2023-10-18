"use client"

import { toast } from "sonner"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { MoreHorizontal, Trash2 } from "lucide-react"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type MenuProps = {
  documentId: Id<"documents">
}

export const Menu = ({ documentId }: MenuProps) => {
  const { user } = useUser()
  const router = useRouter()
  const archieve = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archieve({ id: documentId })
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Document moved to trash.",
      error: "Couldn't move document to trash!",
    })

    router.push("/documents")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-8 w-8" />
}
