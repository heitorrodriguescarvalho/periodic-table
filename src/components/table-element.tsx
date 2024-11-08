'use client'

import { HTMLProps, useState } from 'react'

import { useTheme } from 'next-themes'

import { cn, hexToRgba } from '@/lib/utils'

import ElementDialog from '@/components/element-dialog'
import { Dialog } from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { elements } from '@/constants/elements'
import { elementsColors } from '@/constants/elements-bg-color'

interface Props extends HTMLProps<HTMLSpanElement> {
  element: (typeof elements)[0]
}

export default function TableElement({ element, className }: Props) {
  const [hover, setHover] = useState(false)
  const [dialog, setDialog] = useState(false)

  const { resolvedTheme: theme } = useTheme()

  const backgroundColor = elementsColors[element.category] || ''

  if (backgroundColor === '') console.log(element.name)

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            translate="no"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setDialog(true)}
            className={cn(
              'flex aspect-square min-w-12 flex-1 cursor-pointer flex-col items-center justify-center rounded-[.2rem] p-1 text-sm font-semibold dark:text-white md:text-base lg:text-xl',
              className,
            )}
            style={{
              backgroundColor: hexToRgba(
                backgroundColor,
                (theme === 'dark' ? 0.6 : 1) - (hover ? 0.1 : 0),
              ),
            }}
          >
            <p className="w-full text-xs">{element.number}</p>
            {element.symbol}
            <p className="text-xs">
              {parseFloat(element.atomic_mass.toFixed(3))}
            </p>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs font-medium">{element.name}</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <ElementDialog element={element} />
      </Dialog>
    </>
  )
}
