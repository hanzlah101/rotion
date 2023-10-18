"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import EmojiPicker, { Theme } from "emoji-picker-react"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

type IconPickerProps = {
  asChild?: boolean
  children: React.ReactNode
  onChange: (icon: string) => void
}

export const IconPicker = ({
  asChild,
  onChange,
  children,
}: IconPickerProps) => {
  const [open, setOpen] = React.useState(false)

  const { resolvedTheme } = useTheme()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 shrink-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={resolvedTheme as Theme}
          onEmojiClick={(e) => {
            onChange(e.emoji)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
