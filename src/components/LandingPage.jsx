import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6 py-20 bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-4">Welcome to Fokuso</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl">
        Fokuso helps you manage tasks, connect with others, and stay productive. Explore the features and get started now.
      </p>

      <Link to="/register">
        <Button size="lg" className="mb-12 cursor-pointer">Get Started</Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Feature One</h3>
            <p>Fuck.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
            <p>Care.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
            <p >Lay low.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default LandingPage;