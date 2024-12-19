'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { MoonIcon, SunIcon, User } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Navbar() {
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-900 dark:border-sky-800 bg-sky-950 dark:bg-sky-900 text-sky-100">
      <div className="container flex h-14 items-center">
        <SidebarTrigger className="text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-800" />
        <div className="mx-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://1000marcas.net/wp-content/uploads/2021/05/MikroTik-logo.png"
              alt="Nubicom Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="text-sky-100 hover:text-sky-300">Dashboard</Link>
            <Link href="/devices" className="text-sky-100 hover:text-sky-300">Devices</Link>
            <Link href="/alerts" className="text-sky-100 hover:text-sky-300">Alerts</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input
              className="h-9 md:w-[300px] lg:w-[400px] bg-sky-900 dark:bg-sky-800 text-sky-100 placeholder-sky-400 border-sky-700"
              placeholder="Search..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-800">
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-sky-950 dark:bg-sky-900 text-sky-100">
              <DropdownMenuItem className="hover:bg-sky-900 dark:hover:bg-sky-800">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-sky-900 dark:hover:bg-sky-800">Settings</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-sky-900 dark:hover:bg-sky-800">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-800">
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-sky-950 dark:bg-sky-900 text-sky-100">
              <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-sky-900 dark:hover:bg-sky-800">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-sky-900 dark:hover:bg-sky-800">
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-sky-900 dark:hover:bg-sky-800">
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}