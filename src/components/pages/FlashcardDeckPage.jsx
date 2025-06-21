// src/components/pages/FlashcardDeckPage.jsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EditDeckModal } from "@/components/flashcards/EditDeckModal"
import { ArrowLeft, Play, Edit, Trash2, Plus, Brain, Target, Clock, BarChart3, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import useFlashcardStore from "@/store/useFlashcardStore"

function FlashcardDeckPage() {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const {
    decks,
    flashcards,
    isLoading,
    error,
    fetchDecks,
    fetchFlashcards,
    updateDeck,
    deleteDeck,
    createFlashcard,
    deleteFlashcard,
    clearError
  } = useFlashcardStore()

  // Get current deck
  const deck = decks.find(d => d.id === parseInt(deckId))
  const deckFlashcards = flashcards.filter(card => card.deck === parseInt(deckId))

  useEffect(() => {
    // Fetch data if not already loaded
    if (decks.length === 0) {
      fetchDecks()
    }
    fetchFlashcards(deckId) // Fetch flashcards for this specific deck
  }, [deckId, fetchDecks, fetchFlashcards])

  useEffect(() => {
    // Show error toast if there's an error
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  // Handle editing deck
  const handleEditDeck = async (updatedDeck) => {
    try {
      await updateDeck(deck.id, { name: updatedDeck.name })
      toast.success("Deck updated successfully!")
    } catch (error) {
      toast.error("Failed to update deck")
      throw error
    }
  }

  // Handle deleting deck
  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDeck(deckId)
      toast.success("Deck deleted successfully!")
      navigate("/dashboard/flashcards")
    } catch (error) {
      toast.error("Failed to delete deck")
      throw error
    }
  }

  // Handle adding flashcard
  const handleAddFlashcard = async () => {
    const question = prompt("Enter question:")
    if (!question?.trim()) return

    const answer = prompt("Enter answer:")
    if (!answer?.trim()) return

    try {
      await createFlashcard({
        question: question.trim(),
        answer: answer.trim(),
       deck: parseInt(deckId)
     })
     toast.success("Flashcard created successfully!")
     // Refresh flashcards for this deck
     fetchFlashcards(deckId)
   } catch (error) {
     toast.error("Failed to create flashcard")
   }
 }

 // Handle deleting flashcard
 const handleDeleteFlashcard = async (flashcardId) => {
   if (!confirm("Are you sure you want to delete this flashcard?")) return

   try {
     await deleteFlashcard(flashcardId)
     toast.success("Flashcard deleted successfully!")
   } catch (error) {
     toast.error("Failed to delete flashcard")
   }
 }

 // Helper functions
 const isCardDueForReview = (nextReview) => {
   return new Date(nextReview) <= new Date()
 }

 const isCardStudiedToday = (updatedAt) => {
   const today = new Date().toDateString()
   return new Date(updatedAt).toDateString() === today
 }

 const isCardMastered = (card) => {
   return !card.is_learning && card.interval_display.includes("day")
 }

 // Calculate stats dynamically based on actual flashcard data
 const masteredCount = deckFlashcards.filter(card => isCardMastered(card)).length
 const learningCount = deckFlashcards.filter(card => card.is_learning).length
 const needsReview = deckFlashcards.filter(card => isCardDueForReview(card.next_review)).length

 const getCardStatus = (card) => {
   const now = new Date()
   const reviewDate = new Date(card.next_review)

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
 const filteredCards = deckFlashcards.filter((card) => {
   const matchesSearch =
     searchTerm === "" ||
     card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     card.answer.toLowerCase().includes(searchTerm.toLowerCase())

   const matchesFilter =
     filter === "all" ||
     (filter === "mastered" && isCardMastered(card)) ||
     (filter === "learning" && card.is_learning) ||
     (filter === "difficult" && isCardDueForReview(card.next_review))

   return matchesSearch && matchesFilter
 })

 if (isLoading && !deck) {
   return (
     <div className="space-y-8 pb-8">
       <div className="flex items-center justify-center h-64">
         <div className="text-center">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
           <p className="text-muted-foreground">Loading deck...</p>
         </div>
       </div>
     </div>
   )
 }

 if (!deck) {
   return (
     <div className="space-y-8 pb-8">
       <div className="text-center py-12">
         <p className="text-muted-foreground text-lg">Deck not found</p>
         <Button onClick={handleBackClick} className="mt-4">
           <ArrowLeft className="w-4 h-4 mr-2" />
           Back to Decks
         </Button>
       </div>
     </div>
   )
 }

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
               <p className="text-2xl font-bold text-foreground">{deckFlashcards.length}</p>
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
               {masteredCount}/{deckFlashcards.length} cards mastered
             </span>
           </div>
           <Progress value={deckFlashcards.length > 0 ? (masteredCount / deckFlashcards.length) * 100 : 0} className="h-3" />
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
           <Button variant="outline" onClick={handleAddFlashcard} className="hover:bg-primary/5">
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
               <p className="text-muted-foreground/60">
                 {deckFlashcards.length === 0
                   ? "Add your first flashcard to get started"
                   : "Try adjusting your search or filters"
                 }
               </p>
               {deckFlashcards.length === 0 && (
                 <Button onClick={handleAddFlashcard} className="mt-4">
                   <Plus className="w-4 h-4 mr-2" />
                   Add Your First Card
                 </Button>
               )}
             </div>
           ) : (
             filteredCards.map((card) => {
               const cardStatus = getCardStatus(card)

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
                           <Button
                             variant="ghost"
                             size="sm"
                             className="hover:bg-red-50 hover:text-red-600"
                             onClick={() => handleDeleteFlashcard(card.id)}
                           >
                             <Trash2 className="w-4 h-4" />
                           </Button>
                         </div>
                       </div>

                       {/* Card Stats */}
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <Badge className={`${cardStatus.color} border`}>{cardStatus.label}</Badge>
                           {card.is_learning && (
                             <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Learning</Badge>
                           )}
                         </div>
                         <div className="flex items-center gap-6 text-sm text-muted-foreground">
                           <div className="text-center">
                             <p className="font-medium text-foreground">
                               {new Date(card.next_review).toLocaleDateString()}
                             </p>
                             <p className="text-xs">Next Review</p>
                           </div>
                           <div className="text-center">
                             <p className="font-medium text-foreground">{card.repetition}</p>
                             <p className="text-xs">Reviews</p>
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