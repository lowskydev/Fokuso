"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, Eye, CheckCircle, XCircle, Brain, Trophy, Target } from "lucide-react"

function FlashcardLearnPage() {
  const { deckId } = useParams()
  const navigate = useNavigate()

  // Learning session state
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  })
  const [isSessionComplete, setIsSessionComplete] = useState(false)

  // Dummy flashcards for learning (in real app, fetch based on deckId and learning algorithm)
  const [learningCards, setLearningCards] = useState([
    {
      id: 3,
      deck: Number.parseInt(deckId),
      question: "What is hoisting?",
      answer:
        "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during compilation.",
      next_review: "2025-06-21T16:45:00.000Z",
      difficulty: "Beginner",
    },
    {
      id: 4,
      deck: Number.parseInt(deckId),
      question: "What is the event loop?",
      answer:
        "The event loop is a mechanism that handles asynchronous operations in JavaScript by managing the call stack and callback queue.",
      next_review: "2025-06-23T10:15:00.000Z",
      difficulty: "Intermediate",
    },
    {
      id: 7,
      deck: Number.parseInt(deckId),
      question: "What is destructuring?",
      answer:
        "Destructuring is a syntax that allows unpacking values from arrays or properties from objects into distinct variables.",
      next_review: "2025-06-21T13:30:00.000Z",
      difficulty: "Advanced",
    },
    {
      id: 8,
      deck: Number.parseInt(deckId),
      question: "What is async/await?",
      answer:
        "async/await is syntactic sugar for working with Promises, making asynchronous code look and behave more like synchronous code.",
      next_review: "2025-06-24T09:45:00.000Z",
      difficulty: "Beginner",
    },
    {
      id: 9,
      deck: Number.parseInt(deckId),
      question: "What is the difference between null and undefined?",
      answer:
        "undefined means a variable has been declared but not assigned a value, while null is an assignment value representing no value.",
      next_review: "2025-06-21T17:20:00.000Z",
      difficulty: "Intermediate",
    },
  ])

  const currentCard = learningCards[currentCardIndex]

  const isCardCompleted = (card) => {
    return new Date(card.next_review) > new Date()
  }

  const completedCards = learningCards.slice(0, currentCardIndex + 1).filter(isCardCompleted).length
  const progress = (completedCards / learningCards.length) * 100

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" && !isSessionComplete) {
        e.preventDefault()
        if (!showAnswer) {
          setShowAnswer(true)
        }
      } else if (e.code === "Digit1" && showAnswer && !isSessionComplete) {
        e.preventDefault()
        handleAgain()
      } else if (e.code === "Digit2" && showAnswer && !isSessionComplete) {
        e.preventDefault()
        handleGood()
      } else if (e.code === "Digit3" && showAnswer && !isSessionComplete) {
        e.preventDefault()
        handleEasy()
      } else if (e.code === "KeyR" && !isSessionComplete) {
        e.preventDefault()
        handleReset()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showAnswer, isSessionComplete])

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleReview = async (grade) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/flashcards/review', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     flashcard_id: currentCard.id,
      //     grade: grade // 1 = Again, 2 = Good, 3 = Easy
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to submit review');
      // }
      //
      // const updatedCard = await response.json();

      // For now, simulate API call and calculate new next_review time
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simulate spaced repetition algorithm
      const now = new Date()
      let newNextReview

      switch (grade) {
        case 1: // Again - review in 1 minute (failed)
          newNextReview = new Date(now.getTime() + 1 * 60 * 1000)
          break
        case 2: // Good - review in 1 day (normal interval)
          newNextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000)
          break
        case 3: // Easy - review in 4 days (longer interval)
          newNextReview = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000)
          break
        default:
          newNextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      }

      // Update the card's next_review time in local state
      const updatedCards = [...learningCards]
      updatedCards[currentCardIndex] = {
        ...currentCard,
        next_review: newNextReview.toISOString(),
      }
      setLearningCards(updatedCards)

      // Update session stats - only count as completed if grade > 1 (Good or Easy)
      const isCompleted = grade > 1
      setSessionStats((prev) => ({
        ...prev,
        correct: isCompleted ? prev.correct + 1 : prev.correct,
        incorrect: grade === 1 ? prev.incorrect + 1 : prev.incorrect,
        total: prev.total + 1,
      }))

      nextCard()
    } catch (error) {
      console.error("Error submitting review:", error)
      // Handle error - maybe show a toast notification
    }
  }

  const handleAgain = () => handleReview(1)
  const handleGood = () => handleReview(2)
  const handleEasy = () => handleReview(3)

  const nextCard = () => {
    if (currentCardIndex < learningCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowAnswer(false)
    } else {
      // Check if all cards have been moved to future review times
      const allCompleted = learningCards.every(isCardCompleted)
      if (allCompleted) {
        setIsSessionComplete(true)
      } else {
        // If some cards still need review (marked as "Again"), continue with those
        const incompleteCards = learningCards.filter((card) => !isCardCompleted(card))
        if (incompleteCards.length > 0) {
          // Reset to first incomplete card
          const firstIncompleteIndex = learningCards.findIndex((card) => !isCardCompleted(card))
          setCurrentCardIndex(firstIncompleteIndex)
          setShowAnswer(false)
        } else {
          setIsSessionComplete(true)
        }
      }
    }
  }

  const handleReset = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setSessionStats({ correct: 0, incorrect: 0, total: 0 })
    setIsSessionComplete(false)
  }

  const handleBackToDeck = () => {
    navigate(`/dashboard/flashcards/deck/${deckId}`)
  }

  const handleBackToDecks = () => {
    navigate("/dashboard/flashcards")
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-600 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return "text-green-600"
    if (accuracy >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0

  if (isSessionComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              {/* Completion Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-500 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              {/* Completion Message */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Session Complete!</h1>
                <p className="text-muted-foreground text-lg">Great job on completing your study session</p>
              </div>

              {/* Session Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{sessionStats.correct}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{sessionStats.incorrect}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <p className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>

              {/* Performance Message */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-medium">
                  {accuracy >= 80
                    ? "🎉 Excellent work! You're mastering this deck!"
                    : accuracy >= 60
                      ? "👍 Good progress! Keep practicing to improve."
                      : "💪 Keep going! Practice makes perfect."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Study Again
                </Button>
                <Button onClick={handleBackToDeck} className="flex-1 bg-primary hover:bg-primary/90">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Deck
                </Button>
              </div>

              <Button variant="ghost" onClick={handleBackToDecks} className="w-full">
                View All Decks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToDeck} className="hover:bg-primary/5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deck
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              {currentCardIndex + 1} of {learningCards.length}
            </Badge>
            <Button variant="outline" onClick={handleReset} className="hover:bg-primary/5">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Correct: {sessionStats.correct}</span>
                <span>Incorrect: {sessionStats.incorrect}</span>
                <span>Accuracy: {accuracy}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flashcard */}
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-2xl min-h-[400px]">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <Badge className={`${getDifficultyColor(currentCard.difficulty)} border`}>
                  {currentCard.difficulty}
                </Badge>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Flashcard</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="text-center space-y-8">
                {/* Question */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">{currentCard.question}</h2>
                  {!showAnswer && (
                    <p className="text-muted-foreground">Think about your answer, then reveal it below</p>
                  )}
                </div>

                {/* Answer */}
                {showAnswer && (
                  <div className="space-y-4 p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Eye className="w-5 h-5" />
                      <span className="font-medium">Answer</span>
                    </div>
                    <p className="text-lg text-foreground leading-relaxed">{currentCard.answer}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!showAnswer ? (
                <Button
                  onClick={handleShowAnswer}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Show Answer
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground font-medium">How well did you know this?</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={handleAgain}
                      variant="outline"
                      size="lg"
                      className="px-6 py-4 text-base font-semibold border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-950/20 dark:hover:text-red-400 min-w-[120px]"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Again
                      <span className="block text-xs opacity-75 mt-1">Study more</span>
                    </Button>
                    <Button
                      onClick={handleGood}
                      variant="outline"
                      size="lg"
                      className="px-6 py-4 text-base font-semibold border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600 dark:border-yellow-800 dark:hover:bg-yellow-950/20 dark:hover:text-yellow-400 min-w-[120px]"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Good
                      <span className="block text-xs opacity-75 mt-1">Normal interval</span>
                    </Button>
                    <Button
                      onClick={handleEasy}
                      size="lg"
                      className="px-6 py-4 text-base font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[120px]"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Easy
                      <span className="block text-xs opacity-75 mt-1">Longer interval</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd>
                <span>Show Answer</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">1</kbd>
                <span>Again</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">2</kbd>
                <span>Good</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">3</kbd>
                <span>Easy</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FlashcardLearnPage
