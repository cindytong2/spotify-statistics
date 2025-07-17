"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Clock, Play } from "lucide-react";
import Image from "next/image";

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
    release_date: string;
  };
  external_urls: { spotify: string };
  duration_ms: number;
}

interface MostRecentSongData {
  track: Track;
  playedAt: string | null;
  message: string;
}

interface MostRecentSongProps {
  timeRange: string;
}

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
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

export default function MostRecentSong({ timeRange }: MostRecentSongProps) {
  const [data, setData] = useState<MostRecentSongData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostRecentSong = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/me/most-recent-song?time_range=${timeRange}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch most recent song');
        }
        
        const mostRecentSongData = await response.json();
        setData(mostRecentSongData);
      } catch (err) {
        console.error('Error fetching most recent song:', err);
        setError(err instanceof Error ? err.message : 'Failed to load most recent song');
      } finally {
        setLoading(false);
      }
    };

    fetchMostRecentSong();
  }, [timeRange]);

  if (loading) {
    return (
      <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-[hsl(263,83%,70%)]" />
            <CardTitle className="text-lg font-semibold text-white">Most Recent Song You Played</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 text-[hsl(263,83%,70%)] animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[hsl(260,15%,12%,0.8)] backdrop-blur-lg border-[hsl(260,15%,20%,0.5)]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-[hsl(263,83%,70%)]" />
            <CardTitle className="text-lg font-semibold text-white">Most Recent Song You Played</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-[hsl(260,10%,60%)] text-center">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="h-full flex flex-col bg-gradient-to-r from-[hsl(260,15%,12%,0.9)] to-[hsl(260,15%,15%,0.9)] backdrop-blur-lg border-[hsl(263,83%,60%,0.3)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(263,83%,60%,0.1)] to-[hsl(167,94%,43%,0.1)] opacity-50"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Play className="h-5 w-5 text-[hsl(263,83%,70%)]" />
              <div className="absolute inset-0 bg-[hsl(263,83%,70%)] rounded-full blur-sm opacity-30"></div>
            </div>
            <CardTitle className="text-lg font-semibold text-white">Most Recent Song You Played</CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-1">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-[hsl(263,83%,70%)] mb-2">
            {data.message}
          </p>
        </div>
        
        <div className="flex items-center p-3 rounded-lg bg-[hsl(260,15%,20%,0.3)] hover:bg-[hsl(260,15%,25%,0.3)] transition-colors group">
          <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-[hsl(260,15%,15%)]">
            {data.track.album?.images?.[0]?.url ? (
              <Image 
                src={data.track.album.images[0].url} 
                alt={data.track.album.name}
                width={48}
                height={48}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[hsl(260,15%,15%)]">
                <Play className="w-5 h-5 text-[hsl(260,10%,60%)]" />
              </div>
            )}
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate group-hover:text-[hsl(263,83%,70%)] transition-colors">
              {data.track.name}
            </h3>
            <p className="text-xs text-[hsl(260,10%,60%)] truncate">
              {data.track.artists.map(a => a.name).join(', ')}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-3 h-3 text-[hsl(260,10%,60%)]" />
              <span className="text-xs text-[hsl(260,10%,60%)]">
                {formatDuration(data.track.duration_ms)}
              </span>
              {data.playedAt && (
                <>
                  <span className="text-xs text-[hsl(260,10%,60%)]">•</span>
                  <span className="text-xs text-[hsl(260,10%,60%)]">
                    {formatTimeAgo(data.playedAt)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {data.track.album && (
          <div className="mt-3 text-center">
            <p className="text-xs text-[hsl(260,10%,60%)]">
              From <span className="text-[hsl(263,83%,70%)]">{data.track.album.name}</span>
              {data.track.album.release_date && (
                <span> • Released {formatDate(data.track.album.release_date)}</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 