import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/logo.png";

function Navbar() {
  return (
    <nav className="border-b border-border shadow p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Fokuso Logo" className="h-14 w-14" />
          <h1 className="text-2xl font-bold text-foreground">Fokuso</h1>
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