import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const spinnerVariant = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "w-4 h-4",
      sm: "w-2 h-2",
      lg: "w-6 h-6",
      xl: "w-10 h-10",
      icon: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariant> {}

export const Spinner = ({ size }: SpinnerProps) => {
  return <Loader2 className={cn(spinnerVariant({ size }))} />
}
