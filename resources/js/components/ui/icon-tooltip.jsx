import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
const IconToolTip = ({label, children, className}) => {
  return (
    <div className={className}>
        <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
            <p>{label}</p>
        </TooltipContent>
        </Tooltip>
    </div>
  )
}

export default IconToolTip