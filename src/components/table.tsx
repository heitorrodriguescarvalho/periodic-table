'use client'

import { organizeElementsTable } from '@/lib/utils'

import TableElement from '@/components/table-element'

import { elements } from '@/constants/elements'

export default function Table() {
  const elementsOrganized = organizeElementsTable(elements)

  return (
    <div className="flex min-w-[1028px] flex-col gap-4">
      <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-7 gap-px">
        {elementsOrganized.slice(0, 7).map((row, i) => (
          <>
            {Array.from({ length: 18 }).map((_, idx) => {
              const [hasElement] = row.filter((el) => el.xpos - 1 === idx)

              if (hasElement)
                return <TableElement key={`${i}_${idx}`} element={hasElement} />
              else
                return (
                  <span
                    key={`${i}_${idx}`}
                    className="aspect-square flex-1 p-1"
                  />
                )
            })}
          </>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-2 gap-px">
        {elementsOrganized.slice(7).map((row, i) => (
          <>
            {Array.from({ length: 18 }).map((_, idx) => {
              const [hasElement] = row.filter((el) => el.xpos - 1 === idx)

              if (hasElement)
                return <TableElement key={`${i}_${idx}`} element={hasElement} />
              else
                return (
                  <span
                    key={`${i}_${idx}`}
                    className="aspect-square flex-1 p-1"
                  />
                )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
