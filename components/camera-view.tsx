"use client"

import { useRef, useEffect, useState } from "react"
import { Camera, CameraOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setIsStreaming(true)
        setError(null)
      }
    } catch (err) {
      setError("カメラへのアクセスが拒否されました")
      console.error("Camera error:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="w-full max-w-md">
      <div className="aspect-square bg-muted rounded-xl overflow-hidden relative border border-border">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
        />

        {!isStreaming && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
            {error ? (
              <>
                <CameraOff className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">{error}</p>
              </>
            ) : (
              <>
                <Camera className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">カメラを起動して食堂の状況を確認</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={isStreaming ? stopCamera : startCamera}
          variant={isStreaming ? "destructive" : "default"}
          className="w-full max-w-xs"
        >
          {isStreaming ? (
            <>
              <CameraOff className="w-4 h-4 mr-2" />
              カメラを停止
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              カメラを起動
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
