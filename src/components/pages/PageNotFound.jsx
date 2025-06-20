"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Home, ArrowLeft, Sparkles, Search } from "lucide-react"

function PageNotFound() {
  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-red-50 via-rose-100 to-pink-200 dark:bg-gradient-to-br dark:from-background dark:via-card dark:to-muted overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-primary/10 pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-center h-screen px-4 py-12 overflow-hidden">
        <div className="w-full max-w-2xl text-center">
          {/* Error Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
          >
            <Search className="w-4 h-4 mr-2" />
            Page Not Found
          </Badge>

          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent leading-none animate-pulse">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off. Let's get you back on track to your
              <span className="font-semibold text-primary"> focus journey</span>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Go Home
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="group bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 text-foreground hover:text-primary px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="space-y-4">
            <p className="text-muted-foreground font-medium">Or try one of these:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-300"
                >
                  Create Account
                </Button>
              </Link>
              <Link to="/dashboard/stats">
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-300"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-16">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm">Stay focused, even when lost</p>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
