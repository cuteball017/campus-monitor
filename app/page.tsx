"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UtensilsCrossed, Users, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // 페이지 로드 시 팝업 표시
    setShowNotice(true)
  }, [])

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {showNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary-foreground" />
                <h2 className="text-lg font-bold text-primary-foreground">お知らせ</h2>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground text-center">
                冬休み期間中の共有スペース利用制限
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold text-primary">2025年12月26日</span>から
                  <span className="font-semibold text-primary">2026年1月5日</span>までは、
                  キャンパスの共有スペースの使用が制限されます。
                </p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                ご不便をおかけしますが、ご理解のほどよろしくお願いいたします。
              </p>
            </div>

            {/* Footer Button */}
            <div className="px-5 pb-5">
              <Button
                onClick={() => setShowNotice(false)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                確認しました
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">キャンパスモニター</h1>
          <p className="text-muted-foreground text-sm md:text-base">利用状況をリアルタイムで確認</p>
        </div>

        {/* Main Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/restaurant")}
            className="w-full h-24 md:h-28 text-lg md:text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8 mr-3" />
            食堂の状況確認
          </Button>

          <Button
            onClick={() => router.push("/shared-space")}
            variant="outline"
            className="w-full h-24 md:h-28 text-lg md:text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Users className="w-6 h-6 md:w-8 md:h-8 mr-3" />
            共有スペースの状況確認
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">© 2025 キャンパスモニター</p>
      </div>
    </main>
  )
}
