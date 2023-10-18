"use client"

import Image from "next/image"
import { toast } from "sonner"
import { PlusCircle } from "lucide-react"
import { useMutation } from "convex/react"
import { useUser } from "@clerk/clerk-react"

import { Button } from "@/components/ui/button"
import { api } from "@/../convex/_generated/api"

const DocumentsPage = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = async () => {
    const promise = create({ title: "Untitled" })
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created",
      error: "Failed to create note",
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        alt="Empty"
        width={300}
        height={300}
        src="/empty.png"
        className="object-contain dark:hidden"
      />
      <Image
        alt="Empty"
        width={300}
        height={300}
        src="/empty-dark.png"
        className="object-contain dark:block hidden"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Rotion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage
