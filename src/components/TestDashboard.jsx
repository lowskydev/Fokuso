import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const SidebarItem = ({ label }) => (
  <div className="p-3 rounded hover:bg-muted transition cursor-pointer text-sm font-medium">
    {label}
  </div>
);

export default function TestDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  console.log("User:", user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-muted border-r shadow-sm">
        <h2 className="text-xl font-bold mb-6">Fokuso</h2>
        <nav className="space-y-2">
          <Link to="/pomodoropage">
            <SidebarItem label="Pomodoro" />
          </Link>
          <SidebarItem label="Calendar" />
          <SidebarItem label="Todo List" />
          <SidebarItem label="Statistics" />
        </nav>

        <Separator className="my-6" />

        <div className="text-sm mb-2">Logged in as:</div>
        <div className="font-semibold mb-4">{user?.name || "User"}</div>

        <Button variant="destructive" onClick={handleLogout} className="w-full mt-auto">
          Logout
        </Button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || "User"}!</h1>
        <p>This is your dashboard</p>
      </main>
    </div>
  );
}
