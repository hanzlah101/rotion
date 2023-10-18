"use client"

import Image from "next/image"
import { useMutation } from "convex/react"
import { ImageIcon, X } from "lucide-react"
import { useParams } from "next/navigation"

import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { useEdgeStore } from "@/utils/edgestore"
import { Skeleton } from "@/components/ui/skeleton"
import { useCoverImage } from "@/hooks/use-cover-image"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

type CoverProps = {
  url?: string
  preview?: boolean
}

export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams()
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore()

  const update = useMutation(api.documents.removeCoverImage)

  const onRemove = async () => {
    update({
      id: params.documentId as Id<"documents">,
    })

    if (url) {
      await edgestore.publicFiles.delete({
        url,
      })
    }
  }

  return (
    <div
      className={cn(
        "relative w-full h-[40vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image fill src={url} alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            size="sm"
            variant={"outline"}
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
          <Button
            size="sm"
            onClick={onRemove}
            variant={"destructive"}
            className="text-xs text-white"
          >
            <X className="w-4 h-4 mr-2" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />
}
