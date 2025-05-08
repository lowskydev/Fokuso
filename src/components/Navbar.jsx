import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Fokuso</h1>
        </Link>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="outline" className="cursor-pointer">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="cursor-pointer">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;