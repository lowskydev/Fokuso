"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddEventModal } from "@/components/calendar/AddEventModal"
import { ChevronLeft, ChevronRight, Calendar, Clock, Target } from "lucide-react"

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Dummy calendar data
  const [events, setEvents] = useState({
    "2025-06-01": [
      { id: 1, title: "Walk bongo", time: "09:00", endTime: "09:25", type: "other", duration: 25 },
      { id: 2, title: "Project Review", time: "14:00", endTime: "15:00", type: "meeting", duration: 60 },
    ],
    "2025-06-03": [
      { id: 3, title: "Deep Work Block", time: "10:00", endTime: "11:30", type: "focus", duration: 90 },
      { id: 4, title: "Study Session", time: "16:00", endTime: "16:45", type: "study", duration: 45 },
    ],
    "2025-06-05": [
      { id: 5, title: "Focus Sprint", time: "08:30", endTime: "08:55", type: "focus", duration: 25 },
      { id: 6, title: "Learning Time", time: "13:00", endTime: "13:30", type: "study", duration: 30 },
      { id: 7, title: "Team Sync", time: "15:30", endTime: "16:00", type: "meeting", duration: 30 },
    ],
    "2025-06-08": [{ id: 8, title: "Extended Focus", time: "09:00", endTime: "09:50", type: "focus", duration: 50 }],
    "2025-06-10": [
      { id: 9, title: "Quick Focus", time: "11:00", endTime: "11:15", type: "focus", duration: 15 },
      { id: 10, title: "Afternoon Study", time: "14:30", endTime: "15:30", type: "study", duration: 60 },
    ],
    "2025-06-12": [
      { id: 11, title: "Morning Routine", time: "07:00", endTime: "07:25", type: "focus", duration: 25 },
      { id: 12, title: "Project Work", time: "10:00", endTime: "11:30", type: "focus", duration: 90 },
    ],
    "2025-06-15": [
      { id: 13, title: "Focus Block", time: "09:30", endTime: "10:15", type: "focus", duration: 45 },
      { id: 14, title: "Review Session", time: "16:00", endTime: "16:30", type: "study", duration: 30 },
    ],
    "2025-06-18": [{ id: 15, title: "Deep break", time: "08:00", endTime: "10:00", type: "break", duration: 120 }],
    "2025-06-20": [
      { id: 16, title: "Focus Session", time: "10:00", endTime: "10:25", type: "focus", duration: 25 },
      { id: 17, title: "Learning Block", time: "14:00", endTime: "15:30", type: "study", duration: 90 },
      { id: 18, title: "Planning Meeting", time: "16:30", endTime: "17:15", type: "meeting", duration: 45 },
    ],
    "2025-06-22": [{ id: 19, title: "Weekend Focus", time: "09:00", endTime: "10:00", type: "focus", duration: 60 }],
    "2025-06-25": [{ id: 20, title: "Holiday Planning", time: "10:00", endTime: "10:30", type: "study", duration: 30 }],
    "2025-06-28": [
      { id: 21, title: "Year-end Review", time: "09:00", endTime: "10:30", type: "focus", duration: 90 },
      { id: 22, title: "Goal Setting", time: "15:00", endTime: "16:00", type: "study", duration: 60 },
    ],
  })

  // Handle adding new event (this is where you'll integrate with your backend)
  const handleAddEvent = async (eventData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(eventData),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to create event');
      // }
      //
      // const newEvent = await response.json();

      // For now, simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new event with generated ID (in real app, this comes from backend)
      const newEvent = {
        id: Date.now(),
        title: eventData.title,
        time: eventData.startTime || "All Day",
        endTime: eventData.endTime || "All Day",
        type: eventData.type,
        duration: eventData.duration,
        description: eventData.description,
        isAllDay: eventData.isAllDay,
        isRecurring: eventData.isRecurring,
        recurringType: eventData.recurringType,
        recurringEnd: eventData.recurringEnd,
      }

      // Add to local state (in real app, you might refetch or use the returned event)
      const dateKey = eventData.date
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent],
      }))

      console.log("Event added successfully:", newEvent)
    } catch (error) {
      console.error("Error adding event:", error)
      throw error // Re-throw to let modal handle the error
    }
  }

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
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentMonth + direction)
    setCurrentDate(newDate)
  }

  const formatDateKey = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case "focus":
        return "bg-primary/20 text-primary border-primary/30"
      case "study":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30"
      case "meeting":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "break":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "other":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Calculate monthly stats
  const monthlyEvents = Object.values(events).flat()
  const focusSessions = monthlyEvents.filter((e) => e.type === "focus").length
  const totalFocusTime = monthlyEvents.filter((e) => e.type === "focus").reduce((sum, e) => sum + e.duration, 0)
  const studySessions = monthlyEvents.filter((e) => e.type === "study").length

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-muted-foreground text-lg mt-2">Plan and track your focus sessions</p>
        </div>
        <AddEventModal onAddEvent={handleAddEvent} />
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
                <p className="text-2xl font-bold text-foreground">{focusSessions}</p>
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
                <p className="text-sm text-muted-foreground">Total Focus Time</p>
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
                <p className="text-2xl font-bold text-foreground">{studySessions}</p>
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
              <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)} className="hover:bg-primary/5">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="hover:bg-primary/5"
              >
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth(1)} className="hover:bg-primary/5">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
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
                    <div className={`text-sm font-medium mb-2 ${isToday(day) ? "text-primary" : "text-foreground"}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events[formatDateKey(day)]?.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)} cursor-pointer hover:scale-105 transition-transform`}
                          title={`${event.title} - ${event.time} to ${event.endTime} (${event.duration}min)`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
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
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30"></div>
              <span className="text-sm text-muted-foreground">Focus Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/30"></div>
              <span className="text-sm text-muted-foreground">Study Sessions</span>
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
    </div>
  )
}

export default CalendarPage
