"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Clock,
  Timer,
  BookOpen,
  Users,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

import useCalendarStore from "@/store/useCalendarStore";
import { toast } from "sonner";

export function AddEventModal({ trigger, selectedDate = null }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Get calendar store functions
  const { createEvent, isLoading, error, clearError } = useCalendarStore();

  // Form state remains the same
  const [formData, setFormData] = useState({
    title: "",
    date: selectedDate || new Date(),
    startTime: "09:00",
    endTime: "10:00",
    type: "focus",
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

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    const startTime = new Date(`2000-01-01T${formData.startTime}:00`);
    const endTime = new Date(`2000-01-01T${formData.endTime}:00`);

    if (endTime <= startTime) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Updated handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Clear any previous errors
      clearError();

      // Prepare event data for backend
      const eventData = {
        title: formData.title.trim(),
        date: `${formData.date.getFullYear()}-${String(
          formData.date.getMonth() + 1
        ).padStart(2, "0")}-${String(formData.date.getDate()).padStart(
          2,
          "0"
        )}`,
        start_time: formData.startTime,
        end_time: formData.endTime,
        event_type: formData.type,
      };

      // Call the store function to create event
      await createEvent(eventData);

      // Show success message
      toast.success("Event created successfully!");

      // Reset form and close modal
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to create event. Please try again.");
      setErrors({ submit: "Failed to add event. Please try again." });
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      date: selectedDate || new Date(),
      startTime: "09:00",
      endTime: "10:00",
      type: "focus",
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
            <Label className="text-sm font-medium text-foreground">
              Date & Time
            </Label>

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

              {/* End Time */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  End Time
                </Label>
                <Select
                  value={formData.endTime}
                  onValueChange={(value) => handleInputChange("endTime", value)}
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
