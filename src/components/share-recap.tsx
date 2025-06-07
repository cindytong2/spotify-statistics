"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ShareRecap() {
  const [template, setTemplate] = useState("spotify")

  return (
    <div>
      <Tabs value={template} onValueChange={setTemplate} className="w-full mb-6">
        <TabsList className="bg-zinc-800/50 w-full">
          <TabsTrigger value="spotify" className="flex-1">
            Spotify Style
          </TabsTrigger>
          <TabsTrigger value="receipt" className="flex-1">
            Receiptify
          </TabsTrigger>
          <TabsTrigger value="apple" className="flex-1">
            Apple Music
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md mx-auto"
        >
          {template === "spotify" && (
            <Card className="bg-gradient-to-br from-green-500 to-green-700 border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-white">2023 WRAPPED</h3>
                  <p className="text-white/80">Your year in music</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Top Artists</h4>
                  <ol className="list-decimal list-inside text-white">
                    <li>Taylor Swift</li>
                    <li>The Weeknd</li>
                    <li>Kendrick Lamar</li>
                    <li>Dua Lipa</li>
                    <li>Arctic Monkeys</li>
                  </ol>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Top Tracks</h4>
                  <ol className="list-decimal list-inside text-white">
                    <li>As It Was - Harry Styles</li>
                    <li>Blinding Lights - The Weeknd</li>
                    <li>Bad Habit - Steve Lacy</li>
                    <li>Running Up That Hill - Kate Bush</li>
                    <li>Heat Waves - Glass Animals</li>
                  </ol>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-1">35,429</div>
                    <div className="text-sm">Minutes Listened</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
                    Vibescape
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {template === "receipt" && (
            <Card className="bg-white text-black border-0">
              <CardContent className="p-6 font-mono">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold uppercase">Music Receipt</h3>
                  <p className="text-xs">Order #2023-06-06</p>
                  <div className="border-b border-dashed border-black my-2" />
                  <p className="text-xs">Customer: Music Lover</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-bold mb-2">TOP TRACKS:</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: "As It Was", artist: "Harry Styles", price: "$5.99" },
                      { name: "Blinding Lights", artist: "The Weeknd", price: "$4.99" },
                      { name: "Bad Habit", artist: "Steve Lacy", price: "$4.99" },
                      { name: "Running Up That Hill", artist: "Kate Bush", price: "$3.99" },
                      { name: "Heat Waves", artist: "Glass Animals", price: "$4.99" },
                    ].map((track, i) => (
                      <div key={i} className="flex justify-between">
                        <div>
                          <span>
                            {i + 1}. {track.name}
                          </span>
                          <div className="text-gray-600 ml-4">- {track.artist}</div>
                        </div>
                        <div>{track.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-dashed border-black pt-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <div>SUBTOTAL:</div>
                    <div>$24.95</div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div>GOOD TASTE TAX:</div>
                    <div>$4.99</div>
                  </div>
                  <div className="flex justify-between text-sm font-bold mt-1">
                    <div>TOTAL:</div>
                    <div>$29.94</div>
                  </div>
                </div>

                <div className="text-center text-xs">
                  <p>THANK YOU FOR YOUR EXCELLENT TASTE</p>
                  <p>POWERED BY VIBESCAPE</p>
                  <div className="mt-2">
                    <div className="inline-block border border-black px-4 py-1">BARCODE PLACEHOLDER</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {template === "apple" && (
            <Card className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                    <div className="h-5 w-5 text-red-500">♫</div>
                  </div>
                  <div className="text-white font-semibold">Replay 2023</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Top Artists</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-white/20 rounded-lg overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=100&width=100&text=Artist+${i}`}
                          alt={`Artist ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Most Played</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={`/placeholder.svg?height=100&width=100&text=Album+${i}`}
                            alt={`Album ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-white">
                          <div className="font-medium">Track {i}</div>
                          <div className="text-sm text-white/70">Artist {i}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
                    Powered by Vibescape
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button size="sm" className="bg-green-500 hover:bg-green-600 rounded-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="bg-zinc-800 border-zinc-700 rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
