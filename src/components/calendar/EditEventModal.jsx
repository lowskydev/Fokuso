"use client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import {
  Edit,
  CalendarIcon,
  Clock,
  Timer,
  BookOpen,
  Users,
  Loader2,
  Trash2,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import useCalendarStore from "@/store/useCalendarStore";
import { toast } from "sonner";

export function EditEventModal({ event, open, onOpenChange }) {
  const [errors, setErrors] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Get calendar store functions
  const { updateEvent, deleteEvent, isLoading, error, clearError } =
    useCalendarStore();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    type: "focus",
  });

  // Initialize form data when event changes
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        date: new Date(event.date || new Date()),
        startTime: event.time || "09:00",
        endTime: event.endTime || "10:00",
        type: event.type || "focus",
      });
    }
  }, [event]);

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

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      clearError();

      const eventData = {
        title: formData.title.trim(),
        date: formData.date.toISOString().split("T")[0],
        start_time: formData.startTime,
        end_time: formData.endTime,
        event_type: formData.type,
      };

      await updateEvent(event.id, eventData);
      toast.success("Event updated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
      setErrors({ submit: "Failed to update event. Please try again." });
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      clearError();
      await deleteEvent(event.id);
      toast.success("Event deleted successfully!");
      setShowDeleteDialog(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
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

  if (!event) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto z-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Edit className="w-6 h-6 text-primary" />
              </div>
              Edit Event
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6 py-4">
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
                    variant={
                      formData.type === type.value ? "default" : "outline"
                    }
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
                  <Label className="text-xs text-muted-foreground">
                    Date *
                  </Label>
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
                onClick={() => onOpenChange(false)}
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
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Event
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h4 className="font-medium text-red-600 dark:text-red-400">
                  Danger Zone
                </h4>
              </div>

              <div className="p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-red-700 dark:text-red-400">
                      Delete this event
                    </h5>
                    <p className="text-sm text-red-600 dark:text-red-500">
                      Once you delete an event, there is no going back. This
                      will permanently delete the event from your calendar.
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Event
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card/95 backdrop-blur-md border-border">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <AlertTriangle className="w-5 h-5" />
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                          This action cannot be undone. This will permanently
                          delete this event from your calendar.
                          <br />
                          <br />
                          <div className="p-3 bg-muted/50 rounded-lg mt-3">
                            <p className="font-medium text-foreground mb-1">
                              Event:
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              {event?.title}
                            </p>
                            <p className="font-medium text-foreground mb-1">
                              Date & Time:
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {event?.date &&
                                format(new Date(event.date), "PPP")}{" "}
                              at {event?.time} - {event?.endTime}
                            </p>
                          </div>
                          <br />
                          <span className="text-red-600 dark:text-red-400 font-medium">
                            This event will be permanently removed from your
                            calendar.
                          </span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isLoading}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Yes, delete event
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
    </>
  );
}
