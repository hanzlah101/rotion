"use client"

import * as React from "react"
import { toast } from "sonner"
import { Search, Trash2, Undo } from "lucide-react"
import { useQuery, useMutation } from "convex/react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/spinner"
import { ConfirmModal } from "@/components/modals/confirm-modal"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

export const TrashBox = () => {
  const router = useRouter()
  const params = useParams()

  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)
  const documents = useQuery(api.documents.getTrash)

  const [search, setSearch] = React.useState("")

  const filteredDocuments = documents?.filter((document) => {
    return document.title
      .trim()
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  })

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation()
    const promise = restore({ id: documentId })
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored.",
      error: "Couldn't restore document!",
    })
  }

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId })
    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted.",
      error: "Couldn't delete document!",
    })

    if (params.documentId === documentId) {
      router.push("/documents")
    }
  }

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    )
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />
        <Input
          value={search}
          placeholder="Filter by title"
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            role="button"
            key={document._id}
            onClick={() => router.push(`/documents/${document._id}`)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                onClick={(e) => onRestore(e, document._id)}
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                <Undo className="w-4 h-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
