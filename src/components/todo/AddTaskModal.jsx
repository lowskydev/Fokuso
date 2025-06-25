"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Plus,
  CalendarIcon,
  AlertTriangle,
  Flag,
  Circle,
  X,
  Loader2,
  Tag,
  Briefcase,
  User,
  GraduationCap,
  Heart,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AddTaskModal({ onAddTask, trigger }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Helper function to format date without timezone issues
  const formatDateForAPI = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "personal",
    dueDate: null,
    tagNames: [], // Changed from tags to tagNames to match API
  });

  const [tagInput, setTagInput] = useState("");

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (
      formData.dueDate &&
      formData.dueDate < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.dueDate = "Due date cannot be in the past";
    }

    if (formData.tagNames.length > 10) {
      newErrors.tagNames = "Maximum 10 tags allowed";
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
      // Prepare task data for backend
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        category: formData.category,
        due_date: formatDateForAPI(formData.dueDate), // Use the helper function
        tag_names: formData.tagNames,
      };

      // Call the parent component's add task function
      await onAddTask(taskData);

      // Reset form and close modal
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
      setErrors({ submit: "Failed to add task. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      category: "personal",
      dueDate: null,
      tagNames: [],
    });
    setTagInput("");
    setErrors({});
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
    if (
      tag &&
      !formData.tagNames.includes(tag) &&
      formData.tagNames.length < 10
    ) {
      setFormData((prev) => ({
        ...prev,
        tagNames: [...prev.tagNames, tag],
      }));
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tagNames: prev.tagNames.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle tag input key press
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  // Priority options
  const priorityOptions = [
    {
      value: "low",
      label: "Low Priority",
      icon: Circle,
      color: "text-green-600",
    },
    {
      value: "medium",
      label: "Medium Priority",
      icon: Flag,
      color: "text-yellow-600",
    },
    {
      value: "high",
      label: "High Priority",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  // Category options - updated to match API choices
  const categoryOptions = [
    {
      value: "personal",
      label: "Personal",
      icon: User,
      color: "text-purple-600",
    },
    {
      value: "education",
      label: "Education",
      icon: GraduationCap,
      color: "text-indigo-600",
    },
    { value: "work", label: "Work", icon: Briefcase, color: "text-blue-600" },
    {
      value: "health",
      label: "Health",
      icon: Heart,
      color: "text-green-600",
    },
    {
      value: "finance",
      label: "Finance",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      value: "other",
      label: "Other",
      icon: MoreHorizontal,
      color: "text-gray-600",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Task Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Task Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={cn(
                "h-12 text-lg",
                errors.title && "border-red-500 focus:border-red-500"
              )}
              maxLength={100}
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add task description (optional)..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={cn(
                "min-h-[100px] resize-none",
                errors.description && "border-red-500 focus:border-red-500"
              )}
              maxLength={500}
            />
            {errors.description && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Priority and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className={`w-4 h-4 ${option.color}`} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className={`w-4 h-4 ${option.color}`} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Due Date
            </Label>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !formData.dueDate && "text-muted-foreground",
                    errors.dueDate && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate
                    ? format(formData.dueDate, "PPP")
                    : "Select due date (optional)"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 z-[60]"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) => handleInputChange("dueDate", date)}
                  disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                  initialFocus
                />
                {formData.dueDate && (
                  <div className="p-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("dueDate", null)}
                      className="w-full"
                    >
                      Clear Date
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.dueDate}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Tags</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Add tags (press Enter or comma to add)..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    className="pl-10"
                    disabled={formData.tagNames.length >= 10}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  disabled={!tagInput.trim() || formData.tagNames.length >= 10}
                >
                  Add
                </Button>
              </div>

              {/* Display Tags */}
              {formData.tagNames.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tagNames.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                {formData.tagNames.length}/10 tags{" "}
                {formData.tagNames.length >= 10 && "(Maximum reached)"}
              </p>
              {errors.tagNames && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.tagNames}
                </p>
              )}
            </div>
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
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Task...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
