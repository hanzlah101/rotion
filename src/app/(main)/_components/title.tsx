"use client"

import * as React from "react"
import { useMutation } from "convex/react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { api } from "@/../convex/_generated/api"
import { Doc } from "@/../convex/_generated/dataModel"

type TitleProps = {
  initialData: Doc<"documents">
}

export const Title = ({ initialData }: TitleProps) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [title, setTitle] = React.useState(initialData?.title ?? "Untitled")

  const inputRef = React.useRef<HTMLInputElement>(null)

  const update = useMutation(api.documents.update)

  const enableInput = () => {
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length)
    }, 0)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    update({
      id: initialData._id,
      title: e.target.value || "Untitled",
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData?.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          value={title}
          ref={inputRef}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={() => setIsEditing(false)}
          className="h-7 px-2 bg-secondary ring-offset-secondary focus-visible:ring-transparent"
        />
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={enableInput}
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  )
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-5 w-20 rounded-sm" />
}
