"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useAuthStore from "@/store/useAuthStore";

import { useEffect } from "react";

function LoginPage() {
  useEffect(() => {
    // Scroll to top first, then prevent body scrolling
    window.scrollTo(0, 0);
    document.body.classList.add("auth-page");

    return () => {
      // Cleanup when component unmounts
      document.body.classList.remove("auth-page");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/user/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessages = Object.entries(data)
          .map(
            ([field, messages]) =>
              `${
                field.charAt(0).toUpperCase() + field.slice(1)
              }: ${messages.join(", ")}`
          )
          .join("\n");

        toast.error(errorMessages);
        return;
      }

      const userResponse = await fetch(
        import.meta.env.VITE_API_URL + "/api/user/me/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${data.token}`,
          },
        }
      );

      const userData = await userResponse.json();
      if (!userResponse.ok) {
        toast.error("Failed to fetch user data.");
        return;
      }

      login(data.token, userData.name);
      toast.success("Login successful!");
      navigate("/dashboard/stats");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-100 to-pink-200 dark:bg-gradient-to-br dark:from-background dark:via-card dark:to-muted">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-primary/10 pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Sign In to
              <span className="block bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                Fokuso
              </span>
            </h1>
            <p className="text-muted-foreground">Continue your focus journey</p>
          </div>

          {/* Login Card */}
          <Card className="bg-card/80 backdrop-blur-md border-border shadow-2xl hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-4 md:p-6">
              <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-card-foreground font-medium"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-9 md:h-10 bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-card-foreground font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-9 md:h-10 bg-background/50 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-9 md:h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-4 md:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">
                    New to Fokuso?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Start your focus journey today
                </p>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full h-9 md:h-10 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    Create New Account
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-4 md:mt-6">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link
                to="/terms"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
