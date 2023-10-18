"use client"

import { toast } from "sonner"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import {
  Plus,
  Trash2,
  ChevronRight,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type ItemProps = {
  label: string
  level?: number
  icon: LucideIcon
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  id?: Id<"documents">
  onClick?: () => void
  documentIcon?: string
  onExpand?: () => void
}

export const Item = ({
  id,
  label,
  active,
  onClick,
  expanded,
  onExpand,
  isSearch,
  level = 0,
  icon: Icon,
  documentIcon,
}: ItemProps) => {
  const router = useRouter()
  const { user } = useUser()

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onExpand?.()
  }

  const create = useMutation(api.documents.create)
  const archive = useMutation(api.documents.archive)

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (!id) return

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.()
        }

        router.push(`/documents/${documentId}`)
      }
    )

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created",
      error: "Failed to create note",
    })
  }

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (!id) return

    const promise = archive({ id }).then(() => router.push("/documents"))

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Failed to move note to trash",
    })
  }

  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground/50 transition duration-300",
              expanded && "rotate-90"
            )}
          />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 h-[18px] mr-2">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-300 dark:border-neutral-600 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              forceMount
              side="right"
              align="start"
              className="w-60"
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level: number }) {
  return (
    <div
      className="flex items-center gap-x-2 py-[3px]"
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-3 w-[40%] rounded-sm" />
    </div>
  )
}
