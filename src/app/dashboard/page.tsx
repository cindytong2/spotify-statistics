"use client"

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Music, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Artist {
  id: string;
  name: string;
  images?: Array<{ url: string }>;
  external_urls: { spotify: string };
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images: Array<{ url: string }>;
    name: string;
  };
  external_urls: { spotify: string };
  duration_ms: number;
  preview_url: string | null;
}

interface SpotifyData {
  profile: {
    display_name: string;
    email: string;
    images?: Array<{ url: string }>;
    followers: { total: number };
    external_urls: { spotify: string };
  };
  topTracks: { items: Track[] };
  topArtists: { items: Artist[] };
  recentlyPlayed: { items: Array<{ track: Track; played_at: string }> };
}

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export default function DashboardPage() {
  const router = useRouter();
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
  const [expandedSections, setExpandedSections] = useState({
    tracks: false,
    artists: false
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSection = (section: 'tracks' | 'artists') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = async () => {
    try {
      // Clear any stored tokens or session data
      document.cookie = 'spotify_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'spotify_refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
      // Redirect to the home page
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const timeRangeLabels: Record<TimeRange, { label: string; display: string }> = {
    short_term: { label: 'Last Month', display: 'This month' },
    medium_term: { label: 'Last 6 Months', display: 'Last 6 months' },
    long_term: { label: 'All Time', display: 'All time' }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [profileRes, topTracksRes, topArtistsRes] = await Promise.all([
          fetch('/api/me'),
          fetch(`/api/me/top/tracks?limit=20&time_range=${timeRange}`),
          fetch(`/api/me/top/artists?limit=20&time_range=${timeRange}`),
        ]);

        if (!profileRes.ok || !topTracksRes.ok || !topArtistsRes.ok) {
          throw new Error('Failed to fetch data from Spotify');
        }
        
        const [profile, topTracks, topArtists] = await Promise.all([
          profileRes.json(),
          topTracksRes.json(),
          topArtistsRes.json(),
        ]);

        setSpotifyData({
          profile,
          topTracks,
          topArtists,
          recentlyPlayed: { items: [] }, // Add empty array for type safety
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const togglePlayPreview = (track: Track) => {
    if (!track.preview_url) return;
    
    if (nowPlaying === track.id) {
      // Toggle play/pause for current track
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    } else {
      // Stop current playback and start new one
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(track.preview_url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setNowPlaying(null);
        setIsPlaying(false);
      };
      
      audio.play()
        .then(() => {
          setNowPlaying(track.id);
          setIsPlaying(true);
        })
        .catch(console.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(167,94%,43%)] rounded-full blur-xl opacity-30"></div>
            <Loader2 className="w-16 h-16 text-[hsl(263,83%,70%)] animate-spin mx-auto mb-6 relative z-10" />
          </div>
          <p className="text-[hsl(260,10%,70%)] text-lg font-medium">Curating your musical journey...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !spotifyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative"
        >
          <div className="relative z-10 bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg rounded-2xl p-8 border border-[hsl(260,15%,20%,0.5)] shadow-2xl shadow-[hsl(260,20%,5%,0.3)]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-[hsl(260,10%,70%)] mb-6">{error || 'Failed to load your Spotify data'}</p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(263,83%,50%)] hover:from-[hsl(263,83%,65%)] hover:to-[hsl(263,83%,55%)] text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full border-[hsl(260,15%,25%)] text-[hsl(260,10%,80%)] hover:bg-[hsl(260,15%,15%)] py-2 px-4 rounded-lg transition-colors"
              >
                Back to Home
              </Button>
            </div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur opacity-70"></div>
        </motion.div>
      </div>
    );
  }

  const { profile, topTracks, topArtists } = spotifyData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] p-4 sm:p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(260,20%,6%)] via-[hsl(260,25%,8%)] to-[hsl(260,30%,10%)]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(263,83%,60%,0.1) 0%, transparent 40%), radial-gradient(circle at 75% 75%, hsl(167,94%,43%,0.1) 0%, transparent 40%)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }}></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Time Range Dropdown */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="appearance-none bg-[hsl(260,15%,12%,0.8)] border border-[hsl(260,15%,20%,0.5)] rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[hsl(263,83%,60%,0.5)] focus:border-transparent"
            >
              {Object.entries(timeRangeLabels).map(([key, { label }]) => (
                <option key={key} value={key} className="bg-[hsl(260,15%,12%)] text-white">
                  {label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg rounded-2xl p-6 mb-6 border border-[hsl(260,15%,20%,0.5)] shadow-2xl shadow-[hsl(260,20%,5%,0.3)] relative overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {profile?.images?.[0]?.url ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(167,94%,43%)] rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  <Image 
                    src={profile.images[0].url} 
                    alt={profile.display_name || 'Profile'} 
                    width={64}
                    height={64}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[hsl(260,15%,20%)] relative z-10 transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(260,15%,15%)] to-[hsl(260,15%,10%)] flex items-center justify-center border border-[hsl(260,15%,20%)]">
                  <User className="w-8 h-8 text-[hsl(260,10%,60%)]" />
                </div>
              )}
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[hsl(260,10%,90%)]">
                  Welcome Back, {profile?.display_name}
                </h1>
                <p className="text-[hsl(260,10%,60%)] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(167,94%,43%)] mr-2"></span>
                  {profile?.followers?.total?.toLocaleString()} followers
                </p>
              </motion.div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </motion.header>

        <main className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Tracks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Music className="h-5 w-5 text-[hsl(263,83%,70%)]" />
                      <CardTitle className="text-lg font-semibold text-white">Top Tracks</CardTitle>
                    </div>
                    <span className="text-xs text-[hsl(260,10%,60%)]">{timeRangeLabels[timeRange].display}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topTracks?.items?.slice(0, expandedSections.tracks ? topTracks.items.length : 5).map((track, index) => (
                      <div key={track.id} className="flex items-center p-2 rounded-lg hover:bg-[hsl(260,15%,20%,0.3)] transition-colors group">
                        <div className="w-8 text-center text-[hsl(260,10%,60%)] text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-shrink-0 ml-2 w-10 h-10 rounded overflow-hidden bg-[hsl(260,15%,15%)]">
                          {track.album?.images?.[0]?.url ? (
                            <Image 
                              src={track.album.images[0].url} 
                              alt={track.album.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[hsl(260,15%,15%)]">
                              <Music className="w-4 h-4 text-[hsl(260,10%,60%)]" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white truncate group-hover:text-[hsl(263,83%,70%)] transition-colors">
                            {track.name}
                          </h3>
                          <p className="text-xs text-[hsl(260,10%,60%)] truncate">
                            {track.artists.map(a => a.name).join(', ')}
                          </p>
                        </div>
                        <div className="ml-2 text-xs text-[hsl(260,10%,60%)] whitespace-nowrap">
                          {formatDuration(track.duration_ms)}
                        </div>
                      </div>
                    ))}
                    {topTracks?.items && topTracks.items.length > 5 && (
                      <button
                        onClick={() => toggleSection('tracks')}
                        className="w-full py-2 text-center text-sm font-medium text-[hsl(263,83%,70%)] hover:text-[hsl(263,83%,80%)] transition-colors mt-2"
                      >
                        {expandedSections.tracks ? 'Show Less' : `+${topTracks.items.length - 5} More`}
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Artists */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-[hsl(167,94%,43%)]" />
                      <CardTitle className="text-lg font-semibold text-white">Top Artists</CardTitle>
                    </div>
                    <span className="text-xs text-[hsl(260,10%,60%)]">{timeRangeLabels[timeRange].display}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {topArtists?.items?.slice(0, expandedSections.artists ? topArtists.items.length : 6).map(artist => (
                        <a
                          key={artist.id}
                          href={artist.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center text-center"
                        >
                          <div className="relative mb-2">
                            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(167,94%,43%)] rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                            {artist.images?.[0]?.url ? (
                              <Image
                                src={artist.images[0].url}
                                alt={artist.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-full object-cover border-2 border-[hsl(260,15%,20%)] relative z-10 transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(260,15%,15%)] to-[hsl(260,15%,10%)] flex items-center justify-center border border-[hsl(260,15%,20%)]">
                                <User className="w-6 h-6 text-[hsl(260,10%,60%)]" />
                              </div>
                            )}
                          </div>
                          <h3 className="text-sm font-medium text-white group-hover:text-[hsl(263,83%,70%)] transition-colors line-clamp-2">
                            {artist.name}
                          </h3>
                        </a>
                      ))}
                    </div>
                    {topArtists?.items && topArtists.items.length > 6 && (
                      <button
                        onClick={() => toggleSection('artists')}
                        className="w-full py-2 text-center text-sm font-medium text-[hsl(167,94%,43%)] hover:text-[hsl(167,94%,53%)] transition-colors"
                      >
                        {expandedSections.artists ? 'Show Less' : `+${topArtists.items.length - 6} More`}
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
