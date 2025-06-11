"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Heart, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function TopTracks() {
  const [timeRange, setTimeRange] = useState("short_term")

  // Mock data - in a real app, this would come from the Spotify API
  const tracks = [
    {
      id: 1,
      name: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      duration: "2:47",
      image: "/placeholder.svg?height=300&width=300&text=Album+1",
    },
    {
      id: 2,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      image: "/placeholder.svg?height=300&width=300&text=Album+2",
    },
    {
      id: 3,
      name: "Bad Habit",
      artist: "Steve Lacy",
      album: "Gemini Rights",
      duration: "3:52",
      image: "/placeholder.svg?height=300&width=300&text=Album+3",
    },
    {
      id: 4,
      name: "Running Up That Hill",
      artist: "Kate Bush",
      album: "Hounds of Love",
      duration: "4:58",
      image: "/placeholder.svg?height=300&width=300&text=Album+4",
    },
    {
      id: 5,
      name: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      duration: "3:59",
      image: "/placeholder.svg?height=300&width=300&text=Album+5",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Your Top Tracks</h3>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
          <TabsList className="bg-zinc-800/50">
            <TabsTrigger value="short_term">4 Weeks</TabsTrigger>
            <TabsTrigger value="medium_term">6 Months</TabsTrigger>
            <TabsTrigger value="long_term">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-zinc-800/30 border-zinc-700 overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={tracks[0].image || "/placeholder.svg"}
              alt={`${tracks[0].album} cover`}
              fill
              className="object-cover"
              unoptimized={process.env.NODE_ENV !== 'production'}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h4 className="text-3xl font-bold mb-1">{tracks[0].name}</h4>
              <p className="text-xl text-zinc-300">{tracks[0].artist}</p>
              <p className="text-zinc-400 mb-4">Your #1 most played track</p>
              <div className="flex gap-3">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
                <Button size="sm" variant="outline" className="border-zinc-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Spotify
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
          {tracks.slice(1).map((track, index) => (
            <motion.div key={track.id} variants={item}>
              <Card className="bg-zinc-800/30 border-zinc-700">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 relative w-12 h-12">
                      <Image
                        src={track.image || "/placeholder.svg"}
                        alt={`${track.album} cover`}
                        fill
                        className="object-cover rounded"
                        unoptimized={process.env.NODE_ENV !== 'production'}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
                        <Play className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{track.name}</div>
                      <div className="text-sm text-zinc-400 truncate">{track.artist}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <div className="text-sm text-zinc-400">{track.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
