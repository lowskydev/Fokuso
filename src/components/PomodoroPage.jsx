import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PomodoroPage() {
  const initialStudyTime = parseInt(localStorage.getItem("studyDuration") || "1500", 10); 
  const initialBreakTime = parseInt(localStorage.getItem("breakDuration") || "300", 10); 
  
  const [timeLeft, setTimeLeft] = useState(initialStudyTime);
  const [breakTimeLeft, setBreakTimeLeft] = useState(initialBreakTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (isBreak && breakTimeLeft > 0) {
          setBreakTimeLeft((prevTime) => prevTime - 1);
        } else if (!isBreak && timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          if (!isBreak) {
            setIsBreak(true);
            setBreakTimeLeft(initialBreakTime); // Reset break time
          } else {
            setIsBreak(false);
            setTimeLeft(initialStudyTime); // Reset study time
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, breakTimeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(initialStudyTime); 
    setBreakTimeLeft(initialBreakTime);  
  };

  return (
    <main className="flex flex-col items-center justify-center px-6 py-20 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-zinc-900 dark:to-zinc-800">
      <h2 className="text-4xl font-bold text-center mb-4 text-zinc-900 dark:text-white">
        {isBreak ? "Break Session" : "Study Session"}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl text-center">
        Stay Fokused!
      </p>

      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 mb-8">
        <CardContent className="flex flex-col items-center gap-6 py-10">
          {}
          <div
            className={`transition-all duration-500 text-7xl font-mono text-gray-900 dark:text-white tracking-wider ${isBreak ? "text-lg translate-y-4" : ""}`}
          >
            {formatTime(timeLeft)}
          </div>

          {}
          <div
            className={`transition-all duration-500 text-3xl font-bold text-gray-900 dark:text-white tracking-wider ${!isBreak ? "text-lg translate-y-4" : "text-6xl"}`}
          >
            {formatTime(breakTimeLeft)}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleStartPause}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default PomodoroPage;
