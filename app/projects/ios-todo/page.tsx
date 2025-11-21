"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, ChevronLeft, Calendar, Clock, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

// Types
type Task = {
    id: string
    title: string
    category: "Personal" | "Work" | "Shopping" | "Health"
    completed: boolean
    time: string
}

const CATEGORIES = ["Personal", "Work", "Shopping", "Health"] as const

export default function IosTodoApp() {
    // State
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Morning Run", category: "Health", completed: true, time: "07:00 AM" },
        { id: "2", title: "Team Meeting", category: "Work", completed: false, time: "10:00 AM" },
        { id: "3", title: "Buy Groceries", category: "Shopping", completed: false, time: "05:30 PM" },
        { id: "4", title: "Read Book", category: "Personal", completed: false, time: "09:00 PM" },
    ])
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("Personal")
    const [currentTime, setCurrentTime] = useState("")

    // Clock effect
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    // Handlers
    const addTask = () => {
        if (!newTaskTitle.trim()) return
        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            category: selectedCategory,
            completed: false,
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        }
        setTasks([...tasks, newTask])
        setNewTaskTitle("")
        setIsSheetOpen(false)
    }

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    // --- Components ---

    const StatusBar = () => (
        <div className="flex justify-between items-center px-6 pt-3 pb-2 text-white text-xs font-medium z-20 relative">
            <span>{currentTime}</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[120px] h-[35px] bg-black rounded-full flex items-center justify-center">
                {/* Dynamic Island Content */}
                <div className="w-20 h-full flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
                    <span className="text-[10px] text-zinc-500">Focus</span>
                </div>
            </div>
            <div className="flex gap-1.5">
                <div className="w-4 h-2.5 bg-white rounded-[2px]" /> {/* Signal */}
                <div className="w-4 h-2.5 bg-white rounded-[2px]" /> {/* Wifi */}
                <div className="w-6 h-2.5 border border-white/30 rounded-[4px] relative">
                    <div className="absolute inset-0.5 bg-white rounded-[1px]" />
                </div> {/* Battery */}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans">
            <Link href="/" className="fixed top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                <ChevronLeft size={20} /> Back to Portfolio
            </Link>

            {/* iPhone Frame */}
            <div className="relative w-[380px] h-[800px] bg-black rounded-[55px] shadow-2xl border-[8px] border-zinc-800 overflow-hidden ring-1 ring-white/10">

                {/* Screen Content */}
                <div className="w-full h-full bg-zinc-900 text-white overflow-hidden flex flex-col relative">
                    <StatusBar />

                    {/* Header */}
                    <div className="pt-14 px-5 pb-4">
                        <div className="flex justify-between items-end mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">Today</h1>
                            <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-blue-500">
                                <Calendar size={18} />
                            </button>
                        </div>
                        <p className="text-zinc-400 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>

                    {/* Task List */}
                    <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3 no-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative overflow-hidden"
                                >
                                    {/* Swipe Action Background (Visual only for demo) */}
                                    <div className="absolute inset-0 bg-red-500 rounded-2xl flex items-center justify-end px-4">
                                        <Trash2 className="text-white" size={20} />
                                    </div>

                                    <motion.div
                                        className="relative bg-zinc-800/80 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 z-10"
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x < -100) deleteTask(task.id)
                                        }}
                                    >
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`flex-shrink-0 transition-colors ${task.completed ? 'text-blue-500' : 'text-zinc-500'}`}
                                        >
                                            {task.completed ? <CheckCircle2 size={24} className="fill-current" /> : <Circle size={24} />}
                                        </button>

                                        <div className="flex-1">
                                            <h3 className={`font-medium text-lg transition-all ${task.completed ? 'text-zinc-500 line-through' : 'text-white'}`}>
                                                {task.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${task.category === 'Work' ? 'bg-purple-500/20 text-purple-400' :
                                                        task.category === 'Personal' ? 'bg-blue-500/20 text-blue-400' :
                                                            task.category === 'Shopping' ? 'bg-orange-500/20 text-orange-400' :
                                                                'bg-green-500/20 text-green-400'
                                                    }`}>
                                                    {task.category}
                                                </span>
                                                <span className="text-xs text-zinc-500 flex items-center gap-1">
                                                    <Clock size={10} /> {task.time}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {tasks.length === 0 && (
                            <div className="text-center py-20 text-zinc-600">
                                <p>No tasks for today</p>
                                <p className="text-sm">Enjoy your free time!</p>
                            </div>
                        )}
                    </div>

                    {/* Floating Action Button */}
                    <div className="absolute bottom-8 right-6 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSheetOpen(true)}
                            className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
                        >
                            <Plus size={28} strokeWidth={2.5} />
                        </motion.button>
                    </div>

                    {/* Bottom Sheet Modal */}
                    <AnimatePresence>
                        {isSheetOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsSheetOpen(false)}
                                    className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30"
                                />
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="absolute bottom-0 left-0 right-0 bg-zinc-800 rounded-t-[30px] p-6 z-40 pb-10"
                                >
                                    <div className="w-12 h-1.5 bg-zinc-600 rounded-full mx-auto mb-6 opacity-50" />

                                    <h2 className="text-xl font-bold mb-4">New Task</h2>

                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="What needs to be done?"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                                        className="w-full bg-zinc-700/50 text-white p-4 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-zinc-500"
                                    />

                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === cat
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={addTask}
                                        className="w-full bg-white text-black font-bold py-4 rounded-xl active:scale-[0.98] transition-transform"
                                    >
                                        Add Task
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full opacity-40" />
                </div>
            </div>
        </div>
    )
}
