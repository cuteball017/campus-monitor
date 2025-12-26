"use client"

interface FoodCounterProps {
  label: string
  count: number
  maxCount: number
}

export function FoodCounter({ label, count, maxCount }: FoodCounterProps) {
  const percentage = (count / maxCount) * 100

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-lg font-bold text-primary tabular-nums">
          {count.toLocaleString()}
          <span className="text-sm text-muted-foreground font-normal ml-1">/ {maxCount}</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}
