"use client"

import { toast } from "sonner"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

type BannerProps = {
  documentId: Id<"documents">
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter()
  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRestore = () => {
    const promise = restore({ id: documentId })
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored.",
      error: "Couldn't restore document!",
    })
  }

  const onRemove = () => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted.",
      error: "Couldn't delete document!",
    })

    router.push("/documents")
  }

  return (
    <div className="w-full bg-rose-500 text-sm p-2 text-white flex items-center justify-between gap-2">
      <p className="break-words">This document is in the trash.</p>
      <div className="flex items-center gap-x-2 shrink-0">
        <Button
          size="sm"
          variant="outline"
          onClick={onRestore}
          className="hover:text-rose-500 border-white bg-transparent hover:bg-white text-white p-1 px-2 h-auto font-normal"
        >
          Restore Document
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size="sm"
            variant="outline"
            className="hover:text-rose-500 border-white bg-transparent hover:bg-white text-white p-1 px-2 h-auto font-normal"
          >
            Delete Forever
          </Button>
        </ConfirmModal>
      </div>
    </div>
  )
}
