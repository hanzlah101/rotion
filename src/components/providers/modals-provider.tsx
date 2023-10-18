"use client"

import * as React from "react"

import { SettingsModal } from "@/components/modals/settings-modal"
import { CoverImageModal } from "@/components/modals/cover-image-modal"

export const ModalsProvider = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  )
}
