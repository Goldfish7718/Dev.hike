import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    if (theme == 'light') setTheme('dark')
    else setTheme('light')
  }

  return (
    <Button variant='outline' onClick={handleTheme}>
      {theme == 'light' ? 
        <>
          <span>Sunrise</span>
          <Sun size={18} className="mx-1" />
        </> : 
        <>
          <span>After hours</span>
          <Moon size={18} className="mx-1" />
        </>
      }
    </Button>
  )
}
