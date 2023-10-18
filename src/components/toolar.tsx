"use client"

import * as React from "react"
import { useMutation } from "convex/react"
import { ImageIcon, Smile, X } from "lucide-react"
import TextArea from "react-textarea-autosize"

import { Button } from "@/components/ui/button"
import { IconPicker } from "@/components/icon-picker"
import { useCoverImage } from "@/hooks/use-cover-image"

import { api } from "@/../convex/_generated/api"
import { Doc } from "@/../convex/_generated/dataModel"

type ToolarProps = {
  initialData: Doc<"documents">
  preview?: boolean
}

export const Toolar = ({ initialData, preview }: ToolarProps) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState(initialData.title)

  const inputRef = React.useRef<React.ElementRef<"textarea">>(null)
  const coverImage = useCoverImage()

  const update = useMutation(api.documents.update)
  const removeIcon = useMutation(api.documents.removeIcon)

  const enableInput = () => {
    if (preview) return

    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }

  const onInput = (value: string) => {
    setValue(value)
    update({
      id: initialData._id,
      title: value || "Untitled",
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  const onIconSelect = (icon?: string) => {
    update({
      id: initialData._id,
      icon,
    })
  }

  const onIconRemove = () => {
    removeIcon({
      id: initialData._id,
    })
  }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={(e) => onIconSelect(e)}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            size="icon"
            variant="outline"
            onClick={onIconRemove}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={(e) => onIconSelect(e)}>
            <Button
              size="sm"
              variant="outline"
              className="text-muted-foreground text-xs"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            size="sm"
            variant="outline"
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextArea
          value={value}
          ref={inputRef}
          onKeyDown={onKeyDown}
          onBlur={() => setIsEditing(false)}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent focus-visible:outline-none font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}
