"use client"

import * as React from "react"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { useMediaQuery } from "usehooks-ts"
import { useParams, usePathname, useRouter } from "next/navigation"

import {
  Plus,
  Trash2,
  Search,
  MenuIcon,
  Settings,
  PlusCircle,
  ChevronsLeft,
} from "lucide-react"

import { cn } from "@/utils"

import { useSearch } from "@/hooks/use-search"
import { api } from "@/../convex/_generated/api"
import { useSettings } from "@/hooks/use-settings"

import { Item } from "./item"
import { Navbar } from "./navbar"
import { TrashBox } from "./trash-box"
import { UserItem } from "./user-item"
import { DocumentList } from "./document-list"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

export const Navigation = () => {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  const search = useSearch()
  const settings = useSettings()

  const isMobile = useMediaQuery("(max-width: 768px)")

  const create = useMutation(api.documents.create)

  const isResizingRef = React.useRef(false)
  const navbarRef = React.useRef<React.ElementRef<"div">>(null)
  const sidebarRef = React.useRef<React.ElementRef<"aside">>(null)

  const [isResetting, setIsResetting] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile)

  React.useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  React.useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [isMobile, pathname])

  const handleMounseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    isResizingRef.current = true

    document.addEventListener("mousemove", handleMounseMove)
    document.addEventListener("mouseup", handleMounseUp)
  }

  const handleMounseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = e.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef?.current && navbarRef?.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  const handleMounseUp = () => {
    isResizingRef.current = false
    document.removeEventListener("mousemove", handleMounseMove)
    document.removeEventListener("mouseup", handleMounseUp)
  }

  const resetWidth = () => {
    if (sidebarRef?.current && navbarRef?.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      )

      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  const collapse = () => {
    if (sidebarRef?.current && navbarRef?.current) {
      setIsCollapsed(true)
      setIsResetting(true)
      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("left", "0")
      navbarRef.current.style.setProperty("width", "100%")

      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  const onCreate = async () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    )

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created",
      error: "Failed to create note",
    })
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
          <Item
            icon={Search}
            label="Search"
            isSearch={true}
            onClick={() => search.onOpen()}
          />
          <Item
            icon={Settings}
            label="Settings"
            onClick={() => settings.onOpen()}
          />
          <Item onClick={onCreate} label="New Page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item label="Add a page" onClick={onCreate} icon={Plus} />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash2} />
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onClick={resetWidth}
          onMouseDown={(e) => handleMounseDown(e)}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-0 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params?.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="w-6 h-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  )
}
