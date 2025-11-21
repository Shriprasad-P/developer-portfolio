"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type AlgorithmType = "bubble" | "selection" | "insertion" | "merge" | "quick" | "radix" | "bucket"

const ALGORITHMS: { type: AlgorithmType; label: string }[] = [
    { type: "bubble", label: "Bubble Sort" },
    { type: "selection", label: "Selection Sort" },
    { type: "insertion", label: "Insertion Sort" },
    { type: "merge", label: "Merge Sort" },
    { type: "quick", label: "Quick Sort" },
    { type: "radix", label: "Radix Sort" },
    { type: "bucket", label: "Bucket Sort" },
]

export default function AlgorithmVisualizer() {
    const [array, setArray] = useState<number[]>([])
    const [currentAlgoIndex, setCurrentAlgoIndex] = useState(0)
    const [comparisons, setComparisons] = useState(0)
    const [swaps, setSwaps] = useState(0)
    const [activeIndices, setActiveIndices] = useState<number[]>([])
    const [sortedIndices, setSortedIndices] = useState<number[]>([])
    const [status, setStatus] = useState("Initializing...")

    // Refs for mutable state during async sorting
    const stopSorting = useRef(false)
    const isSorting = useRef(false)

    useEffect(() => {
        let mounted = true

        const runLoop = async () => {
            while (mounted) {
                for (let i = 0; i < ALGORITHMS.length; i++) {
                    if (!mounted) return
                    setCurrentAlgoIndex(i)
                    setStatus(`Running ${ALGORITHMS[i].label}...`)

                    // Reset
                    stopSorting.current = false
                    const newArray = Array.from({ length: 40 }, () => Math.floor(Math.random() * 100) + 5)
                    setArray(newArray)
                    setComparisons(0)
                    setSwaps(0)
                    setActiveIndices([])
                    setSortedIndices([])

                    await sleep(1000) // Pause before start

                    if (!mounted) return

                    // Sort
                    isSorting.current = true
                    const delay = 30 // Fixed speed

                    switch (ALGORITHMS[i].type) {
                        case "bubble": await bubbleSort(newArray, delay); break
                        case "selection": await selectionSort(newArray, delay); break
                        case "insertion": await insertionSort(newArray, delay); break
                        case "merge": await mergeSortWrapper(newArray, delay); break
                        case "quick": await quickSortWrapper(newArray, delay); break
                        case "radix": await radixSort(newArray, delay); break
                        case "bucket": await bucketSort(newArray, delay); break
                    }

                    isSorting.current = false
                    setActiveIndices([])
                    if (!stopSorting.current) {
                        setSortedIndices(Array.from({ length: newArray.length }, (_, k) => k))
                    }
                    setStatus(`${ALGORITHMS[i].label} Completed`)

                    await sleep(2000) // Pause after completion
                }
            }
        }

        runLoop()

        return () => {
            mounted = false
            stopSorting.current = true
        }
    }, [])

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    // --- Sorting Algorithms ---

    const bubbleSort = async (arr: number[], delay: number) => {
        const n = arr.length
        const localArr = [...arr]

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (stopSorting.current) return
                setActiveIndices([j, j + 1])
                setComparisons((prev) => prev + 1)

                if (localArr[j] > localArr[j + 1]) {
                    const temp = localArr[j]
                    localArr[j] = localArr[j + 1]
                    localArr[j + 1] = temp
                    setArray([...localArr])
                    setSwaps((prev) => prev + 1)
                }
                await sleep(delay)
            }
            if (!stopSorting.current) {
                setSortedIndices((prev) => [...prev, n - 1 - i])
            }
        }
        if (!stopSorting.current) {
            setSortedIndices((prev) => [...prev, 0])
        }
    }

    const selectionSort = async (arr: number[], delay: number) => {
        const n = arr.length
        const localArr = [...arr]

        for (let i = 0; i < n; i++) {
            let minIdx = i
            for (let j = i + 1; j < n; j++) {
                if (stopSorting.current) return
                setActiveIndices([minIdx, j])
                setComparisons((prev) => prev + 1)

                if (localArr[j] < localArr[minIdx]) {
                    minIdx = j
                }
                await sleep(delay)
            }

            if (minIdx !== i) {
                const temp = localArr[i]
                localArr[i] = localArr[minIdx]
                localArr[minIdx] = temp
                setArray([...localArr])
                setSwaps((prev) => prev + 1)
            }
            if (!stopSorting.current) {
                setSortedIndices((prev) => [...prev, i])
            }
        }
    }

    const insertionSort = async (arr: number[], delay: number) => {
        const n = arr.length
        const localArr = [...arr]

        for (let i = 1; i < n; i++) {
            let key = localArr[i]
            let j = i - 1

            while (j >= 0 && localArr[j] > key) {
                if (stopSorting.current) return
                setActiveIndices([j, j + 1])
                setComparisons((prev) => prev + 1)

                localArr[j + 1] = localArr[j]
                setArray([...localArr])
                setSwaps((prev) => prev + 1)
                await sleep(delay)
                j = j - 1
            }
            localArr[j + 1] = key
            setArray([...localArr])
        }
    }

    const mergeSortWrapper = async (arr: number[], delay: number) => {
        const localArr = [...arr]
        await mergeSort(localArr, 0, localArr.length - 1, delay)
        setArray([...localArr])
    }

    const mergeSort = async (arr: number[], l: number, r: number, delay: number) => {
        if (l >= r) return
        if (stopSorting.current) return

        const m = l + Math.floor((r - l) / 2)
        await mergeSort(arr, l, m, delay)
        await mergeSort(arr, m + 1, r, delay)
        await merge(arr, l, m, r, delay)
    }

    const merge = async (arr: number[], l: number, m: number, r: number, delay: number) => {
        const n1 = m - l + 1
        const n2 = r - m
        const L = new Array(n1)
        const R = new Array(n2)

        for (let i = 0; i < n1; i++) L[i] = arr[l + i]
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j]

        let i = 0, j = 0, k = l

        while (i < n1 && j < n2) {
            if (stopSorting.current) return
            setActiveIndices([l + i, m + 1 + j])
            setComparisons((prev) => prev + 1)

            if (L[i] <= R[j]) {
                arr[k] = L[i]
                i++
            } else {
                arr[k] = R[j]
                j++
            }
            setArray([...arr])
            setSwaps((prev) => prev + 1)
            await sleep(delay)
            k++
        }

        while (i < n1) {
            if (stopSorting.current) return
            arr[k] = L[i]
            setArray([...arr])
            await sleep(delay)
            i++
            k++
        }

        while (j < n2) {
            if (stopSorting.current) return
            arr[k] = R[j]
            setArray([...arr])
            await sleep(delay)
            j++
            k++
        }
    }

    const quickSortWrapper = async (arr: number[], delay: number) => {
        const localArr = [...arr]
        await quickSort(localArr, 0, localArr.length - 1, delay)
        setArray([...localArr])
    }

    const quickSort = async (arr: number[], low: number, high: number, delay: number) => {
        if (low < high) {
            if (stopSorting.current) return
            const pi = await partition(arr, low, high, delay)
            if (stopSorting.current) return
            await quickSort(arr, low, pi - 1, delay)
            if (stopSorting.current) return
            await quickSort(arr, pi + 1, high, delay)
        }
    }

    const partition = async (arr: number[], low: number, high: number, delay: number) => {
        const pivot = arr[high]
        let i = low - 1

        for (let j = low; j < high; j++) {
            if (stopSorting.current) return -1
            setActiveIndices([j, high])
            setComparisons((prev) => prev + 1)

            if (arr[j] < pivot) {
                i++
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
                setArray([...arr])
                setSwaps((prev) => prev + 1)
                await sleep(delay)
            }
        }
        if (stopSorting.current) return -1

        const temp = arr[i + 1]
        arr[i + 1] = arr[high]
        arr[high] = temp
        setArray([...arr])
        setSwaps((prev) => prev + 1)
        await sleep(delay)

        return i + 1
    }

    const radixSort = async (arr: number[], delay: number) => {
        const localArr = [...arr]
        const max = Math.max(...localArr)
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            if (stopSorting.current) return
            await countSort(localArr, exp, delay)
        }
        setArray([...localArr])
    }

    const countSort = async (arr: number[], exp: number, delay: number) => {
        const n = arr.length
        const output = new Array(n).fill(0)
        const count = new Array(10).fill(0)

        for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++
        for (let i = 1; i < 10; i++) count[i] += count[i - 1]

        for (let i = n - 1; i >= 0; i--) {
            if (stopSorting.current) return
            setActiveIndices([i])
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i]
            count[Math.floor(arr[i] / exp) % 10]--
        }

        for (let i = 0; i < n; i++) {
            if (stopSorting.current) return
            arr[i] = output[i]
            setArray([...arr])
            setSwaps((prev) => prev + 1)
            await sleep(delay)
        }
    }

    const bucketSort = async (arr: number[], delay: number) => {
        const localArr = [...arr]
        if (localArr.length <= 0) return
        const n = localArr.length
        const maxVal = Math.max(...localArr)
        const minVal = Math.min(...localArr)

        const bucketCount = Math.floor(Math.sqrt(n))
        const buckets: number[][] = Array.from({ length: bucketCount }, () => [])

        for (let i = 0; i < n; i++) {
            if (stopSorting.current) return
            setActiveIndices([i])
            const bucketIndex = Math.floor(((localArr[i] - minVal) / (maxVal - minVal + 1)) * bucketCount)
            buckets[bucketIndex].push(localArr[i])
            await sleep(delay / 2)
        }

        let k = 0
        for (let i = 0; i < buckets.length; i++) {
            buckets[i].sort((a, b) => {
                setComparisons(prev => prev + 1)
                return a - b
            })

            for (let j = 0; j < buckets[i].length; j++) {
                if (stopSorting.current) return
                localArr[k] = buckets[i][j]
                setActiveIndices([k])
                setArray([...localArr])
                setSwaps(prev => prev + 1)
                await sleep(delay)
                k++
            }
        }
        setArray([...localArr])
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Algorithm Visualizer</h1>
                    <p className="text-muted-foreground">
                        Watch how different sorting algorithms process data in real-time.
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center mb-8 space-y-4">
                            <Badge variant="outline" className="text-lg px-4 py-1">
                                {status}
                            </Badge>
                            <div className="flex gap-2 flex-wrap justify-center">
                                {ALGORITHMS.map((algo, idx) => (
                                    <Badge
                                        key={algo.type}
                                        variant={currentAlgoIndex === idx ? "default" : "secondary"}
                                        className="text-xs"
                                    >
                                        {algo.label}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-end justify-center gap-[2px] h-[300px] bg-muted/20 rounded-lg p-4 mb-4">
                            {array.map((value, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    className={`flex-1 rounded-t-sm ${activeIndices.includes(index)
                                            ? "bg-primary"
                                            : sortedIndices.includes(index)
                                                ? "bg-green-500"
                                                : "bg-primary/60"
                                        }`}
                                    style={{ height: `${value}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                            <div>
                                Comparisons: <span className="font-medium text-foreground">{comparisons}</span>
                            </div>
                            <div>
                                Swaps/Writes: <span className="font-medium text-foreground">{swaps}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Time Complexity</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Best Case:</span>
                                    <span className="font-mono">
                                        {ALGORITHMS[currentAlgoIndex].type === "bubble" || ALGORITHMS[currentAlgoIndex].type === "insertion" ? "O(n)" :
                                            ALGORITHMS[currentAlgoIndex].type === "quick" || ALGORITHMS[currentAlgoIndex].type === "merge" || ALGORITHMS[currentAlgoIndex].type === "bucket" ? "O(n log n)" :
                                                ALGORITHMS[currentAlgoIndex].type === "radix" ? "O(nk)" : "O(n²)"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Average Case:</span>
                                    <span className="font-mono">
                                        {ALGORITHMS[currentAlgoIndex].type === "quick" || ALGORITHMS[currentAlgoIndex].type === "merge" || ALGORITHMS[currentAlgoIndex].type === "bucket" ? "O(n log n)" :
                                            ALGORITHMS[currentAlgoIndex].type === "radix" ? "O(nk)" : "O(n²)"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Worst Case:</span>
                                    <span className="font-mono">
                                        {ALGORITHMS[currentAlgoIndex].type === "merge" ? "O(n log n)" :
                                            ALGORITHMS[currentAlgoIndex].type === "radix" ? "O(nk)" : "O(n²)"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Algorithm Details</h3>
                            <p className="text-sm text-muted-foreground">
                                {ALGORITHMS[currentAlgoIndex].type === "bubble" && "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."}
                                {ALGORITHMS[currentAlgoIndex].type === "selection" && "Divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list."}
                                {ALGORITHMS[currentAlgoIndex].type === "insertion" && "Builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort."}
                                {ALGORITHMS[currentAlgoIndex].type === "merge" && "Divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves."}
                                {ALGORITHMS[currentAlgoIndex].type === "quick" && "Divide and conquer algorithm that picks an element as pivot and partitions the given array around the picked pivot."}
                                {ALGORITHMS[currentAlgoIndex].type === "radix" && "Non-comparative sorting algorithm that avoids comparison by creating and distributing elements into buckets according to their radix."}
                                {ALGORITHMS[currentAlgoIndex].type === "bucket" && "Distribution sort algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually."}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
