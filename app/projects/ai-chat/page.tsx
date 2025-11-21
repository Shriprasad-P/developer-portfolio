"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles } from "lucide-react"

type Message = {
    id: number
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
    },
]

// Simulated responses based on keywords
const getSimulatedResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        return "Hi there! Ready to chat?"
    }
    if (lowerInput.includes("weather")) {
        return "I can't check the real weather, but it's always sunny in the digital world! ☀️"
    }
    if (lowerInput.includes("joke")) {
        return "Why did the developer go broke? Because he used up all his cache! 😄"
    }
    if (lowerInput.includes("react") || lowerInput.includes("code")) {
        return "React is a great library for building user interfaces. This chat is built with it!"
    }
    if (lowerInput.includes("help")) {
        return "I can help you with general questions, tell jokes, or just chat. Try asking me something!"
    }
    return "That's interesting! Tell me more about it."
}

export default function AIChatPage() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }, [messages, isTyping])

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim()) return

        const newUserMessage: Message = {
            id: Date.now(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newUserMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate network delay
        setTimeout(() => {
            const responseText = getSimulatedResponse(newUserMessage.content)
            const newAssistantMessage: Message = {
                id: Date.now() + 1,
                role: "assistant",
                content: responseText,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, newAssistantMessage])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)]">
            <Card className="h-full flex flex-col shadow-lg border-muted">
                <CardHeader className="border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>AI Assistant</CardTitle>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Online
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea ref={scrollAreaRef} className="h-full p-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <Avatar className="h-8 w-8">
                                        {message.role === "assistant" ? (
                                            <>
                                                <AvatarImage src="/bot-avatar.png" />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    <Bot className="h-4 w-4" />
                                                </AvatarFallback>
                                            </>
                                        ) : (
                                            <>
                                                <AvatarImage src="/user-avatar.png" />
                                                <AvatarFallback className="bg-muted">
                                                    <User className="h-4 w-4" />
                                                </AvatarFallback>
                                            </>
                                        )}
                                    </Avatar>

                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg text-sm ${message.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted rounded-tl-none"
                                            }`}
                                    >
                                        {message.content}
                                        <span className="text-[10px] opacity-50 block mt-1 text-right">
                                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Bot className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>

                <CardFooter className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                        <Input
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isTyping}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                            {isTyping ? <Sparkles className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
