import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function LoginPage() {
return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background px-4">
    <Card className="w-full max-w-md p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
        <form className="space-y-4">
        <div>
            <Label htmlFor="email" className="mb-2">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
        </div>
        <div>
            <Label htmlFor="password" className="mb-2">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required />
        </div>
        <Button className="w-full" type="submit">Login</Button>
        </form>
        <p className="text-sm text-center text-foreground mt-4">
        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
    </Card>
    </div>
);
}

export default LoginPage;