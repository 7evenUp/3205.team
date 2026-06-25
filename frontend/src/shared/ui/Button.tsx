import { type ComponentProps } from "react"
import { Refresh } from "iconoir-react"

import { cn } from "../../lib/cn"

const Button = ({
  className,
  children,
  isLoading,
  ...props
}: ComponentProps<"button"> & { isLoading?: boolean }) => {
  return (
    <button
      className={cn(
        "flex h-11 items-center justify-center gap-2 rounded-[18px] bg-mauve-400 px-5 text-lg font-medium text-mauve-800 transition-colors hover:bg-mauve-500 hover:text-mauve-900 active:bg-mauve-600",
        className
      )}
      {...props}
    >
      {isLoading && <Refresh className="size-4 animate-spin" />}
      {children}
    </button>
  )
}

export default Button
