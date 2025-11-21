"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, ArrowRight, ArrowLeft, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TaskStatus = "todo" | "in-progress" | "done"

type Task = {
    id: number
    title: string
    status: TaskStatus
    priority: "low" | "medium" | "high"
}

const INITIAL_TASKS: Task[] = [
    { id: 1, title: "Design System", status: "todo", priority: "high" },
    { id: 2, title: "User Authentication", status: "in-progress", priority: "high" },
    { id: 3, title: "API Integration", status: "todo", priority: "medium" },
    { id: 4, title: "Unit Tests", status: "done", priority: "low" },
    { id: 5, title: "Documentation", status: "in-progress", priority: "medium" },
]

const COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
]

export default function TaskManagementPage() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const addTask = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTaskTitle.trim()) return

        const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            status: "todo",
            priority: "medium",
        }

        setTasks((prev) => [...prev, newTask])
        setNewTaskTitle("")
    }

    const moveTask = (id: number, direction: "left" | "right") => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id === id) {
                    const currentIndex = COLUMNS.findIndex((col) => col.id === task.status)
                    const newIndex = direction === "right" ? currentIndex + 1 : currentIndex - 1
                    if (newIndex >= 0 && newIndex < COLUMNS.length) {
                        return { ...task, status: COLUMNS[newIndex].id }
                    }
                }
                return task
            }),
        )
    }

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    const getPriorityColor = (priority: Task["priority"]) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            case "medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
            case "low":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
        }
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Task Board</h1>
                    <p className="text-muted-foreground">Manage your project tasks.</p>
                </div>

                <form onSubmit={addTask} className="flex gap-2">
                    <Input
                        placeholder="New task..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-64"
                    />
                    <Button type="submit">
                        <Plus className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                </form>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                {COLUMNS.map((column) => (
                    <div key={column.id} className="flex flex-col h-full bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">{column.title}</h3>
                            <Badge variant="secondary">
                                {tasks.filter((t) => t.status === column.id).length}
                            </Badge>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {tasks
                                .filter((task) => task.status === column.id)
                                .map((task) => (
                                    <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="outline" className={`border-0 ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </Badge>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="text-destructive" onClick={() => deleteTask(task.id)}>
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <p className="font-medium mb-4">{task.title}</p>

                                            <div className="flex justify-between items-center">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={column.id === "todo"}
                                                    onClick={() => moveTask(task.id, "left")}
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={column.id === "done"}
                                                    onClick={() => moveTask(task.id, "right")}
                                                >
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
