import Logo from '@/components/logo'
import { ThemeModeToggle } from '@/components/theme-mode-toggle'

export default function Navbar() {
  return (
    <div className="flex justify-between px-8 py-4">
      <Logo />
      <ThemeModeToggle />
    </div>
  )
}
