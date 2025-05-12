import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { data, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/user/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

    const data = await response.json();

    if (!response.ok) {
      // Django sends errors in a { field: [messages] } format
      const errorMessages = Object.entries(data)
        .map(([field, messages]) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${messages.join(", ")}`)
        .join("\n");

      toast.error(errorMessages);
      return;
    }

      // Optionally redirect to login or auto-login
      toast.success("Registration successful!");
      navigate("/login");

    } catch (err) {
        toast.error("Something went wrong. Please try again.");
        console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-zinc-900 dark:to-zinc-800">
      <Card className="w-full max-w-md p-6 shadow-lg dark:bg-zinc-800 dark:text-white">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="mb-2">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">Sign Up</Button>
          </form>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;