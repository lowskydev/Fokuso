// src/components/pages/CalendarPage.jsx (updated)
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddEventModal } from "@/components/calendar/AddEventModal";
import { EditEventModal } from "@/components/calendar/EditEventModal";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Target,
} from "lucide-react";
import useCalendarStore from "@/store/useCalendarStore";
import { toast } from "sonner";

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Get calendar store data and functions
  const { events, isLoading, error, fetchEvents, clearError } =
    useCalendarStore();

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Fetch events when component mounts or when month changes
  useEffect(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    // Get last day of month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Add a small buffer to ensure we get all events
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - 1); // One day before

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + 1); // One day after

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    fetchEvents({
      start_date: startDateStr,
      end_date: endDateStr,
    });
  }, [currentDate, fetchEvents]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const formatDateKey = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "focus":
        return "bg-primary/20 text-primary border-primary/30";
      case "study":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "meeting":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "break":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "other":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Handle event click
  const handleEventClick = (event, dateKey) => {
    setSelectedEvent({
      ...event,
      date: dateKey,
    });
    setEditModalOpen(true);
  };

  // Calculate monthly stats from actual events data
  const allEventsThisMonth = Object.entries(events)
    .filter(([dateKey]) => {
      const eventDate = new Date(dateKey);
      return (
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    })
    .flatMap(([_, dayEvents]) => dayEvents);

  const focusSessions = allEventsThisMonth.filter(
    (e) => e.type === "focus"
  ).length;
  const totalFocusTime = allEventsThisMonth
    .filter((e) => e.type === "focus")
    .reduce((sum, e) => sum + (e.duration || 0), 0);
  const studySessions = allEventsThisMonth.filter(
    (e) => e.type === "study"
  ).length;

  if (isLoading && Object.keys(events).length === 0) {
    return (
      <div className="space-y-8 pb-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Plan and track your focus sessions
          </p>
        </div>
        <AddEventModal />
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Focus Sessions</p>
                <p className="text-2xl font-bold text-foreground">
                  {focusSessions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Focus Time
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.floor(totalFocusTime / 60)}h {totalFocusTime % 60}m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Sessions</p>
                <p className="text-2xl font-bold text-foreground">
                  {studySessions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground">
              {monthNames[currentMonth]} {currentYear}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(-1)}
                className="hover:bg-primary/5"
                disabled={isLoading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="hover:bg-primary/5"
                disabled={isLoading}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(1)}
                className="hover:bg-primary/5"
                disabled={isLoading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 rounded-lg border transition-all duration-200 ${
                  day
                    ? isToday(day)
                      ? "bg-primary/10 border-primary/30 shadow-lg"
                      : "bg-muted/30 border-border hover:bg-muted/50"
                    : "border-transparent"
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`text-sm font-medium mb-2 ${
                        isToday(day) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {(events[formatDateKey(day)] || []).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getEventTypeColor(
                            event.type
                          )} cursor-pointer hover:scale-105 transition-transform hover:shadow-md`}
                          title={`${event.title} - ${event.time} to ${event.endTime} (${event.duration}min)`}
                          onClick={() =>
                            handleEventClick(event, formatDateKey(day))
                          }
                        >
                          <div className="font-medium truncate">
                            {event.title}
                          </div>
                          <div className="text-xs opacity-75">
                            {event.time} - {event.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">
                  Loading events...
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend remains the same */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">
            Event Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30"></div>
              <span className="text-sm text-muted-foreground">
                Focus Sessions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/30"></div>
              <span className="text-sm text-muted-foreground">
                Study Sessions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/30"></div>
              <span className="text-sm text-muted-foreground">Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500/30"></div>
              <span className="text-sm text-muted-foreground">Break Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500/30"></div>
              <span className="text-sm text-muted-foreground">Other</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Event Modal */}
      <EditEventModal
        event={selectedEvent}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </div>
  );
}

export default CalendarPage;
