// src/components/pages/FlashcardLearnPage.jsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, Eye, CheckCircle, XCircle, Brain, Trophy, Target } from "lucide-react"
import useFlashcardStore from "@/store/useFlashcardStore"
import { toast } from "sonner"

function FlashcardLearnPage() {
  const { deckId } = useParams()
  const navigate = useNavigate()

  const { decks, flashcards, isLoading, error, fetchDecks, fetchFlashcards, reviewFlashcard, clearError } =
    useFlashcardStore()

  // Learning session state
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  })
  const [isSessionComplete, setIsSessionComplete] = useState(false)
  const [learningCards, setLearningCards] = useState([])

  // Get current deck
  const deck = decks.find((d) => d.id === Number.parseInt(deckId))

  useEffect(() => {
    // Fetch data if not already loaded
    if (decks.length === 0) {
      fetchDecks()
    }
    fetchFlashcards(deckId)
  }, [deckId, fetchDecks, fetchFlashcards])

  useEffect(() => {
    // Filter flashcards for this deck that are due for review
    const deckFlashcards = flashcards.filter((card) => {
      if (card.deck !== Number.parseInt(deckId)) return false

      // Include cards that are due for review or in learning phase
      const isDue = new Date(card.next_review) <= new Date()
      return isDue || card.is_learning
    })

    setLearningCards(deckFlashcards)

    if (deckFlashcards.length === 0 && flashcards.length > 0) {
      // No cards due for review
      setIsSessionComplete(true)
    }
  }, [flashcards, deckId])

  useEffect(() => {
    // Show error toast if there's an error
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  const currentCard = learningCards[currentCardIndex]

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
    if (!currentCard) return

    try {
      await reviewFlashcard(currentCard.id, grade)

      // Update session stats
      const isCorrect = grade > 1 // Grade 2 (Good) and 3 (Easy) are considered correct
      setSessionStats((prev) => ({
        ...prev,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        incorrect: grade === 1 ? prev.incorrect + 1 : prev.incorrect,
        total: prev.total + 1,
      }))

      nextCard()
    } catch (error) {
      toast.error("Failed to review flashcard")
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
      setIsSessionComplete(true)
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
  const progress = learningCards.length > 0 ? ((currentCardIndex + 1) / learningCards.length) * 100 : 0

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading flashcards...</p>
        </div>
      </div>
    )
  }

  if (isSessionComplete || learningCards.length === 0) {
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
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {learningCards.length === 0 ? "No Cards Due!" : "Session Complete!"}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {learningCards.length === 0
                    ? "All your cards are up to date. Great job!"
                    : "Great job on completing your study session"}
                </p>
              </div>

              {/* Session Stats - only show if we actually reviewed cards */}
              {sessionStats.total > 0 && (
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
              )}

              {/* Performance Message */}
              {sessionStats.total > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-foreground font-medium">
                    {accuracy >= 80
                      ? "🎉 Excellent work! You're mastering this deck!"
                      : accuracy >= 60
                        ? "👍 Good progress! Keep practicing to improve."
                        : "💪 Keep going! Practice makes perfect."}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {learningCards.length > 0 && sessionStats.total > 0 && (
                  <Button variant="outline" onClick={handleReset} className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Study Again
                  </Button>
                )}
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

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground">No flashcard available</p>
          <Button onClick={handleBackToDeck} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deck
          </Button>
        </div>
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
                {currentCard.is_learning && (
                  <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Learning</Badge>
                )}
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
              <div className="flex justify-center mt-24">
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
                      </Button>
                      <Button
                        onClick={handleGood}
                        variant="outline"
                        size="lg"
                        className="px-6 py-4 text-base font-semibold border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600 dark:border-yellow-800 dark:hover:bg-yellow-950/20 dark:hover:text-yellow-400 min-w-[120px]"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Good
                      </Button>
                      <Button
                        onClick={handleEasy}
                        size="lg"
                        className="px-6 py-4 text-base font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[120px]"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Easy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
