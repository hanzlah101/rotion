"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { useSettings } from "@/hooks/use-settings"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

export const SettingsModal = () => {
  const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3 text-lg font-medium">
          My Settings
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-sm text-muted-foreground">
              Customize how rotion looks and feels.
            </span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}
