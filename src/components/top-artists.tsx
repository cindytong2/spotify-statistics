"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function TopArtists() {
  const [timeRange, setTimeRange] = useState("short_term")

  // Mock data - in a real app, this would come from the Spotify API
  const artists = [
    {
      id: 1,
      name: "Taylor Swift",
      genres: ["pop", "country pop"],
      image: "/placeholder.svg?height=300&width=300&text=Artist+1",
    },
    {
      id: 2,
      name: "The Weeknd",
      genres: ["r&b", "pop"],
      image: "/placeholder.svg?height=300&width=300&text=Artist+2",
    },
    {
      id: 3,
      name: "Kendrick Lamar",
      genres: ["hip hop", "rap"],
      image: "/placeholder.svg?height=300&width=300&text=Artist+3",
    },
    {
      id: 4,
      name: "Dua Lipa",
      genres: ["pop", "dance pop"],
      image: "/placeholder.svg?height=300&width=300&text=Artist+4",
    },
    {
      id: 5,
      name: "Arctic Monkeys",
      genres: ["indie rock", "rock"],
      image: "/placeholder.svg?height=300&width=300&text=Artist+5",
    },
    {
      id: 6,
      name: "Bad Bunny",
      genres: ["reggaeton", "latin trap"],
      image: "/placeholder.svg?height=300&width=300&text=Artist+6",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Your Top Artists</h3>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
          <TabsList className="bg-zinc-800/50">
            <TabsTrigger value="short_term">4 Weeks</TabsTrigger>
            <TabsTrigger value="medium_term">6 Months</TabsTrigger>
            <TabsTrigger value="long_term">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-zinc-800/30 border-zinc-700 overflow-hidden h-full">
              <div className="aspect-square relative">
                <Image
                  src={artist.image || "/placeholder.svg"}
                  alt={`${artist.name} profile`}
                  fill
                  className="object-cover"
                  unoptimized={process.env.NODE_ENV !== 'production'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <div className="text-xs font-medium bg-green-500/90 text-white rounded-full px-2 py-1 w-fit mb-2">
                    #{index + 1}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-bold text-lg mb-1">{artist.name}</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {artist.genres.map((genre) => (
                    <span key={genre} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full border-zinc-700">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  View on Spotify
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
