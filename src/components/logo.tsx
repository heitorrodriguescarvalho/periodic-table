'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Logo() {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="flex items-center gap-4">
      <Image
        src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
        width={32}
        height={32}
        alt="logo"
        priority
      />
      <span className="text-lg font-semibold text-foreground">
        Periodic Table
      </span>
    </div>
  )
}
