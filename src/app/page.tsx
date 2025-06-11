"use client"
import { motion } from "framer-motion"
import { ChevronRight, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import TopArtists from "@/components/top-artists"
import TopTracks from "@/components/top-tracks"
import MoodBoard from "@/components/mood-board"
import HiddenGems from "@/components/hidden-gems"
import ShareRecap from "@/components/share-recap"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] text-white">
      {/* Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 bg-[hsl(260,20%,10%,0.95)] backdrop-blur-md border border-[hsl(260,15%,20%,0.5)] rounded-xl shadow-2xl shadow-[hsl(260,20%,5%,0.3)] w-[calc(100%-3rem)] max-w-7xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                </div>
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[hsl(263,83%,70%)] to-[hsl(263,83%,80%)]">Rebeat</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="relative overflow-hidden group h-9 pl-5 pr-6 rounded-xl bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <span>Connect Spotify</span>
                </div>
                <span className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,70%)] to-[hsl(263,83%,80%)] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </Button>   
            </div>
        </div>
      </header>
      <div className="h-24"></div>
      <main className="flex-1">
        <section className="relative py-16 md:py-28 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(260,20%,6%)] via-[hsl(260,25%,8%)] to-[hsl(260,30%,10%)]">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(263,83%,60%,0.1) 0%, transparent 40%), radial-gradient(circle at 75% 75%, hsl(167,94%,43%,0.1) 0%, transparent 40%)',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
              }}></div>
            </div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-[0.02]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-[hsl(260,15%,15%)] border border-[hsl(260,15%,20%)] mb-6 backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[hsl(167,94%,43%)] animate-pulse mr-2"></span>
                <span className="text-sm font-medium text-[hsl(260,10%,80%)]">Now Playing: Your Music Journey</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-[hsl(260,10%,90%)] block">
                  Your Music, 
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(263,83%,70%)] via-[hsl(263,83%,65%)] to-[hsl(263,83%,60%)] animate-gradient">
                  Visualized
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-[hsl(260,10%,70%)] mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Discover insights about your Spotify listening habits with beautiful, shareable visualizations.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  className="relative overflow-hidden group h-12 px-8 rounded-xl bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    <span>Connect Spotify</span>
                  </div>
                  <span className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,70%)] to-[hsl(263,83%,80%)] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-8 rounded-xl border-[hsl(260,15%,25%)] text-[hsl(260,10%,80%)] hover:bg-[hsl(260,15%,15%)] hover:text-white hover:border-[hsl(260,15%,30%)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[hsl(260,10%,60%)] group-hover:text-[hsl(260,10%,80%)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span>See Demo</span>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(263,83%,60%,0.2)] to-[hsl(263,83%,70%,0.2)] rounded-2xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[hsl(260,15%,10%,0.8)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] rounded-xl p-1">
                  <div className="h-64 md:h-80 bg-[hsl(260,15%,15%,0.3)] rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Your Music Awaits</h3>
                      <p className="text-[hsl(260,10%,70%)] text-sm max-w-xs mx-auto">Connect your Spotify account to unlock personalized insights</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(260,20%,6%,0.5)] to-[hsl(260,25%,8%,0.8)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Tabs defaultValue="top-tracks" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[hsl(260,10%,90%)] mb-1">Your Music Stats</h2>
                  <p className="text-[hsl(260,10%,70%)]">Explore your listening history and discover insights</p>
                </div>
                <TabsList className="bg-[hsl(260,15%,15%,0.3)] backdrop-blur-md border border-[hsl(260,15%,25%,0.5)] p-1.5 rounded-xl w-full md:w-auto">
                  <TabsTrigger 
                    value="top-tracks"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(263,83%,60%,0.1)] data-[state=active]:to-[hsl(263,83%,70%,0.1)] data-[state=active]:text-[hsl(263,83%,70%)] data-[state=active]:border data-[state=active]:border-[hsl(263,83%,60%,0.2)] transition-all duration-200"
                  >
                    Top Tracks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="top-artists"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(263,83%,60%,0.1)] data-[state=active]:to-[hsl(263,83%,70%,0.1)] data-[state=active]:text-[hsl(263,83%,70%)] data-[state=active]:border data-[state=active]:border-[hsl(263,83%,60%,0.2)] transition-all duration-200"
                  >
                    Top Artists
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mood-board"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(263,83%,60%,0.1)] data-[state=active]:to-[hsl(263,83%,70%,0.1)] data-[state=active]:text-[hsl(263,83%,70%)] data-[state=active]:border data-[state=active]:border-[hsl(263,83%,60%,0.2)] transition-all duration-200"
                  >
                    Mood Board
                  </TabsTrigger>
                  <TabsTrigger 
                    value="hidden-gems"
                    className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(263,83%,60%,0.1)] data-[state=active]:to-[hsl(263,83%,70%,0.1)] data-[state=active]:text-[hsl(263,83%,70%)] data-[state=active]:border data-[state=active]:border-[hsl(263,83%,60%,0.2)] transition-all duration-200"
                  >
                    Hidden Gems
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="top-tracks" className="mt-8">
                <Card className="bg-[hsl(260,15%,10%,0.5)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] overflow-hidden transition-all duration-300 hover:border-[hsl(263,83%,60%,0.3)] hover:shadow-lg hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    <TopTracks />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="top-artists" className="mt-8">
                <Card className="bg-[hsl(260,15%,10%,0.5)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] overflow-hidden transition-all duration-300 hover:border-[hsl(263,83%,60%,0.3)] hover:shadow-lg hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    <TopArtists />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mood-board" className="mt-8">
                <Card className="bg-[hsl(260,15%,10%,0.5)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] overflow-hidden transition-all duration-300 hover:border-[hsl(263,83%,60%,0.3)] hover:shadow-lg hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    <MoodBoard />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hidden-gems" className="mt-8">
                <Card className="bg-[hsl(260,15%,10%,0.5)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] overflow-hidden transition-all duration-300 hover:border-[hsl(263,83%,60%,0.3)] hover:shadow-lg hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    <HiddenGems />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Share Your Stats Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(260,25%,8%)] to-[hsl(260,20%,6%)]">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(263,83%,60%,0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(263,83%,60%,0.03) 0%, transparent 50%)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[hsl(260,10%,90%)] mb-4">
                Share Your Music Personality
              </h2>
              <p className="text-lg text-[hsl(260,10%,70%)] max-w-2xl mx-auto">
                Generate beautiful, shareable cards that showcase your unique music taste and listening habits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Weekly Recap</h3>
                      <p className="text-[hsl(260,10%,70%)]">Share your weekly listening stats with friends and followers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(300,83%,60%)] to-[hsl(270,83%,60%)] flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Top Picks</h3>
                      <p className="text-[hsl(260,10%,70%)]">Showcase your top artists and tracks in a stunning visual</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="group relative overflow-hidden bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] text-white font-medium px-6 py-6 text-base hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        <Share2 className="mr-2 h-5 w-5" />
                        Create Shareable Recap
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,70%)] to-[hsl(263,83%,80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(263,83%,60%,0.1)] to-[hsl(263,83%,70%,0.1)] rounded-2xl blur-2xl opacity-70 -z-10"></div>
                <div className="relative bg-[hsl(260,15%,10%,0.5)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] rounded-2xl p-1.5 overflow-hidden">
                  <ShareRecap />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find Your New Favorites Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[hsl(260,20%,6%)] to-[hsl(260,25%,8%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[hsl(260,10%,90%)] mb-4">
                Find Your New Favorites
              </h2>
              <p className="text-lg text-[hsl(260,10%,70%)] max-w-2xl mx-auto mb-8">
                Discover hidden gems and personalized recommendations based on your unique listening history and preferences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="group relative overflow-hidden bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] text-white font-medium px-6 py-6 text-base hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Get Recommendations
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,70%)] to-[hsl(263,83%,80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                <div className="flex items-center text-[hsl(263,83%,70%)] group cursor-pointer">
                  <span className="text-sm font-medium group-hover:text-[hsl(263,83%,80%)] transition-colors">Browse more</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <Card className="bg-[hsl(260,15%,10%,0.5)] backdrop-blur-sm border border-[hsl(260,15%,20%,0.5)] overflow-hidden transition-all duration-300 group-hover:border-[hsl(263,83%,60%,0.3)] group-hover:shadow-lg group-hover:shadow-purple-500/10">
                    <div className="aspect-square bg-gradient-to-br from-[hsl(260,15%,15%,0.5)] to-[hsl(260,15%,10%,0.7)] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[hsl(263,83%,60%)] flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative w-full h-full">
                          <Image
                            src={`/placeholder.svg?height=300&width=300&text=Album+${i}`}
                            alt={`Album ${i}`}
                            fill
                            className="object-cover rounded-sm transition-transform duration-500 group-hover:scale-105"
                            unoptimized={process.env.NODE_ENV !== 'production'}
                          />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-[hsl(263,83%,70%)] transition-colors">Album Title {i}</h3>
                      <p className="text-sm text-[hsl(260,10%,70%)] group-hover:text-[hsl(263,83%,80%)] transition-colors">Artist Name</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs px-2 py-1 bg-[hsl(260,15%,15%)] rounded-full text-[hsl(260,10%,80%)]">
                          {['Pop', 'Indie', 'Electronic'][i % 3]}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6">
            <p className="text-zinc-400 text-sm max-w-2xl">
              This app uses Spotify&apos;s API but is not endorsed, certified, or otherwise approved by Spotify.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
