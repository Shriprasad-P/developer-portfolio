"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

// Mock Data
const PRODUCTS = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        image: "/images/wireless_headphones.png",
        category: "Electronics",
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 299.99,
        image: "/images/smart_watch_pro.png",
        category: "Electronics",
    },
    {
        id: 3,
        name: "Ergonomic Chair",
        price: 450.0,
        image: "/images/ergonomic_chair.jpg",
        category: "Furniture",
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        price: 129.5,
        image: "/images/mechanical_keyboard.jpg",
        category: "Accessories",
    },
    {
        id: 5,
        name: "4K Monitor",
        price: 350.0,
        image: "/images/4k_monitor.jpg",
        category: "Electronics",
    },
    {
        id: 6,
        name: "Laptop Stand",
        price: 49.99,
        image: "/images/laptop_stand.jpg",
        category: "Accessories",
    },
]

type CartItem = (typeof PRODUCTS)[0] & { quantity: number }

export default function ECommercePage() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const addToCart = (product: (typeof PRODUCTS)[0]) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setIsSheetOpen(true)
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta)
                    return { ...item, quantity: newQuantity }
                }
                return item
            }),
        )
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">E-Commerce Demo</h1>
                    <p className="text-muted-foreground">A mock store with cart functionality.</p>
                </div>

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="relative">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Cart
                            {totalItems > 0 && (
                                <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full">
                                    {totalItems}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
                        </SheetHeader>
                        <div className="flex-1 overflow-hidden py-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                    <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <ScrollArea className="h-full pr-4">
                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </div>
                        {cart.length > 0 && (
                            <div className="pt-4 border-t space-y-4">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <Button className="w-full" onClick={() => alert("This is a demo checkout!")}>
                                    Checkout
                                </Button>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <div className="relative aspect-square bg-muted">
                            <Image src={product.image} alt={product.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="secondary" className="mb-2">
                                        {product.category}
                                    </Badge>
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                </div>
                                <span className="font-bold text-lg">${product.price}</span>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full" onClick={() => addToCart(product)}>
                                <Plus className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
