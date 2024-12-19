'use client'

import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Radio,
  Antenna,
  Box,
  MapPin,
  Server,
  Battery,
  Wrench,
  Users,
  FileSpreadsheet,
  Network,
  Settings,
  LogOut,
  Menu,
  User2, 
  ChevronUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    variant: "default",
    color: "#4CAF50", // Green
  },
  {
    label: "Marcas",
    icon: Radio,
    href: "/marcas",
    variant: "ghost",
    color: "#FF5722", // Deep Orange
  },
  {
    label: "Parábolas",
    icon: Antenna,
    href: "/parabolas",
    variant: "ghost",
    color: "#2196F3", // Blue
  },
  {
    label: "Casillas",
    icon: Box,
    href: "/casillas",
    variant: "ghost",
    color: "#9C27B0", // Purple
  },
  {
    label: "Zonas",
    icon: MapPin,
    href: "/zonas",
    variant: "ghost",
    color: "#FFC107", // Amber
  },
  {
    label: "Nodos",
    icon: Server,
    href: "/nodos",
    variant: "ghost",
    color: "#673AB7", // Deep Purple
  },
  {
    label: "Equipamiento",
    icon: Battery,
    href: "/equipamiento",
    variant: "ghost",
    color: "#FF9800", // Orange
  },
  {
    label: "Asistencias",
    icon: Wrench,
    href: "/asistencias",
    variant: "ghost",
    color: "#009688", // Teal
  },
  {
    label: "Personal",
    icon: Users,
    href: "/personal",
    variant: "ghost",
    color: "#3F51B5", // Indigo
  },
  {
    label: "Reportes",
    icon: FileSpreadsheet,
    href: "/reportes",
    variant: "ghost",
    color: "#F44336", // Red
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="flex flex-col h-screen bg-sky-950 dark:bg-sky-900 text-white">
      <SidebarHeader className="border-b border-sky-900 dark:border-sky-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <Network className="h-6 w-6 text-sky-400" />
          <span className="font-semibold text-sky-100">Gestión de Red</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sky-400">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.href} 
                        className={`flex items-center text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-800 ${
                          isActive ? 'bg-sky-800 dark:bg-sky-700' : ''
                        }`}
                      >
                        <item.icon style={{ color: item.color }} className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sky-900 dark:border-sky-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-800">
                  <User2 className="mr-2 h-4 w-4" /> 
                  <span>Username</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 bg-sky-950 dark:bg-sky-900 text-sky-100"
              >
                <DropdownMenuItem className="hover:bg-sky-900 dark:hover:bg-sky-800">
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-sky-900 dark:hover:bg-sky-800">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-sky-900 dark:hover:bg-sky-800">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}