"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Timer, Calendar, Brain, ArrowRight, Sparkles, Star } from "lucide-react"
import { Link } from "react-router-dom"

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [studyTime, setStudyTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "Pomodoro Timer",
      description: "Boost your focus with scientifically-proven time management techniques",
      icon: Timer,
      color: "from-red-500 to-rose-500",
      stats: "25min sessions",
    },
    {
      title: "Smart Calendar",
      description: "Intelligent scheduling that adapts to your learning patterns",
      icon: Calendar,
      color: "from-rose-500 to-pink-500",
      stats: "Smart Planning",
    },
    {
      title: "Flash Cards",
      description: "Spaced repetition system for maximum memory retention",
      icon: Brain,
      color: "from-pink-500 to-red-500",
      stats: "Memory Boost",
    },
  ]

  const handleSaveSettings = () => {
    localStorage.setItem("studyDuration", studyTime * 60)
    localStorage.setItem("breakDuration", breakTime * 60)
    setShowModal(false)
    window.location.href = "/pomodoropage"
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent animate-pulse">
                Focus
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your productivity with Fokuso's intelligent study system.
              <span className="font-semibold text-red-600 dark:text-red-400"> Start your focus journey today</span> and
              discover what you can achieve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/register">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats - Replace the fake user stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">25min</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Focus Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">5min</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Break Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">Free</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Powerful Features for
                <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  {" "}
                  Peak Performance
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Everything you need to transform your study habits and achieve your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  isActive={activeFeature === index}
                  onClick={() => {
                    if (feature.title === "Pomodoro Timer") {
                      setShowModal(true)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Fokuso - Replace testimonials */}
        <section className="px-6 py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-12 text-slate-900 dark:text-white">Why Choose Fokuso?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Science-Based</h4>
                  <p className="text-slate-600 dark:text-slate-300">Built on proven Pomodoro Technique research</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Simple & Clean</h4>
                  <p className="text-slate-600 dark:text-slate-300">No distractions, just pure focus</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Completely Free</h4>
                  <p className="text-slate-600 dark:text-slate-300">All features available at no cost</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Ready to Master Your Focus?</h3>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Start your productivity journey today with our science-based approach to focused learning.
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-12 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

const FeatureCard = ({ feature, index, isActive, onClick }) => {
  const Icon = feature.icon

  return (
    <div
      className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
        isActive ? "scale-105" : ""
      }`}
      onClick={onClick}
    >
      <Card
        className={`h-80 relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
          isActive ? "ring-2 ring-red-500 shadow-2xl" : ""
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        ></div>

        <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
          <div>
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>

            <Badge
              variant="secondary"
              className="mb-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {feature.stats}
            </Badge>

            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {feature.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
          </div>

          <div className="flex items-center text-red-600 dark:text-red-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LandingPage
