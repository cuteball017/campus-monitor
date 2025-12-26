"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SeatLayout } from "@/components/seat-layout"

const floors = [
  { id: 1, label: "1階" },
  { id: 2, label: "2階" },
  { id: 3, label: "3階" },
]

export default function SharedSpacePage() {
  const router = useRouter()
  const [selectedFloor, setSelectedFloor] = useState(1)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          className="text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">メインへ戻る</span>
        </Button>

        <h1 className="text-lg font-semibold text-foreground">共有スペース</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1 bg-transparent">
              {floors.find((f) => f.id === selectedFloor)?.label}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {floors.map((floor) => (
              <DropdownMenuItem
                key={floor.id}
                onClick={() => setSelectedFloor(floor.id)}
                className={selectedFloor === floor.id ? "bg-secondary" : ""}
              >
                {floor.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary bg-transparent" />
              <span className="text-sm text-muted-foreground">空席</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-sm text-muted-foreground">使用中</span>
            </div>
          </div>

          {/* Seat Layout */}
          <SeatLayout floor={selectedFloor} />
        </div>
      </main>
    </div>
  )
}
