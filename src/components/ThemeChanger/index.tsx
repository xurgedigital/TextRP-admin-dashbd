import { useTheme } from 'next-themes'
import React from 'react'
import { HiMoon } from 'react-icons/hi'
import { BsSunFill } from 'react-icons/bs'

const ThemeChanger = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-[3px]  transition-all"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <BsSunFill className="h-4 w-4 text-primary-blue" />
      ) : (
        <HiMoon className="h-4 w-4 text-secondary-text" />
      )}
    </button>
  )
}

export default ThemeChanger
