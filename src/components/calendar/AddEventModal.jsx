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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Plus,
  CalendarIcon,
  Clock,
  Timer,
  BookOpen,
  Users,
  Loader2,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AddEventModal({ onAddEvent, trigger, selectedDate = null }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: selectedDate || new Date(),
    startTime: "09:00",
    endTime: "10:00",
    type: "focus",
    isAllDay: false,
    isRecurring: false,
    recurringType: "weekly",
    recurringEnd: null,
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.isAllDay) {
      const startTime = new Date(`2000-01-01T${formData.startTime}:00`);
      const endTime = new Date(`2000-01-01T${formData.endTime}:00`);

      if (endTime <= startTime) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    if (
      formData.isRecurring &&
      formData.recurringEnd &&
      formData.recurringEnd <= formData.date
    ) {
      newErrors.recurringEnd = "Recurring end date must be after event date";
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
      // Calculate duration
      let duration = 60; // default 1 hour
      if (!formData.isAllDay) {
        const startTime = new Date(`2000-01-01T${formData.startTime}:00`);
        const endTime = new Date(`2000-01-01T${formData.endTime}:00`);
        duration = Math.round((endTime - startTime) / (1000 * 60)); // duration in minutes
      }

      // Prepare event data for backend
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date.toISOString().split("T")[0],
        startTime: formData.isAllDay ? null : formData.startTime,
        endTime: formData.isAllDay ? null : formData.endTime,
        duration: duration,
        type: formData.type,
        isAllDay: formData.isAllDay,
        isRecurring: formData.isRecurring,
        recurringType: formData.isRecurring ? formData.recurringType : null,
        recurringEnd:
          formData.isRecurring && formData.recurringEnd
            ? formData.recurringEnd.toISOString().split("T")[0]
            : null,
        createdAt: new Date().toISOString(),
      };

      // Call the parent component's add event function
      await onAddEvent(eventData);

      // Reset form and close modal
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
      setErrors({ submit: "Failed to add event. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: selectedDate || new Date(),
      startTime: "09:00",
      endTime: "10:00",
      type: "focus",
      isAllDay: false,
      isRecurring: false,
      recurringType: "weekly",
      recurringEnd: null,
    });
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

  // Event type options
  const eventTypes = [
    {
      value: "focus",
      label: "Focus Session",
      icon: Timer,
      color: "bg-primary/20 text-primary border-primary/30",
    },
    {
      value: "study",
      label: "Study Session",
      icon: BookOpen,
      color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    },
    {
      value: "meeting",
      label: "Meeting",
      icon: Users,
      color: "bg-green-500/20 text-green-600 border-green-500/30",
    },
    {
      value: "break",
      label: "Break Time",
      icon: Clock,
      color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    },
    {
      value: "other",
      label: "Other",
      icon: Plus,
      color: "bg-purple-500/20 text-purple-600 border-purple-500/30",
    },
  ];

  // Recurring options
  const recurringOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  // Generate time options
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const displayTime = new Date(
          `2000-01-01T${timeString}:00`
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        times.push({ value: timeString, label: displayTime });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5 mr-2" />
            Add Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            Add New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Event Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter event title..."
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

          {/* Event Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add event description (optional)..."
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

          {/* Event Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Event Type
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {eventTypes.map((type) => (
                <Button
                  key={type.value}
                  type="button"
                  variant={formData.type === type.value ? "default" : "outline"}
                  className={cn(
                    "h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300",
                    formData.type === type.value
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "hover:bg-primary/5 hover:border-primary/50"
                  )}
                  onClick={() => handleInputChange("type", type.value)}
                >
                  <type.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                Date & Time
              </Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isAllDay}
                  onCheckedChange={(checked) =>
                    handleInputChange("isAllDay", checked)
                  }
                />
                <Label className="text-sm text-muted-foreground">All day</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Date *</Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground",
                        errors.date && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date
                        ? format(formData.date, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[60]" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      disabled={(date) =>
                        date < new Date().setHours(0, 0, 0, 0)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Start Time */}
              {!formData.isAllDay && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Start Time
                  </Label>
                  <Select
                    value={formData.startTime}
                    onValueChange={(value) =>
                      handleInputChange("startTime", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {timeOptions.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* End Time */}
              {!formData.isAllDay && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    End Time
                  </Label>
                  <Select
                    value={formData.endTime}
                    onValueChange={(value) =>
                      handleInputChange("endTime", value)
                    }
                  >
                    <SelectTrigger
                      className={cn("h-12", errors.endTime && "border-red-500")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {timeOptions.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.endTime && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {errors.endTime}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Recurring Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-muted-foreground" />
                <Label className="text-sm font-medium text-foreground">
                  Recurring Event
                </Label>
              </div>
              <Switch
                checked={formData.isRecurring}
                onCheckedChange={(checked) =>
                  handleInputChange("isRecurring", checked)
                }
              />
            </div>

            {formData.isRecurring && (
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Repeat
                    </Label>
                    <Select
                      value={formData.recurringType}
                      onValueChange={(value) =>
                        handleInputChange("recurringType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {recurringOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      End Date
                    </Label>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.recurringEnd && "text-muted-foreground",
                            errors.recurringEnd && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.recurringEnd
                            ? format(formData.recurringEnd, "PPP")
                            : "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[60]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={formData.recurringEnd}
                          onSelect={(date) =>
                            handleInputChange("recurringEnd", date)
                          }
                          disabled={(date) => date <= formData.date}
                          initialFocus
                        />
                        {formData.recurringEnd && (
                          <div className="p-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleInputChange("recurringEnd", null)
                              }
                              className="w-full"
                            >
                              Clear Date
                            </Button>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                    {errors.recurringEnd && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.recurringEnd}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                  Adding Event...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
