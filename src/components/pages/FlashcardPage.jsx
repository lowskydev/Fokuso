"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom"
import { Brain, BookOpen, Clock, Target, TrendingUp, Plus, Play, BarChart3, Calendar, Zap } from "lucide-react"

function FlashcardsPage() {
  const navigate = useNavigate()

  // Dummy flashcard decks data - matches backend structure
  const [decks] = useState([
    {
      id: 1,
      name: "JavaScript Fundamentals",
      created_at: "2025-06-01T09:00:00.000Z",
      updated_at: "2025-06-21T10:41:54.014Z",
    },
    {
      id: 2,
      name: "React Hooks & Components",
      created_at: "2025-06-05T14:30:00.000Z",
      updated_at: "2025-06-20T16:22:10.500Z",
    },
    {
      id: 3,
      name: "Spanish Vocabulary - Beginner",
      created_at: "2025-05-15T08:15:00.000Z",
      updated_at: "2025-06-19T12:45:30.200Z",
    },
    {
      id: 4,
      name: "Data Structures & Algorithms",
      created_at: "2025-05-20T11:00:00.000Z",
      updated_at: "2025-06-18T09:30:45.800Z",
    },
    {
      id: 5,
      name: "World History - Key Events",
      created_at: "2025-06-10T13:20:00.000Z",
      updated_at: "2025-06-21T08:15:22.100Z",
    },
    {
      id: 6,
      name: "Medical Terminology",
      created_at: "2025-05-01T10:45:00.000Z",
      updated_at: "2025-06-20T15:30:18.600Z",
    },
    {
      id: 7,
      name: "Python Programming Basics",
      created_at: "2025-06-12T16:00:00.000Z",
      updated_at: "2025-06-21T11:20:35.400Z",
    },
    {
      id: 8,
      name: "French Grammar Rules",
      created_at: "2025-05-25T09:30:00.000Z",
      updated_at: "2025-06-19T14:50:12.300Z",
    },
  ])

  // Dummy flashcards data for all decks - each deck has unique, relevant content
  const [allFlashcards] = useState([
    // JavaScript Fundamentals (Deck 1) - 8 cards
    {
      id: 1,
      deck: 1,
      question: "What is a closure in JavaScript?",
      answer:
        "A closure is a function that has access to variables in its outer scope even after the outer function has returned.",
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
      answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation.",
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
      answer: "== performs type coercion before comparison, while === compares both value and type without coercion.",
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

    // React Hooks & Components (Deck 2) - 6 cards
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

    // Spanish Vocabulary - Beginner (Deck 3) - 10 cards
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
    {
      id: 23,
      deck: 3,
      question: "How do you say 'house' in Spanish?",
      answer: "Casa",
      next_review: "2025-06-25T09:15:00.000Z",
      last_reviewed: "2025-06-21T09:15:00.000Z",
    },
    {
      id: 24,
      deck: 3,
      question: "How do you say 'family' in Spanish?",
      answer: "Familia",
      next_review: "2025-06-27T14:40:00.000Z",
      last_reviewed: "2025-06-21T14:40:00.000Z",
    },

    // Data Structures & Algorithms (Deck 4) - 7 cards
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
    {
      id: 29,
      deck: 4,
      question: "What is a stack?",
      answer:
        "A stack is a LIFO (Last In, First Out) data structure where elements are added and removed from the same end called the top.",
      next_review: "2025-06-26T08:20:00.000Z",
      last_reviewed: "2025-06-21T08:20:00.000Z",
    },
    {
      id: 30,
      deck: 4,
      question: "What is a queue?",
      answer:
        "A queue is a FIFO (First In, First Out) data structure where elements are added at the rear and removed from the front.",
      next_review: "2025-06-23T17:10:00.000Z",
      last_reviewed: "2025-06-21T17:10:00.000Z",
    },
    {
      id: 31,
      deck: 4,
      question: "What is recursion?",
      answer:
        "Recursion is a programming technique where a function calls itself to solve a smaller instance of the same problem.",
      next_review: "2025-06-29T13:25:00.000Z",
      last_reviewed: "2025-06-21T13:25:00.000Z",
    },

    // World History - Key Events (Deck 5) - 8 cards
    {
      id: 32,
      deck: 5,
      question: "When did World War II end?",
      answer: "World War II ended on September 2, 1945, with Japan's formal surrender.",
      next_review: "2025-06-23T13:00:00.000Z",
      last_reviewed: "2025-06-21T13:00:00.000Z",
    },
    {
      id: 33,
      deck: 5,
      question: "Who was the first President of the United States?",
      answer: "George Washington was the first President of the United States (1789-1797).",
      next_review: "2025-06-24T16:00:00.000Z",
      last_reviewed: "2025-06-21T16:00:00.000Z",
    },
    {
      id: 34,
      deck: 5,
      question: "When did the Berlin Wall fall?",
      answer: "The Berlin Wall fell on November 9, 1989, marking the beginning of German reunification.",
      next_review: "2025-06-26T11:30:00.000Z",
      last_reviewed: "2025-06-21T11:30:00.000Z",
    },
    {
      id: 35,
      deck: 5,
      question: "When did the American Civil War begin and end?",
      answer: "The American Civil War began on April 12, 1861, and ended on April 9, 1865.",
      next_review: "2025-06-25T18:45:00.000Z",
      last_reviewed: "2025-06-21T18:45:00.000Z",
    },
    {
      id: 36,
      deck: 5,
      question: "When did Christopher Columbus reach the Americas?",
      answer: "Christopher Columbus reached the Americas on October 12, 1492.",
      next_review: "2025-06-27T10:15:00.000Z",
      last_reviewed: "2025-06-21T10:15:00.000Z",
    },
    {
      id: 37,
      deck: 5,
      question: "When did the French Revolution begin?",
      answer: "The French Revolution began in 1789 with the storming of the Bastille on July 14.",
      next_review: "2025-06-28T14:20:00.000Z",
      last_reviewed: "2025-06-21T14:20:00.000Z",
    },
    {
      id: 38,
      deck: 5,
      question: "When was the Declaration of Independence signed?",
      answer: "The Declaration of Independence was signed on July 4, 1776.",
      next_review: "2025-06-24T09:30:00.000Z",
      last_reviewed: "2025-06-21T09:30:00.000Z",
    },
    {
      id: 39,
      deck: 5,
      question: "When did World War I begin and end?",
      answer: "World War I began on July 28, 1914, and ended on November 11, 1918.",
      next_review: "2025-06-26T16:50:00.000Z",
      last_reviewed: "2025-06-21T16:50:00.000Z",
    },

    // Medical Terminology (Deck 6) - 9 cards
    {
      id: 40,
      deck: 6,
      question: "What does the prefix 'cardio-' mean?",
      answer: "Cardio- means heart (e.g., cardiology = study of the heart).",
      next_review: "2025-06-26T08:00:00.000Z",
      last_reviewed: "2025-06-21T08:00:00.000Z",
    },
    {
      id: 41,
      deck: 6,
      question: "What does the prefix 'neuro-' mean?",
      answer: "Neuro- means nerve or nervous system (e.g., neurology = study of the nervous system).",
      next_review: "2025-06-25T12:00:00.000Z",
      last_reviewed: "2025-06-21T12:00:00.000Z",
    },
    {
      id: 42,
      deck: 6,
      question: "What does the suffix '-itis' mean?",
      answer: "-itis means inflammation (e.g., arthritis = inflammation of joints).",
      next_review: "2025-06-24T15:30:00.000Z",
      last_reviewed: "2025-06-21T15:30:00.000Z",
    },
    {
      id: 43,
      deck: 6,
      question: "What does the prefix 'gastro-' mean?",
      answer: "Gastro- means stomach (e.g., gastroenterology = study of stomach and intestines).",
      next_review: "2025-06-27T11:45:00.000Z",
      last_reviewed: "2025-06-21T11:45:00.000Z",
    },
    {
      id: 44,
      deck: 6,
      question: "What does the suffix '-ology' mean?",
      answer: "-ology means study of (e.g., biology = study of life).",
      next_review: "2025-06-23T14:15:00.000Z",
      last_reviewed: "2025-06-21T14:15:00.000Z",
    },
    {
      id: 45,
      deck: 6,
      question: "What does the prefix 'hemo-' or 'hemato-' mean?",
      answer: "Hemo- or hemato- means blood (e.g., hematology = study of blood).",
      next_review: "2025-06-25T17:20:00.000Z",
      last_reviewed: "2025-06-21T17:20:00.000Z",
    },
    {
      id: 46,
      deck: 6,
      question: "What does the prefix 'osteo-' mean?",
      answer: "Osteo- means bone (e.g., osteoporosis = condition of porous bones).",
      next_review: "2025-06-28T09:40:00.000Z",
      last_reviewed: "2025-06-21T09:40:00.000Z",
    },
    {
      id: 47,
      deck: 6,
      question: "What does the suffix '-pathy' mean?",
      answer: "-pathy means disease or disorder (e.g., neuropathy = nerve disease).",
      next_review: "2025-06-26T13:55:00.000Z",
      last_reviewed: "2025-06-21T13:55:00.000Z",
    },
    {
      id: 48,
      deck: 6,
      question: "What does the prefix 'pulmo-' mean?",
      answer: "Pulmo- means lung (e.g., pulmonology = study of lungs).",
      next_review: "2025-06-24T18:10:00.000Z",
      last_reviewed: "2025-06-21T18:10:00.000Z",
    },

    // Python Programming Basics (Deck 7) - 6 cards
    {
      id: 49,
      deck: 7,
      question: "What is a list in Python?",
      answer:
        "A list is an ordered, mutable collection of items that can store different data types, defined with square brackets [].",
      next_review: "2025-06-22T10:00:00.000Z",
      last_reviewed: "2025-06-21T10:00:00.000Z",
    },
    {
      id: 50,
      deck: 7,
      question: "What is a dictionary in Python?",
      answer:
        "A dictionary is an unordered collection of key-value pairs, defined with curly braces {} and accessed by keys.",
      next_review: "2025-06-21T18:00:00.000Z",
      last_reviewed: "2025-06-21T18:00:00.000Z",
    },
    {
      id: 51,
      deck: 7,
      question: "What is the difference between a tuple and a list in Python?",
      answer:
        "Tuples are immutable (cannot be changed) and use parentheses (), while lists are mutable and use square brackets [].",
      next_review: "2025-06-25T13:25:00.000Z",
      last_reviewed: "2025-06-21T13:25:00.000Z",
    },
    {
      id: 52,
      deck: 7,
      question: "What is a function in Python?",
      answer: "A function is a reusable block of code that performs a specific task, defined with the 'def' keyword.",
      next_review: "2025-06-24T11:40:00.000Z",
      last_reviewed: "2025-06-21T11:40:00.000Z",
    },
    {
      id: 53,
      deck: 7,
      question: "What is a for loop in Python?",
      answer:
        "A for loop is used to iterate over a sequence (like a list, tuple, or string) and execute code for each item.",
      next_review: "2025-06-26T16:15:00.000Z",
      last_reviewed: "2025-06-21T16:15:00.000Z",
    },
    {
      id: 54,
      deck: 7,
      question: "What is indentation in Python?",
      answer: "Indentation is the use of whitespace to define code blocks in Python, typically 4 spaces per level.",
      next_review: "2025-06-23T19:30:00.000Z",
      last_reviewed: "2025-06-21T19:30:00.000Z",
    },

    // French Grammar Rules (Deck 8) - 8 cards
    {
      id: 55,
      deck: 8,
      question: "What is the French verb 'être'?",
      answer: "'Être' means 'to be' in English. It's an irregular verb and one of the most important verbs in French.",
      next_review: "2025-06-24T14:00:00.000Z",
      last_reviewed: "2025-06-21T14:00:00.000Z",
    },
    {
      id: 56,
      deck: 8,
      question: "What is the French verb 'avoir'?",
      answer: "'Avoir' means 'to have' in English. It's an irregular verb used in many compound tenses.",
      next_review: "2025-06-23T16:00:00.000Z",
      last_reviewed: "2025-06-21T16:00:00.000Z",
    },
    {
      id: 57,
      deck: 8,
      question: "What are the French definite articles?",
      answer: "The French definite articles are: le (masculine), la (feminine), les (plural), and l' (before vowels).",
      next_review: "2025-06-25T10:45:00.000Z",
      last_reviewed: "2025-06-21T10:45:00.000Z",
    },
    {
      id: 58,
      deck: 8,
      question: "What are the French indefinite articles?",
      answer: "The French indefinite articles are: un (masculine), une (feminine), and des (plural).",
      next_review: "2025-06-26T12:20:00.000Z",
      last_reviewed: "2025-06-21T12:20:00.000Z",
    },
    {
      id: 59,
      deck: 8,
      question: "How do you form the plural of most French nouns?",
      answer: "Most French nouns form their plural by adding an 's' to the singular form.",
      next_review: "2025-06-27T15:35:00.000Z",
      last_reviewed: "2025-06-21T15:35:00.000Z",
    },
    {
      id: 60,
      deck: 8,
      question: "What is agreement in French adjectives?",
      answer:
        "French adjectives must agree in gender and number with the noun they modify, changing their endings accordingly.",
      next_review: "2025-06-24T17:50:00.000Z",
      last_reviewed: "2025-06-21T17:50:00.000Z",
    },
    {
      id: 61,
      deck: 8,
      question: "What is the passé composé in French?",
      answer:
        "The passé composé is a compound past tense formed with an auxiliary verb (avoir or être) plus a past participle.",
      next_review: "2025-06-28T11:25:00.000Z",
      last_reviewed: "2025-06-21T11:25:00.000Z",
    },
    {
      id: 62,
      deck: 8,
      question: "When do you use 'être' vs 'avoir' in passé composé?",
      answer:
        "Use 'être' with movement verbs (aller, venir, etc.) and reflexive verbs. Use 'avoir' with most other verbs.",
      next_review: "2025-06-26T14:40:00.000Z",
      last_reviewed: "2025-06-21T14:40:00.000Z",
    },
  ])

  // Helper functions
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

  // Calculate deck statistics dynamically
  const getDeckStats = (deckId) => {
    const deckCards = allFlashcards.filter((card) => card.deck === deckId)
    const cardCount = deckCards.length
    const studiedToday = deckCards.filter((card) => isCardStudiedToday(card.last_reviewed)).length
    const masteredCards = deckCards.filter((card) => isCardMastered(card.next_review)).length
    const progress = cardCount > 0 ? Math.round((masteredCards / cardCount) * 100) : 0

    return {
      cardCount,
      studiedToday,
      masteredCards,
      progress,
    }
  }

  // Calculate overall stats dynamically
  const totalCards = allFlashcards.length
  const totalStudiedToday = allFlashcards.filter((card) => isCardStudiedToday(card.last_reviewed)).length
  const totalMastered = allFlashcards.filter((card) => isCardMastered(card.next_review)).length
  const overallProgress = totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0

  const handleDeckClick = (deckId) => {
    navigate(`/dashboard/flashcards/deck/${deckId}`)
  }

  const handleLearnClick = (e, deckId) => {
    e.stopPropagation() // Prevent deck click
    navigate(`/dashboard/flashcards/learn/${deckId}`)
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

  const getCategoryColor = (category) => {
    switch (category) {
      case "Programming":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30"
      case "Language":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "Computer Science":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30"
      case "History":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30"
      case "Medicine":
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

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Flashcards
          </h1>
          <p className="text-muted-foreground text-lg mt-2">Master knowledge through spaced repetition</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-5 h-5 mr-2" />
          Create Deck
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold text-foreground">{totalCards}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Studied Today</p>
                <p className="text-2xl font-bold text-foreground">{totalStudiedToday}</p>
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
                <p className="text-2xl font-bold text-foreground">{totalMastered}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold text-foreground">{overallProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Progress */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Daily Goal Progress</span>
              <span className="font-medium">{totalStudiedToday}/50 cards</span>
            </div>
            <Progress value={(totalStudiedToday / 50) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {totalStudiedToday >= 50
                ? "🎉 Great job! You've reached your daily goal!"
                : `${50 - totalStudiedToday} more cards to reach your daily goal`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Flashcard Decks */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            Your Decks ({decks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => {
              const stats = getDeckStats(deck.id)
              const colors = [
                "bg-blue-500",
                "bg-cyan-500",
                "bg-green-500",
                "bg-purple-500",
                "bg-orange-500",
                "bg-red-500",
                "bg-indigo-500",
                "bg-pink-500",
              ]
              const color = colors[(deck.id - 1) % colors.length]

              return (
                <Card
                  key={deck.id}
                  className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
                  onClick={() => handleDeckClick(deck.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Deck Header */}
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl ${color}/20`}>
                          <Brain className={`w-6 h-6 text-white`} style={{ filter: "brightness(0.8)" }} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <p className="text-lg font-bold text-foreground">{stats.progress}%</p>
                        </div>
                      </div>

                      {/* Deck Info */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {deck.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Created {new Date(deck.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <Progress value={stats.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{stats.masteredCards} mastered</span>
                          <span>{stats.cardCount} total</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{stats.studiedToday}</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{stats.cardCount}</p>
                          <p className="text-xs text-muted-foreground">Cards</p>
                        </div>
                      </div>

                      {/* Last Updated */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Updated: {new Date(deck.updated_at).toLocaleDateString()}</span>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={(e) => handleLearnClick(e, deck.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Learn Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">Ready to learn?</h3>
              <p className="text-muted-foreground">
                You have {decks.filter((d) => getDeckStats(d.id).studiedToday === 0).length} decks waiting for review
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="hover:bg-primary/5">
                <Clock className="w-4 h-4 mr-2" />
                Quick Review
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Brain className="w-4 h-4 mr-2" />
                Study All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlashcardsPage
