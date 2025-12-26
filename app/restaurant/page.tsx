"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CameraView } from "@/components/camera-view"
import { FoodCounter } from "@/components/food-counter"

export default function RestaurantPage() {
  const router = useRouter()
  const [notificationEnabled, setNotificationEnabled] = useState(false)

  // Food counters state
  const [okazuCount, setOkazuCount] = useState(0)
  const [donCount, setDonCount] = useState(0)
  const [menCount, setMenCount] = useState(0)

  // Random increment intervals for each counter
  useEffect(() => {
    const incrementCounter = (setter: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => {
      setter((prev) => {
        if (prev >= maxValue) return maxValue
        return prev + 1
      })
    }

    // Random intervals between 1-5 seconds for each counter
    const getRandomInterval = () => Math.random() * 4000 + 1000

    let okazuTimeout: NodeJS.Timeout
    let donTimeout: NodeJS.Timeout
    let menTimeout: NodeJS.Timeout

    const scheduleOkazu = () => {
      okazuTimeout = setTimeout(() => {
        incrementCounter(setOkazuCount, 333)
        scheduleOkazu()
      }, getRandomInterval())
    }

    const scheduleDon = () => {
      donTimeout = setTimeout(() => {
        incrementCounter(setDonCount, 333)
        scheduleDon()
      }, getRandomInterval())
    }

    const scheduleMen = () => {
      menTimeout = setTimeout(() => {
        incrementCounter(setMenCount, 333)
        scheduleMen()
      }, getRandomInterval())
    }

    scheduleOkazu()
    scheduleDon()
    scheduleMen()

    return () => {
      clearTimeout(okazuTimeout)
      clearTimeout(donTimeout)
      clearTimeout(menTimeout)
    }
  }, [])

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
          <span className="sr-only">戻る</span>
        </Button>

        <h1 className="text-lg font-semibold text-foreground">食堂の状況</h1>

        <div className="flex items-center gap-2">
          {notificationEnabled ? (
            <Bell className="w-4 h-4 text-primary" />
          ) : (
            <BellOff className="w-4 h-4 text-muted-foreground" />
          )}
          <Switch
            checked={notificationEnabled}
            onCheckedChange={setNotificationEnabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center gap-6">
        {/* Camera View */}
        <CameraView />

        {/* Food Counters */}
        <div className="w-full max-w-md space-y-3">
          <FoodCounter label="当日のおかず類の利用者数" count={okazuCount} maxCount={333} />
          <FoodCounter label="当日の丼類の利用者数" count={donCount} maxCount={333} />
          <FoodCounter label="当日の麺類の利用者数" count={menCount} maxCount={333} />
        </div>
      </main>
    </div>
  )
}
