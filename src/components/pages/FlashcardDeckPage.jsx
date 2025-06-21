"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EditDeckModal } from "@/components/flashcards/edit-deck-modal"
import { ArrowLeft, Play, Edit, Trash2, Plus, Brain, Target, Clock, BarChart3, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

function FlashcardDeckPage() {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Get deck info based on deckId
  const getDeckInfo = (id) => {
    const deckNames = {
      1: "JavaScript Fundamentals",
      2: "React Hooks & Components",
      3: "Spanish Vocabulary - Beginner",
      4: "Data Structures & Algorithms",
      5: "World History - Key Events",
      6: "Medical Terminology",
      7: "Python Programming Basics",
      8: "French Grammar Rules",
    }

    return {
      id: Number.parseInt(id),
      name: deckNames[id] || "Unknown Deck",
      created_at: "2025-06-01T09:00:00.000Z",
      updated_at: "2025-06-21T10:41:54.014Z",
    }
  }

  const [deck, setDeck] = useState(getDeckInfo(deckId))

  // Get flashcards specific to this deck
  const getFlashcardsForDeck = (deckId) => {
    const allFlashcards = {
      // JavaScript Fundamentals (Deck 1)
      1: [
        {
          id: 1,
          deck: 1,
          question: "What is a closure in JavaScript?",
          answer:
            "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
          next_review: "2025-06-22T09:00:00.000Z",
          last_reviewed: "2025-06-21T09:00:00.000Z",
        },
        {
          id: 2,
          deck: 1,
          question: "What is hoisting in JavaScript?",
          answer:
            "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during compilation.",
          next_review: "2025-06-25T10:00:00.000Z",
          last_reviewed: "2025-06-21T10:00:00.000Z",
        },
        {
          id: 3,
          deck: 1,
          question: "What is the event loop?",
          answer:
            "The event loop is a mechanism that handles asynchronous operations in JavaScript by managing the call stack and callback queue.",
          next_review: "2025-06-20T14:30:00.000Z",
          last_reviewed: "2025-06-21T08:30:00.000Z",
        },
        {
          id: 4,
          deck: 1,
          question: "What is a Promise in JavaScript?",
          answer:
            "A Promise is an object representing the eventual completion or failure of an asynchronous operation.",
          next_review: "2025-06-23T11:20:00.000Z",
          last_reviewed: "2025-06-21T11:20:00.000Z",
        },
        {
          id: 5,
          deck: 1,
          question: "What is destructuring in JavaScript?",
          answer:
            "Destructuring is a syntax that allows unpacking values from arrays or properties from objects into distinct variables.",
          next_review: "2025-06-21T13:30:00.000Z",
          last_reviewed: "2025-06-21T13:30:00.000Z",
        },
        {
          id: 6,
          deck: 1,
          question: "What is the difference between == and === in JavaScript?",
          answer:
            "== performs type coercion before comparison, while === compares both value and type without coercion.",
          next_review: "2025-06-24T15:00:00.000Z",
          last_reviewed: "2025-06-21T15:00:00.000Z",
        },
        {
          id: 7,
          deck: 1,
          question: "What is async/await in JavaScript?",
          answer:
            "async/await is syntactic sugar for working with Promises, making asynchronous code look and behave more like synchronous code.",
          next_review: "2025-06-26T09:45:00.000Z",
          last_reviewed: "2025-06-21T09:45:00.000Z",
        },
        {
          id: 8,
          deck: 1,
          question: "What are arrow functions in JavaScript?",
          answer:
            "Arrow functions are a concise way to write functions with lexical 'this' binding and implicit returns for single expressions.",
          next_review: "2025-06-22T12:10:00.000Z",
          last_reviewed: "2025-06-21T12:10:00.000Z",
        },
      ],
      // React Hooks & Components (Deck 2)
      2: [
        {
          id: 9,
          deck: 2,
          question: "What is useState hook?",
          answer:
            "useState is a Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.",
          next_review: "2025-06-24T09:00:00.000Z",
          last_reviewed: "2025-06-21T09:00:00.000Z",
        },
        {
          id: 10,
          deck: 2,
          question: "What is useEffect hook?",
          answer:
            "useEffect lets you perform side effects in functional components. It runs after every render by default.",
          next_review: "2025-06-22T15:00:00.000Z",
          last_reviewed: "2025-06-21T15:00:00.000Z",
        },
        {
          id: 11,
          deck: 2,
          question: "What is useContext hook?",
          answer:
            "useContext lets you subscribe to React context without introducing nesting. It accepts a context object and returns the current context value.",
          next_review: "2025-06-26T10:30:00.000Z",
          last_reviewed: "2025-06-21T10:30:00.000Z",
        },
        {
          id: 12,
          deck: 2,
          question: "What is useReducer hook?",
          answer:
            "useReducer is an alternative to useState for managing complex state logic. It accepts a reducer function and returns the current state and dispatch method.",
          next_review: "2025-06-25T14:20:00.000Z",
          last_reviewed: "2025-06-21T14:20:00.000Z",
        },
        {
          id: 13,
          deck: 2,
          question: "What is useMemo hook?",
          answer:
            "useMemo returns a memoized value. It only recomputes the memoized value when one of the dependencies has changed.",
          next_review: "2025-06-23T16:45:00.000Z",
          last_reviewed: "2025-06-21T16:45:00.000Z",
        },
        {
          id: 14,
          deck: 2,
          question: "What is useCallback hook?",
          answer:
            "useCallback returns a memoized callback function. It's useful when passing callbacks to optimized child components.",
          next_review: "2025-06-27T11:15:00.000Z",
          last_reviewed: "2025-06-21T11:15:00.000Z",
        },
      ],
      // Spanish Vocabulary (Deck 3)
      3: [
        {
          id: 15,
          deck: 3,
          question: "How do you say 'hello' in Spanish?",
          answer: "Hola",
          next_review: "2025-06-21T16:00:00.000Z",
          last_reviewed: "2025-06-21T16:00:00.000Z",
        },
        {
          id: 16,
          deck: 3,
          question: "How do you say 'goodbye' in Spanish?",
          answer: "Adiós",
          next_review: "2025-06-22T12:00:00.000Z",
          last_reviewed: "2025-06-21T12:00:00.000Z",
        },
        {
          id: 17,
          deck: 3,
          question: "How do you say 'thank you' in Spanish?",
          answer: "Gracias",
          next_review: "2025-06-25T14:00:00.000Z",
          last_reviewed: "2025-06-21T14:00:00.000Z",
        },
        {
          id: 18,
          deck: 3,
          question: "How do you say 'please' in Spanish?",
          answer: "Por favor",
          next_review: "2025-06-21T17:30:00.000Z",
          last_reviewed: "2025-06-21T17:30:00.000Z",
        },
        {
          id: 19,
          deck: 3,
          question: "How do you say 'yes' in Spanish?",
          answer: "Sí",
          next_review: "2025-06-23T10:00:00.000Z",
          last_reviewed: "2025-06-21T10:00:00.000Z",
        },
        {
          id: 20,
          deck: 3,
          question: "How do you say 'no' in Spanish?",
          answer: "No",
          next_review: "2025-06-24T13:30:00.000Z",
          last_reviewed: "2025-06-21T13:30:00.000Z",
        },
        {
          id: 21,
          deck: 3,
          question: "How do you say 'water' in Spanish?",
          answer: "Agua",
          next_review: "2025-06-26T15:45:00.000Z",
          last_reviewed: "2025-06-21T15:45:00.000Z",
        },
        {
          id: 22,
          deck: 3,
          question: "How do you say 'food' in Spanish?",
          answer: "Comida",
          next_review: "2025-06-22T18:20:00.000Z",
          last_reviewed: "2025-06-21T18:20:00.000Z",
        },
      ],
      // Add more decks as needed...
      4: [
        {
          id: 25,
          deck: 4,
          question: "What is Big O notation?",
          answer:
            "Big O notation describes the upper bound of algorithm complexity, representing the worst-case time or space complexity.",
          next_review: "2025-06-27T09:00:00.000Z",
          last_reviewed: "2025-06-21T09:00:00.000Z",
        },
        {
          id: 26,
          deck: 4,
          question: "What is a binary tree?",
          answer:
            "A binary tree is a tree data structure where each node has at most two children, referred to as left and right child.",
          next_review: "2025-06-28T11:00:00.000Z",
          last_reviewed: "2025-06-21T11:00:00.000Z",
        },
        {
          id: 27,
          deck: 4,
          question: "What is a hash table?",
          answer:
            "A hash table is a data structure that implements an associative array, mapping keys to values using a hash function.",
          next_review: "2025-06-25T16:30:00.000Z",
          last_reviewed: "2025-06-21T16:30:00.000Z",
        },
        {
          id: 28,
          deck: 4,
          question: "What is the difference between BFS and DFS?",
          answer:
            "BFS (Breadth-First Search) explores nodes level by level, while DFS (Depth-First Search) explores as far as possible along each branch.",
          next_review: "2025-06-24T12:45:00.000Z",
          last_reviewed: "2025-06-21T12:45:00.000Z",
        },
      ],
      // Default fallback for other decks
    }

    return allFlashcards[deckId] || []
  }

  const [flashcards] = useState(getFlashcardsForDeck(Number.parseInt(deckId)))

  // Handle editing deck
  const handleEditDeck = async (updatedDeck) => {
    try {
      // Update local state
      setDeck(updatedDeck)
      toast.success("Deck updated successfully!")
      console.log("Deck updated:", updatedDeck)
    } catch (error) {
      console.error("Error updating deck:", error)
      toast.error("Failed to update deck")
      throw error
    }
  }

  // Handle deleting deck
  const handleDeleteDeck = async (deckId) => {
    try {
      toast.success("Deck deleted successfully!")
      console.log("Deck deleted:", deckId)
      // Navigate back to flashcards page after deletion
      navigate("/dashboard/flashcards")
    } catch (error) {
      console.error("Error deleting deck:", error)
      toast.error("Failed to delete deck")
      throw error
    }
  }

  // Helper functions for the new structure
  const isCardDueForReview = (nextReview) => {
    return new Date(nextReview) <= new Date()
  }

  const isCardStudiedToday = (lastReviewed) => {
    const today = new Date().toDateString()
    return new Date(lastReviewed).toDateString() === today
  }

  const isCardMastered = (nextReview) => {
    // Consider a card "mastered" if next review is more than 7 days away
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
    return new Date(nextReview) > sevenDaysFromNow
  }

  // Calculate stats dynamically based on actual flashcard data
  const masteredCount = flashcards.filter((card) => isCardMastered(card.next_review)).length
  const learningCount = flashcards.filter(
    (card) => !isCardMastered(card.next_review) && !isCardDueForReview(card.next_review),
  ).length
  const needsReview = flashcards.filter((card) => isCardDueForReview(card.next_review)).length
  const studiedToday = flashcards.filter((card) => isCardStudiedToday(card.last_reviewed)).length

  const getCardStatus = (nextReview) => {
    const now = new Date()
    const reviewDate = new Date(nextReview)

    if (reviewDate <= now) {
      return { status: "due", label: "Due for Review", color: "bg-red-500/20 text-red-600 border-red-500/30" }
    } else if (reviewDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
      return { status: "soon", label: "Due Soon", color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" }
    } else {
      return { status: "scheduled", label: "Scheduled", color: "bg-green-500/20 text-green-600 border-green-500/30" }
    }
  }

  const handleLearnClick = () => {
    navigate(`/dashboard/flashcards/learn/${deckId}`)
  }

  const handleBackClick = () => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  // Filter flashcards
  const filteredCards = flashcards.filter((card) => {
    const matchesSearch =
      searchTerm === "" ||
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "mastered" && isCardMastered(card.next_review)) ||
      (filter === "learning" && !isCardMastered(card.next_review) && !isCardDueForReview(card.next_review)) ||
      (filter === "difficult" && isCardDueForReview(card.next_review))

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackClick} className="hover:bg-primary/5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Decks
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {deck.name}
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          <EditDeckModal deck={deck} onEditDeck={handleEditDeck} onDeleteDeck={handleDeleteDeck} />
          <Button onClick={handleLearnClick} className="bg-primary hover:bg-primary/90">
            <Play className="w-4 h-4 mr-2" />
            Start Learning
          </Button>
        </div>
      </div>

      {/* Deck Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold text-foreground">{flashcards.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mastered</p>
                <p className="text-2xl font-bold text-foreground">{masteredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning</p>
                <p className="text-2xl font-bold text-foreground">{learningCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Review</p>
                <p className="text-2xl font-bold text-foreground">{needsReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mastery Progress</span>
              <span className="font-medium">
                {masteredCount}/{flashcards.length} cards mastered
              </span>
            </div>
            <Progress value={(masteredCount / flashcards.length) * 100} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{masteredCount}</p>
                <p className="text-sm text-muted-foreground">Mastered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{learningCount}</p>
                <p className="text-sm text-muted-foreground">Learning</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{needsReview}</p>
                <p className="text-sm text-muted-foreground">Needs Review</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search flashcards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cards</SelectItem>
                <SelectItem value="mastered">Mastered</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="difficult">Needs Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Flashcards List */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              Flashcards ({filteredCards.length})
            </CardTitle>
            <Button variant="outline" className="hover:bg-primary/5">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCards.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">No flashcards found</p>
                <p className="text-muted-foreground/60">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredCards.map((card) => {
                const cardStatus = getCardStatus(card.next_review)

                return (
                  <Card
                    key={card.id}
                    className={`border transition-all duration-300 hover:shadow-lg ${
                      cardStatus.status === "due"
                        ? "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                        : cardStatus.status === "soon"
                          ? "bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                          : "bg-card border-border hover:bg-card/80"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Card Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-foreground mb-2">{card.question}</h3>
                            <p className="text-muted-foreground">{card.answer}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Card Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge className={`${cardStatus.color} border`}>{cardStatus.label}</Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="text-center">
                              <p className="font-medium text-foreground">
                                {new Date(card.next_review).toLocaleDateString()}
                              </p>
                              <p className="text-xs">Next Review</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlashcardDeckPage
