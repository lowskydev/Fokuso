"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Loader2,
  Save,
  Brain,
  BookOpen,
  Eye,
  EyeOff,
  Lightbulb,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CreateFlashcardModal({
  onCreateFlashcard,
  decks,
  currentDeckId = null,
  trigger,
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    deck: currentDeckId || "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
    }

    if (formData.question.length > 500) {
      newErrors.question = "Question must be less than 500 characters";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required";
    }

    if (formData.answer.length > 1000) {
      newErrors.answer = "Answer must be less than 1000 characters";
    }

    if (!formData.deck) {
      newErrors.deck = "Please select a deck";
    }

    if (formData.tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare flashcard data
      const flashcardData = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        deck: Number.parseInt(formData.deck),
        tags: formData.tags,
      };

      // Call the parent component's create flashcard function
      await onCreateFlashcard(flashcardData);

      // Reset form but keep the modal open for the next card
      resetFormButKeepDeck();

      // Focus on the question field for the next card
      setTimeout(() => {
        const questionField = document.getElementById("question");
        if (questionField) {
          questionField.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Error creating flashcard:", error);
      setErrors({ submit: "Failed to create flashcard. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to initial state but keep deck and modal open
  const resetFormButKeepDeck = () => {
    setFormData((prev) => ({
      question: "",
      answer: "",
      deck: prev.deck, // Keep the selected deck
      tags: [],
    }));
    setTagInput("");
    setErrors({});
    setShowPreview(false);
  };

  // Reset form completely and close modal
  const resetFormAndClose = () => {
    setFormData({
      question: "",
      answer: "",
      deck: currentDeckId || "",
      tags: [],
    });
    setTagInput("");
    setErrors({});
    setShowPreview(false);
    setOpen(false);
  };

  // Reset form when modal opens
  const handleOpenChange = (newOpen) => {
    if (newOpen) {
      setFormData({
        question: "",
        answer: "",
        deck: currentDeckId || "",
        tags: [],
      });
      setTagInput("");
      setErrors({});
      setShowPreview(false);
    }
    setOpen(newOpen);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Handle tag addition
  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle tag input key press
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  // Quick fill examples
  const quickExamples = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      tags: ["geography", "capitals"],
    },
    {
      question: "What does HTML stand for?",
      answer: "HyperText Markup Language",
      tags: ["programming", "web-development"],
    },
    {
      question: "What is 2 + 2?",
      answer: "4",
      tags: ["math", "basic"],
    },
  ];

  const fillExample = (example) => {
    setFormData((prev) => ({
      ...prev,
      question: example.question,
      answer: example.answer,
      tags: example.tags,
    }));
  };

  const selectedDeck = decks?.find(
    (deck) => deck.id === Number.parseInt(formData.deck)
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5 mr-2" />
            Add Flashcard
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            Create New Flashcard
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Deck Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Select Deck *
            </Label>
            <Select
              value={formData.deck.toString()}
              onValueChange={(value) => handleInputChange("deck", value)}
            >
              <SelectTrigger
                className={cn("h-12", errors.deck && "border-red-500")}
              >
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
            {errors.deck && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.deck}
              </p>
            )}
            {selectedDeck && (
              <p className="text-xs text-muted-foreground">
                Adding to:{" "}
                <span className="font-medium text-foreground">
                  {selectedDeck.name}
                </span>
              </p>
            )}
          </div>

          {/* Question */}
          <div className="space-y-2">
            <Label
              htmlFor="question"
              className="text-sm font-medium text-foreground"
            >
              Question *
            </Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              className={cn(
                "min-h-[100px] resize-none text-lg",
                errors.question && "border-red-500 focus:border-red-500"
              )}
              maxLength={500}
              autoFocus
            />
            {errors.question && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.question}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.question.length}/500 characters
            </p>
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <Label
              htmlFor="answer"
              className="text-sm font-medium text-foreground"
            >
              Answer *
            </Label>
            <Textarea
              id="answer"
              placeholder="Enter the answer here..."
              value={formData.answer}
              onChange={(e) => handleInputChange("answer", e.target.value)}
              className={cn(
                "min-h-[120px] resize-none text-lg",
                errors.answer && "border-red-500 focus:border-red-500"
              )}
              maxLength={1000}
            />
            {errors.answer && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.answer}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.answer.length}/1000 characters
            </p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetFormAndClose}
              className="flex-1"
              disabled={isLoading}
            >
              Done
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add & Continue
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
