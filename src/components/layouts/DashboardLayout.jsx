"use client"

import { Outlet, useNavigate, useLocation } from "react-router-dom"
import useAuthStore from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Timer, Calendar, CheckSquare, BarChart3, Brain, LogOut, User, ChevronRight, Sparkles } from "lucide-react"
import logo from "@/assets/logo.png"
// import themeToggle
import ThemeToggle from "@/components/ThemeToggle"

const SidebarItem = ({ label, path, icon: Icon, isActive }) => {
  const navigate = useNavigate()

  return (
    <div
      className={`group relative p-4 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
        isActive
          ? "bg-gradient-to-r from-primary/20 to-red-500/20 text-primary border border-primary/30 shadow-xl backdrop-blur-sm"
          : "hover:bg-white/10 hover:shadow-lg text-muted-foreground hover:text-foreground backdrop-blur-sm border border-transparent"
      }`}
      onClick={() => navigate(path)}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl transition-all duration-500 ${
            isActive
              ? "bg-gradient-to-br from-primary to-red-500 text-primary-foreground shadow-lg scale-110"
              : "bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-red-500/20 group-hover:text-primary group-hover:scale-105"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-semibold text-lg">{label}</span>
        <ChevronRight
          className={`w-5 h-5 ml-auto transition-all duration-500 ${
            isActive
              ? "opacity-100 translate-x-2 text-primary"
              : "opacity-0 group-hover:opacity-100 group-hover:translate-x-2"
          }`}
        />
      </div>

      {/* Active indicator with glow */}
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-primary to-red-500 rounded-r-full shadow-lg shadow-primary/50"></div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
      {/* Animated background elements - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-primary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-red-300/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-primary/10 pointer-events-none"></div>

      {/* Sidebar - Enhanced with glass morphism */}
      <aside className="relative z-10 w-80 p-8 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
        {/* Logo Section - Enhanced */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4 p-4 rounded-2xl backdrop-blur-sm">
            <img src={logo || "/placeholder.svg"} alt="Fokuso Logo" className="w-12 h-12 rounded-xl" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Fokuso
              </h2>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/20 to-red-500/20 text-primary border-primary/30 text-xs px-3 py-1 backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Dashboard
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation - Enhanced */}
        <nav className="space-y-4">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-4">
              Navigation
            </h3>
          </div>
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

        <Separator className="my-8 bg-white/20" />

        {/* User Profile Section - Enhanced */}
        <div className="absolute bottom-8 left-8 right-8 space-y-6">
          <div className="flex items-center gap-4 p-6 backdrop-blur-sm rounded-2xl">
            <Avatar className="w-14 h-14 border-2 border-primary/30">
              <AvatarFallback className="bg-gradient-to-br from-primary to-red-500 text-primary-foreground font-bold text-lg">
                {getInitials(user)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-muted-foreground/80 font-medium">Welcome back</div>
              <div className="font-bold text-foreground truncate text-lg">{user || "User"}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Logout Button - Enhanced */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-14 bg-white/5 backdrop-blur-sm border-transparent hover:border-red-500/50 hover:bg-red-50/10 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 group transform hover:scale-[1.02] text-lg font-semibold"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Sign Out
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground/70 font-medium">Stay focused, stay productive</p>
          </div>
        </div>
      </aside>

      {/* Main content area - Enhanced */}
      <main className="relative z-10 flex-1 bg-white/5 backdrop-blur-sm">
        {/* Content Header - Enhanced */}
        <div className="border-b border-white/20 bg-white/10 backdrop-blur-xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {navigationItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
              <p className="text-muted-foreground/80 text-lg font-medium mt-1">
                {location.pathname === "/dashboard/pomodoro" && "Focus with the Pomodoro Technique"}
                {location.pathname === "/dashboard/calendar" && "Manage your schedule"}
                {location.pathname === "/dashboard/todo" && "Track your tasks"}
                {location.pathname === "/dashboard/flashcards" && "Study with spaced repetition"}
                {location.pathname === "/dashboard/stats" && "View your progress"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/20 to-red-500/20 text-primary border-primary/30 px-6 py-3 text-lg font-semibold backdrop-blur-sm shadow-lg"
              >
                <User className="w-5 h-5 mr-2" />
                {user || "User"}
              </Badge>

              {/* Theme Toggle */}
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Content - Enhanced */}
        <div className="p-8 overflow-y-auto h-[calc(100vh-6rem)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
