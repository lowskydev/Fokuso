"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Edit, Loader2, Save, Trash2, AlertTriangle, Brain, X, Tag, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export function EditFlashcardModal({ flashcard, decks, onEditFlashcard, onDeleteFlashcard, trigger }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errors, setErrors] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    question: flashcard?.question || "",
    answer: flashcard?.answer || "",
    deck: flashcard?.deck || "",
    tags: flashcard?.tags || [],
  })

  const [tagInput, setTagInput] = useState("")

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.question.trim()) {
      newErrors.question = "Question is required"
    }

    if (formData.question.length > 500) {
      newErrors.question = "Question must be less than 500 characters"
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required"
    }

    if (formData.answer.length > 1000) {
      newErrors.answer = "Answer must be less than 1000 characters"
    }

    if (!formData.deck) {
      newErrors.deck = "Please select a deck"
    }

    if (formData.tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Prepare updated flashcard data
      const updatedFlashcard = {
        ...flashcard,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        deck: Number.parseInt(formData.deck),
        tags: formData.tags,
        updated_at: new Date().toISOString(),
      }

      // Call the parent component's edit flashcard function
      await onEditFlashcard(updatedFlashcard)

      // Close modal
      setOpen(false)
    } catch (error) {
      console.error("Error updating flashcard:", error)
      setErrors({ submit: "Failed to update flashcard. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle flashcard deletion
  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Call the parent component's delete flashcard function
      await onDeleteFlashcard(flashcard.id)

      // Close modal
      setOpen(false)
    } catch (error) {
      console.error("Error deleting flashcard:", error)
      setErrors({ submit: "Failed to delete flashcard. Please try again." })
    } finally {
      setIsDeleting(false)
    }
  }

  // Reset form when modal opens
  const handleOpenChange = (newOpen) => {
    if (newOpen) {
      setFormData({
        question: flashcard?.question || "",
        answer: flashcard?.answer || "",
        deck: flashcard?.deck || "",
        tags: flashcard?.tags || [],
      })
      setTagInput("")
      setErrors({})
    }
    setOpen(newOpen)
  }

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  // Handle tag addition
  const addTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
      setTagInput("")
    }
  }

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  // Handle tag input key press
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    }
  }

  // Get deck name for display
  const selectedDeck = decks?.find((deck) => deck.id === Number.parseInt(formData.deck))
  const currentDeck = decks?.find((deck) => deck.id === flashcard?.deck)

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"
    return new Date(dateString).toLocaleDateString()
  }

  // Get card status info
  const getCardStatusInfo = () => {
    if (!flashcard) return null

    const now = new Date()
    const reviewDate = new Date(flashcard.next_review)
    const isOverdue = reviewDate <= now
    const isDueSoon = reviewDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000

    return {
      isOverdue,
      isDueSoon,
      nextReview: formatDate(flashcard.next_review),
      repetitions: flashcard.repetition || 0,
      isLearning: flashcard.is_learning,
      interval: flashcard.interval_display || "New",
    }
  }

  const statusInfo = getCardStatusInfo()

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="hover:bg-primary/5">
            <Edit className="w-4 h-4 mr-2" />
            Edit Card
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Edit className="w-6 h-6 text-primary" />
            </div>
            Edit Flashcard
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Deck Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Deck *</Label>
            <Select value={formData.deck.toString()} onValueChange={(value) => handleInputChange("deck", value)}>
              <SelectTrigger className={cn("h-12", errors.deck && "border-red-500")}>
                <SelectValue placeholder="Choose a deck for this flashcard" />
              </SelectTrigger>
              <SelectContent>
                {decks?.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span>{deck.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.deck && <p className="text-sm text-red-600 dark:text-red-400">{errors.deck}</p>}
            {selectedDeck && selectedDeck.id !== flashcard?.deck && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                ⚠️ Moving from "{currentDeck?.name}" to "{selectedDeck.name}"
              </p>
            )}
          </div>

          {/* Question */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-sm font-medium text-foreground">
              Question *
            </Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              className={cn(
                "min-h-[100px] resize-none text-lg",
                errors.question && "border-red-500 focus:border-red-500",
              )}
              maxLength={500}
            />
            {errors.question && <p className="text-sm text-red-600 dark:text-red-400">{errors.question}</p>}
            <p className="text-xs text-muted-foreground">{formData.question.length}/500 characters</p>
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <Label htmlFor="answer" className="text-sm font-medium text-foreground">
              Answer *
            </Label>
            <Textarea
              id="answer"
              placeholder="Enter the answer here..."
              value={formData.answer}
              onChange={(e) => handleInputChange("answer", e.target.value)}
              className={cn(
                "min-h-[120px] resize-none text-lg",
                errors.answer && "border-red-500 focus:border-red-500",
              )}
              maxLength={1000}
            />
            {errors.answer && <p className="text-sm text-red-600 dark:text-red-400">{errors.answer}</p>}
            <p className="text-xs text-muted-foreground">{formData.answer.length}/1000 characters</p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isLoading || isDeleting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading || isDeleting}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h4 className="font-medium text-red-600 dark:text-red-400">Danger Zone</h4>
            </div>

            <div className="p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-red-700 dark:text-red-400">Delete this flashcard</h5>
                  <p className="text-sm text-red-600 dark:text-red-500">
                    Once you delete a flashcard, there is no going back. This will permanently delete the flashcard and
                    all its learning progress.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      disabled={isLoading || isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Flashcard
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card/95 backdrop-blur-md border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        This action cannot be undone. This will permanently delete this flashcard and all its learning
                        data.
                        <br />
                        <br />
                        <div className="p-3 bg-muted/50 rounded-lg mt-3">
                          <p className="font-medium text-foreground mb-1">Question:</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {flashcard?.question?.substring(0, 100)}
                            {flashcard?.question?.length > 100 ? "..." : ""}
                          </p>
                          <p className="font-medium text-foreground mb-1">Answer:</p>
                          <p className="text-sm text-muted-foreground">
                            {flashcard?.answer?.substring(0, 100)}
                            {flashcard?.answer?.length > 100 ? "..." : ""}
                          </p>
                        </div>
                        <br />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          All learning progress for this card will be lost.
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Yes, delete flashcard
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
