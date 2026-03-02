"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-slate-400 hover:text-slate-100 hover:bg-[#2a3040] dark:hover:bg-slate-800 transition-colors w-full flex justify-start px-3 py-2 h-auto"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-3 hidden dark:block" />
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-3 block dark:hidden" />
            <span className="block dark:hidden">Switch to Dark Mode</span>
            <span className="hidden dark:block">Switch to Light Mode</span>
        </Button>
    )
}
