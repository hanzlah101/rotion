"use client"

import * as React from "react"
import { toast } from "sonner"
import { useMutation } from "convex/react"

import { useOrigin } from "@/hooks/use-origin"

import { api } from "@/../convex/_generated/api"
import { Doc } from "@/../convex/_generated/dataModel"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Check, Copy, Globe } from "lucide-react"

type PublishProps = {
  initialData: Doc<"documents">
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin()
  const update = useMutation(api.documents.update)

  const [copied, setCopied] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const url = `${origin}/preview/${initialData._id}`

  const onPublish = async () => {
    setIsSubmitting(true)

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false))

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published successfully",
      error: "Failed to publish note",
    })
  }

  const onUnPublish = async () => {
    setIsSubmitting(true)

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false))

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished successfully",
      error: "Failed to unpublish note",
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant={"ghost"}>
          Publish
          {initialData.isPublished && (
            <Globe className="h-4 w-4 text-sky-500 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-72"
        alignOffset={8}
        forceMount={true}
      >
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="w-4 h-4 animate-pulse text-sky-500" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                readOnly={true}
                className="flex-1 px-2 text-xs outline-none border rounded-l-md h-8 bg-muted truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="w-8 h-8 rounded-l-none p-0"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              onClick={onUnPublish}
              disabled={isSubmitting}
              className="text-xs w-full"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="mb-4 text-muted-foreground text-xs">
              Share your work with others.
            </span>
            <Button
              size="sm"
              onClick={onPublish}
              disabled={isSubmitting}
              className="text-xs w-full"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
