"use client"
import { motion } from "framer-motion"
import { ChevronRight, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopArtists from "@/components/top-artists"
import TopTracks from "@/components/top-tracks"
import MoodBoard from "@/components/mood-board"
import HiddenGems from "@/components/hidden-gems"
import ShareRecap from "@/components/share-recap"

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHeaderVisible(false)
      } else {
        // Scrolling up
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  useEffect(() => {
    const header = document.getElementById('main-header')
    if (header) {
      header.style.transform = isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'
    }
  }, [isHeaderVisible])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 transform-gpu" id="main-header">
        <div className="backdrop-blur-lg bg-slate-900/95 border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">Logo and Title [TBD]</span>
              </div>
              <nav className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                >
                  <span className="relative z-10">Connect Spotify</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="h-16"></div>
      <main className="flex-1">
        <section className="relative py-16 md:py-28 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/5 via-slate-900 to-slate-950 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-5"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 animate-pulse mr-2"></span>
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">Now Playing: Your Music Journey</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">
                Your Music, <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 animate-gradient">Visualized</span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Discover insights about your Spotify listening habits.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-8 py-6 text-base hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Connect Spotify
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-slate-600 transition-colors duration-300 px-8 py-6 text-base"
                >
                  See Demo
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl p-1">
                  <div className="h-64 md:h-80 bg-slate-800/30 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Your Music Awaits</h3>
                      <p className="text-slate-400 text-sm max-w-xs mx-auto">Connect your Spotify account to unlock personalized insights</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/80"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Tabs defaultValue="top-tracks" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 mb-1">Your Music Stats</h2>
                  <p className="text-slate-400">Explore your listening history and discover insights</p>
                </div>
                <TabsList className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 p-1.5 rounded-xl w-full md:w-auto">
                  <TabsTrigger 
                    value="top-tracks"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/10 data-[state=active]:to-teal-500/10 data-[state=active]:text-green-400 data-[state=active]:border data-[state=active]:border-green-500/20"
                  >
                    Top Tracks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="top-artists"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/10 data-[state=active]:to-teal-500/10 data-[state=active]:text-green-400 data-[state=active]:border data-[state=active]:border-green-500/20"
                  >
                    Top Artists
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mood"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/10 data-[state=active]:to-teal-500/10 data-[state=active]:text-green-400 data-[state=active]:border data-[state=active]:border-green-500/20"
                  >
                    Mood Board
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gems"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/10 data-[state=active]:to-teal-500/10 data-[state=active]:text-green-400 data-[state=active]:border data-[state=active]:border-green-500/20"
                  >
                    Hidden Gems
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="top-tracks" className="mt-0">
                <TopTracks />
              </TabsContent>

              <TabsContent value="top-artists" className="mt-0">
                <TopArtists />
              </TabsContent>

              <TabsContent value="mood" className="mt-0">
                <MoodBoard />
              </TabsContent>

              <TabsContent value="gems" className="mt-0">
                <HiddenGems />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-500/10 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-green-500/10 rounded-full filter blur-3xl -z-10"></div>
                
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 mb-4">
                  Share Your Music Personality
                </h2>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Generate beautiful, shareable cards that showcase your unique music taste and listening habits in detail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-6 text-base hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <Share2 className="mr-2 h-5 w-5" />
                      Create Shareable Recap
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                  <div className="flex items-center text-teal-400 group cursor-pointer">
                    <span className="text-sm font-medium group-hover:text-teal-300 transition-colors">See examples</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-2xl blur-2xl opacity-70 -z-10"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-1.5 overflow-hidden">
                  <ShareRecap />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-950/80"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 mb-4">
                  Find Your New Favorites
                </h2>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Discover hidden gems and personalized recommendations based on your unique listening history and preferences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-6 text-base hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Get Recommendations
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                  <div className="flex items-center text-teal-400 group cursor-pointer">
                    <span className="text-sm font-medium group-hover:text-teal-300 transition-colors">Browse more</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <Card className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 overflow-hidden transition-all duration-300 group-hover:border-teal-500/30 group-hover:shadow-lg group-hover:shadow-teal-500/10">
                      <div className="aspect-square bg-gradient-to-br from-slate-800/50 to-slate-900/70 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-teal-500/90 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <img
                            src={`/placeholder.svg?height=300&width=300&text=Album+${i}`}
                            alt={`Album ${i}`}
                            className="w-full h-full object-cover rounded-sm transition-transform duration-500 group-hover:scale-105"
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white group-hover:text-teal-400 transition-colors">Album Title {i}</h3>
                        <p className="text-sm text-slate-400 group-hover:text-teal-300 transition-colors">Artist Name</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs px-2 py-1 bg-slate-800/50 rounded-full text-slate-300">
                            {['Pop', 'Indie', 'Electronic'][i % 3]}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6">
            <p className="text-zinc-400 text-sm max-w-2xl">
              This app uses Spotify's API but is not endorsed, certified, or otherwise approved by Spotify.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
