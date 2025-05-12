import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SidebarItem = ({ label, path }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-3 rounded hover:bg-muted transition cursor-pointer text-sm font-medium"
      onClick={() => navigate(path)}
    >
      {label}
    </div>
  );
};

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-muted border-r shadow-sm">
        <h2 className="text-xl font-bold mb-6">Fokuso</h2>
        <nav className="space-y-2">
          <SidebarItem label="Pomodoro" path="/dashboard/pomodoro" />
          <SidebarItem label="Calendar" path="/dashboard/calendar" />
          <SidebarItem label="Todo List" path="/dashboard/todo" />
          <SidebarItem label="Statistics" path="/dashboard/stats" />
        </nav>

        <Separator className="my-6" />

        <div className="text-sm mb-2">Logged in as:</div>
        <div className="font-semibold mb-4">{user || "User"}</div>

        <Button variant="destructive" onClick={handleLogout} className="w-full mt-auto">
          Logout
        </Button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
