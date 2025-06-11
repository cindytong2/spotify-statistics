"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export default function MoodBoard() {
  // Mock data - in a real app, this would come from the Spotify API analysis
  const moods = [
    { name: "Energetic", percentage: 35, color: "from-yellow-400 to-orange-500" },
    { name: "Happy", percentage: 25, color: "from-green-400 to-emerald-500" },
    { name: "Chill", percentage: 20, color: "from-blue-400 to-cyan-500" },
    { name: "Melancholic", percentage: 15, color: "from-purple-400 to-indigo-500" },
    { name: "Intense", percentage: 5, color: "from-red-400 to-pink-500" },
  ]

  const recentTracks = [
    {
      id: 1,
      name: "Don't Start Now",
      artist: "Dua Lipa",
      mood: "Energetic",
      image: "/placeholder.svg?height=300&width=300&text=Track+1",
    },
    {
      id: 2,
      name: "Blinding Lights",
      artist: "The Weeknd",
      mood: "Energetic",
      image: "/placeholder.svg?height=300&width=300&text=Track+2",
    },
    {
      id: 3,
      name: "Watermelon Sugar",
      artist: "Harry Styles",
      mood: "Happy",
      image: "/placeholder.svg?height=300&width=300&text=Track+3",
    },
    {
      id: 4,
      name: "Levitating",
      artist: "Dua Lipa",
      mood: "Energetic",
      image: "/placeholder.svg?height=300&width=300&text=Track+4",
    },
    {
      id: 5,
      name: "drivers license",
      artist: "Olivia Rodrigo",
      mood: "Melancholic",
      image: "/placeholder.svg?height=300&width=300&text=Track+5",
    },
    {
      id: 6,
      name: "good 4 u",
      artist: "Olivia Rodrigo",
      mood: "Intense",
      image: "/placeholder.svg?height=300&width=300&text=Track+6",
    },
    {
      id: 7,
      name: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      mood: "Chill",
      image: "/placeholder.svg?height=300&width=300&text=Track+7",
    },
    {
      id: 8,
      name: "Peaches",
      artist: "Justin Bieber",
      mood: "Happy",
      image: "/placeholder.svg?height=300&width=300&text=Track+8",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold">Your Listening Mood</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Based on audio features like energy, valence, and danceability from your listening history.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-zinc-800/30 border-zinc-700">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Mood Distribution</h4>
            <div className="space-y-4">
              {moods.map((mood, index) => (
                <motion.div
                  key={mood.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span>{mood.name}</span>
                    <span>{mood.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${mood.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${mood.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-700">
              <h4 className="text-lg font-semibold mb-2">Your Mood Summary</h4>
              <p className="text-zinc-400">
                Your listening habits show you prefer energetic and upbeat music, with a good mix of happy and chill
                tracks. You occasionally explore melancholic and intense sounds.
              </p>
            </div>
          </CardContent>
        </Card>

        <div>
          <h4 className="text-lg font-semibold mb-4">Recent Tracks by Mood</h4>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {recentTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-zinc-800/30 border-zinc-700 overflow-hidden h-full">
                  <div className="aspect-square relative">
                    <Image
                      src={track.image || "/placeholder.svg"}
                      alt={`${track.name} cover`}
                      fill
                      className="object-cover"
                      unoptimized={process.env.NODE_ENV !== 'production'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                      <div className="text-xs font-medium bg-green-500/90 text-white rounded-full px-2 py-0.5 w-fit mb-1">
                        {track.mood}
                      </div>
                      <h5 className="font-medium text-sm line-clamp-1">{track.name}</h5>
                      <p className="text-xs text-zinc-300 line-clamp-1">{track.artist}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
