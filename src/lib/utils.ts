import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { elements } from '@/constants/elements'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function organizeElementsTable(elementsList: typeof elements) {
  const elementsDividedByRow = Array.from({ length: 9 }).map(
    () => [] as (typeof elements)[0][],
  )

  elementsList.forEach((element) =>
    elementsDividedByRow[element.ypos - 1].push(element),
  )

  return elementsDividedByRow
}

export function hexToRgba(hex: string, darkness: number) {
  if (!hex) return ''

  hex = hex.replace('#', '')

  if (darkness > 1) darkness = 1
  if (darkness < 0) darkness = 0

  const r = parseInt(hex.substring(0, 2), 16) * darkness
  const g = parseInt(hex.substring(2, 4), 16) * darkness
  const b = parseInt(hex.substring(4, 6), 16) * darkness

  return `rgba(${r}, ${g}, ${b})`
}

export function capitalizePhraseFirstLetter(phrase: string) {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1)
}

export function formatTemperature(
  kelvin: number,
  measurement: 'celsius' | 'fahrenheit' | 'kelvin',
) {
  if (measurement === 'kelvin') return `${kelvin} K`

  if (measurement === 'celsius')
    return `${parseFloat((kelvin - 273.15).toFixed(6))} ºC`

  if (measurement === 'fahrenheit')
    return `${parseFloat((((kelvin - 273.15) * 9) / 5 + 32).toFixed(6))} ºF`
}
