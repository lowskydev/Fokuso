import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PomodoroPage() {
  const defaultStudy = 1500; // 25 min
  const defaultBreak = 300; // 5 min

  const [studyDuration, setStudyDuration] = useState(
    parseInt(localStorage.getItem("studyDuration") || defaultStudy, 10)
  );
  const [breakDuration, setBreakDuration] = useState(
    parseInt(localStorage.getItem("breakDuration") || defaultBreak, 10)
  );

  const [timeLeft, setTimeLeft] = useState(studyDuration);
  const [breakTimeLeft, setBreakTimeLeft] = useState(breakDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (!isBreak && timeLeft > 0) {
          setTimeLeft((prev) => prev - 1);
        } else if (isBreak && breakTimeLeft > 0) {
          setBreakTimeLeft((prev) => prev - 1);
        } else {
          if (!isBreak) {
            setIsBreak(true);
            setBreakTimeLeft(breakDuration);
          } else {
            setIsBreak(false);
            setTimeLeft(studyDuration);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isBreak, timeLeft, breakTimeLeft, studyDuration, breakDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(studyDuration);
    setBreakTimeLeft(breakDuration);
  };

  const handleDurationChange = (type, value) => {
    const seconds = Math.max(1, Math.floor(Number(value) * 60));
    if (type === "study") {
      setStudyDuration(seconds);
      localStorage.setItem("studyDuration", seconds);
      if (!isBreak) setTimeLeft(seconds);
    } else {
      setBreakDuration(seconds);
      localStorage.setItem("breakDuration", seconds);
      if (isBreak) setBreakTimeLeft(seconds);
    }
  };

  const backgroundClass = isBreak
    ? "from-indigo-200 to-blue-400 dark:from-zinc-900 dark:to-blue-800"
    : "from-orange-200 to-rose-400 dark:from-zinc-900 dark:to-rose-800";

  const progress =
    isBreak && breakDuration
      ? ((breakDuration - breakTimeLeft) / breakDuration) * 100
      : !isBreak && studyDuration
      ? ((studyDuration - timeLeft) / studyDuration) * 100
      : 0;

  return (
    <main
      className={`flex flex-col items-center justify-center px-6 py-20 min-h-screen bg-gradient-to-br transition-colors duration-1000 ${backgroundClass}`}
    >
      <h2 className="text-4xl font-bold text-center mb-2 text-zinc-900 dark:text-white">
        {isBreak ? "Break Session" : "Study Session"}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        Stay Fokused!
      </p>

      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 mb-8">
        <CardContent className="flex flex-col items-center gap-8 py-10 w-full">

          {/* Timers */}
          <div
            className={`transition-all duration-500 font-mono tracking-wider ${
              !isBreak
                ? "text-7xl text-gray-900 dark:text-white"
                : "text-3xl text-gray-500 dark:text-gray-400"
            }`}
          >
            {formatTime(timeLeft)}
          </div>

          <div
            className={`transition-all duration-500 font-mono tracking-wider ${
              isBreak
                ? "text-7xl text-gray-900 dark:text-white"
                : "text-3xl text-gray-500 dark:text-gray-400"
            }`}
          >
            {formatTime(breakTimeLeft)}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Remaining Time Label */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            There is this much time left in the {isBreak ? "break" : "session"}.
          </p>

          {/* Controls */}
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

      {/* Duration Settings */}
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0">
        <CardContent className="flex flex-col gap-6 py-8">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white text-center">
            Customize Durations
          </h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-around px-2">
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="studyDuration" className="text-sm text-zinc-700 dark:text-gray-300">
                Study (min)
              </Label>
              <Input
                id="studyDuration"
                type="number"
                min="1"
                defaultValue={Math.floor(studyDuration / 60)}
                onChange={(e) => handleDurationChange("study", e.target.value)}
                className="w-24 text-center"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="breakDuration" className="text-sm text-zinc-700 dark:text-gray-300">
                Break (min)
              </Label>
              <Input
                id="breakDuration"
                type="number"
                min="1"
                defaultValue={Math.floor(breakDuration / 60)}
                onChange={(e) => handleDurationChange("break", e.target.value)}
                className="w-24 text-center"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default PomodoroPage;
