"use client"

import { useMemo } from "react"

interface SeatLayoutProps {
  floor: number
}

// Generate seat layouts for each floor
const generateSeats = (floor: number) => {
  const layouts: Record<number, { rows: number; cols: number; totalSeats: number }> = {
    1: { rows: 5, cols: 6, totalSeats: 30 },
    2: { rows: 4, cols: 5, totalSeats: 20 },
    3: { rows: 3, cols: 4, totalSeats: 12 },
  }

  const layout = layouts[floor] || layouts[1]
  const seats: { id: number; occupied: boolean }[] = []

  for (let i = 0; i < layout.totalSeats; i++) {
    seats.push({
      id: i + 1,
      // Random occupancy (roughly 40-60% occupied)
      occupied: Math.random() > 0.5,
    })
  }

  return { ...layout, seats }
}

export function SeatLayout({ floor }: SeatLayoutProps) {
  const layout = useMemo(() => generateSeats(floor), [floor])

  const gridCols =
    {
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[layout.cols] || "grid-cols-6"

  const occupiedCount = layout.seats.filter((s) => s.occupied).length
  const emptyCount = layout.seats.length - occupiedCount

  return (
    <div className="space-y-4">
      {/* Floor Info */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">総座席数</span>
          <span className="font-semibold text-foreground">{layout.totalSeats}席</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">空席</span>
          <span className="font-semibold text-green-600">{emptyCount}席</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">使用中</span>
          <span className="font-semibold text-primary">{occupiedCount}席</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <div className={`grid ${gridCols} gap-2 md:gap-3`}>
          {layout.seats.map((seat) => (
            <div
              key={seat.id}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-xs md:text-sm font-medium
                transition-colors duration-200
                ${
                  seat.occupied
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent border-2 border-primary text-primary"
                }
              `}
            >
              {seat.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
