"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border shadow-lg sticky top-0 z-50 transition-all duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={logo || "/placeholder.svg"}
                alt="Fokuso Logo"
                className="h-12 w-12 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-all duration-300">
                Fokuso
              </h1>
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0 bg-primary/10 text-primary border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Focus Master
              </Badge>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">
            {/* Login Button */}
            <Link to="/login">
              <Button
                variant="outline"
                className="relative overflow-hidden bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300 group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>

            {/* Sign Up Button */}
            <Link to="/register">
              <Button className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <span className="relative z-10 font-semibold">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>

            {/* Theme Toggle with enhanced styling */}
            <div className="ml-2 p-1 rounded-lg bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted/70 transition-all duration-300">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </nav>
  );
}

export default Navbar;
