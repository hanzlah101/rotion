"use client"

import "@blocknote/core/style.css"
import { useTheme } from "next-themes"
import { BlockNoteView, useBlockNote } from "@blocknote/react"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"

import { useEdgeStore } from "@/utils/edgestore"

type EditorProps = {
  editable?: boolean
  initialContent?: string
  onChange: (value: string) => void
}

const Editor = ({ editable, initialContent, onChange }: EditorProps) => {
  const { edgestore } = useEdgeStore()
  const { resolvedTheme } = useTheme()

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    })

    return res.url
  }

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    uploadFile: handleUpload,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor
