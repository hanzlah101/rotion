"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useQuery, useMutation } from "convex/react"

import { Cover } from "@/components/cover"
import { Toolar } from "@/components/toolar"
import { Skeleton } from "@/components/ui/skeleton"

import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"

type DocumentIdPageProps = {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = ({ params: { documentId } }: DocumentIdPageProps) => {
  const Editor = React.useMemo(
    () =>
      dynamic(() => import("@/components/editor"), {
        ssr: false,
      }),
    []
  )

  const update = useMutation(api.documents.update)

  const document = useQuery(api.documents.getById, {
    id: documentId,
  })

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>
      </div>
    )
  }

  if (document === null) {
    return <div>Document not found</div>
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolar initialData={document} />
        <Editor
          initialContent={document.content}
          onChange={(content) => update({ id: documentId, content })}
        />
      </div>
    </div>
  )
}

export default DocumentIdPage
