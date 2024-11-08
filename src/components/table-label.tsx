'use client'

import { useTheme } from 'next-themes'

import { hexToRgba } from '@/lib/utils'

import { elementsColors } from '@/constants/elements-bg-color'

export default function TableLabel() {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="flex max-w-[1028px] flex-1 flex-wrap gap-8 px-8">
      {Object.entries(elementsColors).map((values, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="flex size-5 items-center justify-center rounded-[.4rem]"
            style={{
              backgroundColor: hexToRgba(values[1], theme === 'dark' ? 0.6 : 1),
            }}
          />

          <p className="text-nowrap capitalize">{values[0]}</p>
        </div>
      ))}
    </div>
  )
}
