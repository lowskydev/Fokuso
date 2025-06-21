// src/components/flashcards/EditDeckModal.jsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Separator } from "@/components/ui/separator"
import { Edit, Loader2, Save, Trash2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function EditDeckModal({ deck, onEditDeck, onDeleteDeck, trigger }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errors, setErrors] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    name: deck?.name || "",
  })

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Deck name is required"
    }

    if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters"
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
      // Prepare updated deck data
      const updatedDeck = {
        ...deck,
        name: formData.name.trim(),
        updated_at: new Date().toISOString(),
      }

      // Call the parent component's edit deck function
      await onEditDeck(updatedDeck)

      // Close modal
      setOpen(false)
    } catch (error) {
      console.error("Error updating deck:", error)
      setErrors({ submit: "Failed to update deck. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle deck deletion
  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Call the parent component's delete deck function
      await onDeleteDeck(deck.id)

      // Close modal
      setOpen(false)
    } catch (error) {
      console.error("Error deleting deck:", error)
      setErrors({ submit: "Failed to delete deck. Please try again." })
    } finally {
      setIsDeleting(false)
    }
  }

  // Reset form when modal opens
  const handleOpenChange = (newOpen) => {
    if (newOpen) {
      setFormData({
        name: deck?.name || "",
      })
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="hover:bg-primary/5">
            <Edit className="w-4 h-4 mr-2" />
            Edit Deck
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Edit className="w-6 h-6 text-primary" />
            </div>
            Edit Deck
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Deck Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Deck Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter deck name..."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn("h-12 text-lg", errors.name && "border-red-500 focus:border-red-500")}
              maxLength={100}
            />
            {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            <p className="text-xs text-muted-foreground">{formData.name.length}/100 characters</p>
          </div>

          {/* Deck Info */}
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground">Deck Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium text-foreground">
                  {deck?.created_at ? new Date(deck.created_at).toLocaleDateString() : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium text-foreground">
                  {deck?.updated_at ? new Date(deck.updated_at).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </div>
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
                  <h5 className="font-medium text-red-700 dark:text-red-400">Delete this deck</h5>
                  <p className="text-sm text-red-600 dark:text-red-500">
                    Once you delete a deck, there is no going back. This will permanently delete all flashcards in this
                    deck.
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
                          Delete Deck
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
                        This action cannot be undone. This will permanently delete the deck{" "}
                        <span className="font-semibold text-foreground">"{deck?.name}"</span> and all of its flashcards.
                        <br />
                        <br />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          All your learning progress for this deck will be lost.
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
                            Yes, delete deck
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