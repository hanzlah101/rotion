"use client"

import * as React from "react"
import { useMutation } from "convex/react"
import { useParams } from "next/navigation"

import { useEdgeStore } from "@/utils/edgestore"
import { useCoverImage } from "@/hooks/use-cover-image"
import { ImageDropzone } from "@/components/image-dropzone"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

export const CoverImageModal = () => {
  const params = useParams()

  const [file, setFile] = React.useState<File>()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { edgestore } = useEdgeStore()
  const { url, isOpen, onClose } = useCoverImage()

  const update = useMutation(api.documents.update)

  const onComplete = () => {
    setFile(undefined)
    setIsSubmitting(false)
    onClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file)
      setIsSubmitting(true)

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
      })

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      })

      onComplete()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <ImageDropzone
          value={file}
          onChange={onChange}
          disabled={isSubmitting}
          className="w-full outline-none"
        />
      </DialogContent>
    </Dialog>
  )
}
