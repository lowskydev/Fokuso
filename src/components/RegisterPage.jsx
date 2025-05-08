import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-white px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">Full Name</Label>
            <Input id="name" type="text" placeholder="Enter your name" required />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" required />
          </div>
          <Button className="w-full" type="submit">Sign Up</Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;