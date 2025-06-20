"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Timer, BarChart3, Brain, ArrowRight, Sparkles, Star } from "lucide-react"
import { Link } from "react-router-dom"

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "Pomodoro Timer",
      description: "Boost your focus with scientifically-proven time management techniques",
      icon: Timer,
      color: "from-red-500 to-rose-500",
      stats: "Custom Sessions",
    },
    {
      title: "Personalized Statistics",
      description: "Track your progress and optimize your study habits with detailed insights",
      icon: BarChart3,
      color: "from-rose-500 to-pink-500",
      stats: "Keep Track",
    },
    {
      title: "Flash Cards",
      description: "Spaced repetition system for maximum memory retention",
      icon: Brain,
      color: "from-pink-500 to-red-500",
      stats: "Memory Boost",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-rose-100 to-pink-200 dark:bg-gradient-to-br dark:from-background dark:via-card dark:to-muted overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-primary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-red-300/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-primary/10 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                Focus
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your productivity with Fokuso's intelligent study system.
              <span className="font-semibold text-primary"> Start your focus journey today</span> and discover what you
              can achieve.
            </p>

            <div className="flex flex-col justify-center items-center mb-12">
              <Link to="/register">
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Custom</div>
                <div className="text-sm text-muted-foreground">Focus Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Focus</div>
                <div className="text-sm text-muted-foreground">Your Way</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Free</div>
                <div className="text-sm text-muted-foreground">Forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Powerful Features for
                <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                  {" "}
                  Peak Performance
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Fokuso */}
        <section className="px-6 py-16 bg-gradient-to-r from-background/60 via-primary/5 to-background/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-12 text-foreground">Why Choose Fokuso?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Timer className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-card-foreground mb-2">Science-Based</h4>
                  <p className="text-muted-foreground">Built on proven Pomodoro Technique research</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-card-foreground mb-2">Simple & Clean</h4>
                  <p className="text-muted-foreground">No distractions, just pure focus</p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-card-foreground mb-2">Completely Free</h4>
                  <p className="text-muted-foreground">All features available at no cost</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6 text-foreground">Ready to Master Your Focus?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Start your productivity journey today with our science-based approach to focused learning.
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
        className={`h-80 relative overflow-hidden bg-card/80 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-500 ${
          isActive ? "ring-2 ring-primary shadow-2xl" : ""
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

            <Badge variant="secondary" className="mb-4 bg-secondary text-secondary-foreground">
              {feature.stats}
            </Badge>

            <h3 className="text-2xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors">
              {feature.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default LandingPage
