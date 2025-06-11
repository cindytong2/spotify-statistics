"use client"

import { motion } from "framer-motion"
import { ExternalLink, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import NextImage from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function HiddenGems() {
  // Mock data - in a real app, this would come from the Spotify API
  const gems = [
    {
      id: 1,
      name: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      image: "/placeholder.svg?height=300&width=300&text=Album+1",
      reason: "From an artist you rarely listen to",
    },
    {
      id: 2,
      name: "Redbone",
      artist: "Childish Gambino",
      album: "Awaken, My Love!",
      image: "/placeholder.svg?height=300&width=300&text=Album+2",
      reason: "Deep cut from a favorite artist",
    },
    {
      id: 3,
      name: "Myth",
      artist: "Beach House",
      album: "Bloom",
      image: "/placeholder.svg?height=300&width=300&text=Album+3",
      reason: "Similar to your top genres",
    },
    {
      id: 4,
      name: "Taro",
      artist: "Alt-J",
      album: "An Awesome Wave",
      image: "/placeholder.svg?height=300&width=300&text=Album+4",
      reason: "Matches your listening patterns",
    },
    {
      id: 5,
      name: "Flashing Lights",
      artist: "Kanye West",
      album: "Graduation",
      image: "/placeholder.svg?height=300&width=300&text=Album+5",
      reason: "From an album you might have missed",
    },
  ]


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Hidden Gems</h3>
        <Button variant="outline" size="sm" className="border-zinc-700">
          Add All to Playlist
        </Button>
      </div>

      <Card className="bg-zinc-800/30 border-zinc-700 p-1">
        <CardContent className="p-0">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max p-4 gap-4">
              {gems.map((gem, index) => (
                <motion.div
                  key={gem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-[250px]"
                >
                  <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden">
                    <div className="aspect-square relative">
                      <div className="relative w-full h-full">
                        <NextImage
                          src={gem.image}
                          alt={`${gem.album} cover`}
                          fill
                          className="object-cover"
                          unoptimized={process.env.NODE_ENV !== 'production'}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90 h-12 w-12">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold line-clamp-1">{gem.name}</h4>
                      <p className="text-sm text-zinc-400 mb-3">{gem.artist}</p>
                      <div className="text-xs bg-zinc-700/50 text-zinc-300 p-2 rounded mb-3">{gem.reason}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="w-full border-zinc-700">
                          <ExternalLink className="h-3.5 w-3.5 mr-2" />
                          Listen
                        </Button>
                        <Button size="sm" variant="ghost" className="px-2">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-zinc-400 mb-4">These tracks are selected based on your listening history and preferences.</p>
        <Button variant="outline" className="border-zinc-700">
          Refresh Recommendations
        </Button>
      </div>
    </div>
  )
}
