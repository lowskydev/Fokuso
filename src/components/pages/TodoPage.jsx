"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddTaskModal } from "@/components/todo/AddTaskModal"
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Flag,
  Calendar,
  Filter,
  Search,
  Target,
  TrendingUp,
  Trash2,
} from "lucide-react"

function TodoPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

   const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish Fokuso",
      description: "We need to really get this done while we still have the momentum",
      completed: false,
      priority: "high",
      category: "work",
      dueDate: "2025-06-27",
      createdAt: "2025-06-15",
      tags: ["fokuso", "software", "urgent", "cs"],
    },
    {
      id: 2,
      title: "Review pull requests",
      description: "Check and approve pending PRs from team members",
      completed: true,
      priority: "medium",
      category: "work",
      dueDate: "2025-06-20",
      createdAt: "2025-06-14",
      tags: ["code-review", "team"],
    },
    {
      id: 3,
      title: "Plan weekend study session",
      description: "Organize materials for JavaScript advanced concepts",
      completed: false,
      priority: "low",
      category: "personal",
      dueDate: "2025-06-25",
      createdAt: "2025-06-16",
      tags: ["study", "javascript", "weekend"],
    },
    {
      id: 4,
      title: "Fix authentication bug",
      description: "Resolve login issues reported by users",
      completed: false,
      priority: "high",
      category: "work",
      dueDate: "2025-06-21",
      createdAt: "2025-06-17",
      tags: ["bug", "auth", "critical"],
    },
    {
      id: 5,
      title: "Update portfolio website",
      description: "Add recent projects and refresh design",
      completed: false,
      priority: "medium",
      category: "personal",
      dueDate: "2025-06-30",
      createdAt: "2025-06-10",
      tags: ["portfolio", "design", "projects"],
    },
    {
      id: 6,
      title: "Prepare presentation slides",
      description: "Create slides for next week's team meeting",
      completed: true,
      priority: "medium",
      category: "work",
      dueDate: "2025-06-19",
      createdAt: "2025-06-12",
      tags: ["presentation", "meeting"],
    },
    {
      id: 7,
      title: "Learn TypeScript generics",
      description: "Deep dive into advanced TypeScript concepts",
      completed: false,
      priority: "low",
      category: "learning",
      dueDate: "2025-06-01",
      createdAt: "2025-06-18",
      tags: ["typescript", "learning", "generics"],
    },
    {
      id: 8,
      title: "Organize desk workspace",
      description: "Clean and reorganize home office setup",
      completed: true,
      priority: "low",
      category: "personal",
      dueDate: "2025-06-18",
      createdAt: "2025-06-15",
      tags: ["organization", "workspace"],
    },
    {
      id: 9,
      title: "Database optimization",
      description: "Improve query performance for user dashboard",
      completed: false,
      priority: "high",
      category: "work",
      dueDate: "2025-06-23",
      createdAt: "2025-06-16",
      tags: ["database", "performance", "optimization"],
    },
    {
      id: 10,
      title: "Read 'Clean Code' chapter 5",
      description: "Continue reading and take notes",
      completed: false,
      priority: "medium",
      category: "learning",
      dueDate: "2025-06-26",
      createdAt: "2025-06-13",
      tags: ["reading", "clean-code", "books"],
    },
  ])

  // Handle adding new task (this is where you'll integrate with your backend)
  const handleAddTask = async (taskData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/tasks', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(taskData),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to create task');
      // }
      //
      // const newTask = await response.json();

      // For now, simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new task with generated ID (in real app, this comes from backend)
      const newTask = {
        id: Date.now(),
        ...taskData,
      }

      // Add to local state (in real app, you might refetch or use the returned task)
      setTodos((prev) => [newTask, ...prev])

      console.log("Task added successfully:", newTask)
    } catch (error) {
      console.error("Error adding task:", error)
      throw error // Re-throw to let modal handle the error
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-600 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30"
      case "personal":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30"
      case "learning":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Flag className="w-4 h-4" />
      case "low":
        return <Circle className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  const isDueToday = (dueDate) => {
    return new Date(dueDate).toDateString() === new Date().toDateString()
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed) ||
      (filter === "high" && todo.priority === "high") ||
      (filter === "overdue" && isOverdue(todo.dueDate) && !todo.completed)

    const matchesSearch =
      searchTerm === "" ||
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  // Statistics
  const totalTasks = todos.length
  const completedTasks = todos.filter((todo) => todo.completed).length
  const activeTasks = totalTasks - completedTasks
  const highPriorityTasks = todos.filter((todo) => todo.priority === "high" && !todo.completed).length
  const overdueTasks = todos.filter((todo) => isOverdue(todo.dueDate) && !todo.completed).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Todo List
          </h1>
          <p className="text-muted-foreground text-lg mt-2">Organize and track your tasks efficiently</p>
        </div>
        <AddTaskModal onAddTask={handleAddTask} />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-foreground">{highPriorityTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
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
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            Tasks ({filteredTodos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">No tasks found</p>
                <p className="text-muted-foreground/60">
                  {filter === "all" ? "Add a new task to get started" : "Try adjusting your filters"}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                    todo.completed
                      ? "bg-muted/30 border-border opacity-75"
                      : isOverdue(todo.dueDate)
                        ? "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                        : isDueToday(todo.dueDate)
                          ? "bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                          : "bg-card border-border hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg ${
                              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p
                              className={`text-sm mt-1 ${
                                todo.completed ? "text-muted-foreground/60" : "text-muted-foreground"
                              }`}
                            >
                              {todo.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`${getPriorityColor(todo.priority)} border`}>
                          {getPriorityIcon(todo.priority)}
                          <span className="ml-1 capitalize">{todo.priority}</span>
                        </Badge>

                        <Badge className={`${getCategoryColor(todo.category)} border`}>
                          <span className="capitalize">{todo.category}</span>
                        </Badge>

                        {todo.dueDate && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span
                              className={
                                isOverdue(todo.dueDate) && !todo.completed
                                  ? "text-red-600 dark:text-red-400 font-medium"
                                  : isDueToday(todo.dueDate)
                                    ? "text-yellow-600 dark:text-yellow-400 font-medium"
                                    : ""
                              }
                            >
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                            {isOverdue(todo.dueDate) && !todo.completed && (
                              <Badge className="bg-red-500/20 text-red-600 border-red-500/30 ml-2">Overdue</Badge>
                            )}
                            {isDueToday(todo.dueDate) && !todo.completed && (
                              <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30 ml-2">
                                Due Today
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {todo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {todo.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {overdueTasks > 0 && (
        <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-400">Attention Needed</h3>
                <p className="text-red-600 dark:text-red-500">
                  You have {overdueTasks} overdue task{overdueTasks > 1 ? "s" : ""} that need immediate attention.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TodoPage
