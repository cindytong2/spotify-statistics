"use client"
import { motion } from "framer-motion"
import SpotifyLoginButton from "@/components/spotify-login-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] text-white">
      {/* Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 bg-[hsl(260,20%,10%,0.95)] backdrop-blur-md border border-[hsl(260,15%,20%,0.5)] rounded-xl shadow-2xl shadow-[hsl(260,20%,5%,0.3)] w-[calc(100%-3rem)] max-w-7xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[hsl(263,83%,70%)] to-[hsl(263,83%,80%)]">Rebeat - Spotify Statistics</span>
              </div>
            </div>
            <SpotifyLoginButton className="h-9 px-4" />
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
                Discover insights about your Spotify listening habits, including top tracks, artists, genres, and your secret underground song.
              </motion.p>
              
<motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <SpotifyLoginButton size="lg" />
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
                      <h3 className="text-2xl font-semibold text-white mb-2">Your Music Awaits</h3>
                      <p className="text-[hsl(260,10%,70%)] text-sm max-w-xs mx-auto">Connect your Spotify account to unlock personalized insights</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
