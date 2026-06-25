import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "../../lib/cn"

const Popover = ({ ...props }: PopoverPrimitive.Root.Props) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

const PopoverTrigger = ({ ...props }: PopoverPrimitive.Trigger.Props) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

const PopoverContent = ({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 flex-col gap-2.5 rounded-3xl border-0 bg-zinc-800/70 p-5 text-white shadow-md backdrop-blur-md outline-none",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
