"use client"

import * as React from "react"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/utils"
import { api } from "@/../convex/_generated/api"
import { Doc, Id } from "@/../convex/_generated/dataModel"

import { Item } from "./item"
import { FileIcon } from "lucide-react"

type DocumentListProps = {
  level?: number
  data?: Doc<"documents">[]
  parentDocumentId?: Id<"documents">
}

export const DocumentList = ({
  level = 0,
  parentDocumentId,
}: DocumentListProps) => {
  const params = useParams()
  const router = useRouter()

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  })

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }))
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            {[...Array(7)].map((_, i) => (
              <Item.Skeleton key={i} level={level} />
            ))}
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <Item
            level={level}
            icon={FileIcon}
            id={document._id}
            label={document.title}
            documentIcon={document.icon}
            expanded={expanded[document._id]}
            onExpand={() => onExpand(document._id)}
            active={params.documentId === document._id}
            onClick={() => router.push(`/documents/${document._id}`)}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}
