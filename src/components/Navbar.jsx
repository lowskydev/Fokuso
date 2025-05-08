import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Theater } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-background border-b border-border shadow p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-foreground">Fokuso</h1>
        </Link>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="outline" className="cursor-pointer">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="cursor-pointer">Sign Up</Button>
          </Link>
          <ThemeToggle className="ml-4" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;