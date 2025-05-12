import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

function LandingPage() {
  const features = [
    {
      title: "Pomodoro Timer",
      description: "Improve your concentration and productivity using Pomodoro Timer.",
    },
    {
      title: "Calendar",
      description: "Manage your study timings to learn efficiently.",
    },
    {
      title: "Flash Cards",
      description: "Create personalized Flash Cards to test your memory.",
    },
  ];

  //default times
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [showModal, setShowModal] = useState(false);

  //saves the customized timer and redirects to page
  const handleSaveSettings = () => {

    localStorage.setItem("studyDuration", studyTime * 60);
    localStorage.setItem("breakDuration", breakTime * 60);
    setShowModal(false);

    window.location.href = "/pomodoropage";
  };

  return (
    <main className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-zinc-900 dark:to-zinc-800">
      <h2 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">
        Welcome to Fokuso
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
        Fokuso helps you manage tasks, connect with others, and stay productive. Explore the features and get started now.
      </p>

      <Link to="/register">
        <Button size="lg" className="mb-12 cursor-pointer">
          Get Started
        </Button>
      </Link>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            isPomodoro={feature.title === "Pomodoro Timer"}
            onClick={() => {
              if (feature.title === "Pomodoro Timer") {
                setShowModal(true);  //pop up
              }
            }}
          />
        ))}
      </div>

      {}
    </main>
  );
}

const FeatureCard = ({ title, description, isPomodoro, onClick }) => {
  return (
    <div className="w-full h-52 cursor-pointer" onClick={onClick}>
      <Card className="w-full h-full flex items-center justify-center shadow-lg dark:bg-zinc-800 rounded-lg">
        <CardContent className="flex items-center justify-center h-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;