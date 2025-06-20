"use client"

import { Outlet, useNavigate, useLocation } from "react-router-dom"
import useAuthStore from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Timer, Calendar, CheckSquare, BarChart3, Brain, LogOut, Sparkles, User, ChevronRight } from "lucide-react"

const SidebarItem = ({ label, path, icon: Icon, isActive }) => {
  const navigate = useNavigate()

  return (
    <div
      className={`group relative p-4 rounded-xl transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-primary/10 text-primary border border-primary/20 shadow-lg"
          : "hover:bg-card/50 hover:shadow-md text-muted-foreground hover:text-foreground"
      }`}
      onClick={() => navigate(path)}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted group-hover:bg-primary/20 group-hover:text-primary"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium">{label}</span>
        <ChevronRight
          className={`w-4 h-4 ml-auto transition-all duration-300 ${
            isActive ? "opacity-100 translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
          }`}
        />
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
      )}
    </div>
  )
}

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  const navigationItems = [
    { label: "Pomodoro", path: "/dashboard/pomodoro", icon: Timer },
    { label: "Calendar", path: "/dashboard/calendar", icon: Calendar },
    { label: "Todo List", path: "/dashboard/todo", icon: CheckSquare },
    { label: "Flash Cards", path: "/dashboard/flashcards", icon: Brain },
    { label: "Statistics", path: "/dashboard/stats", icon: BarChart3 },
  ]

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 via-rose-100 to-pink-200 dark:bg-gradient-to-br dark:from-background dark:via-card dark:to-muted overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-80 p-6 bg-background/80 backdrop-blur-md border-r border-border shadow-2xl">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Fokuso
            </h2>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1">
            Dashboard
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.path}
              label={item.label}
              path={item.path}
              icon={item.icon}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        <Separator className="my-6 bg-border" />

        {/* User Profile Section - Fixed to bottom */}
        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-red-500 text-primary-foreground font-semibold">
                {getInitials(user)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-muted-foreground">Welcome back</div>
              <div className="font-semibold text-foreground truncate">{user || "User"}</div>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-12 border-border hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Sign Out
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Stay focused, stay productive</p>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="relative z-10 flex-1 bg-background/60 backdrop-blur-sm">
        {/* Content Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-md px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {navigationItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                {location.pathname === "/dashboard/pomodoro" && "Focus with the Pomodoro Technique"}
                {location.pathname === "/dashboard/calendar" && "Manage your schedule"}
                {location.pathname === "/dashboard/todo" && "Track your tasks"}
                {location.pathname === "/dashboard/flashcards" && "Study with spaced repetition"}
                {location.pathname === "/dashboard/stats" && "View your progress"}
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <User className="w-4 h-4 mr-2" />
              {user || "User"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto h-[calc(100vh-5rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
