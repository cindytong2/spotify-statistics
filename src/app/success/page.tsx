"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface SpotifyData {
  profile?: any;
  topTracks?: any[];
  topArtists?: any[];
  recentlyPlayed?: any[];
  error?: string;
}

export default function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        // First get the user profile
        const profileResponse = await fetch('/api/me', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!profileResponse.ok) {
          const errorData = await profileResponse.json().catch(() => ({}));
          console.error('Profile fetch error:', {
            status: profileResponse.status,
            statusText: profileResponse.statusText,
            error: errorData,
            headers: Object.fromEntries(profileResponse.headers.entries())
          });
          throw new Error(`Failed to fetch user profile: ${profileResponse.status} ${profileResponse.statusText}`);
        }
        
        const profile = await profileResponse.json();
        
        // Helper function to fetch data with error handling
        const fetchWithErrorHandling = async (url: string, dataName: string) => {
          try {
            console.log(`Fetching ${dataName} from:`, url);
            const response = await fetch(url, { 
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              console.error(`Error fetching ${dataName}:`, {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
                url
              });
              return { items: [], error: `Failed to load ${dataName}` };
            }
            
            return await response.json();
          } catch (err) {
            console.error(`Error in fetch ${dataName}:`, err);
            return { items: [], error: `Error: ${err instanceof Error ? err.message : 'Unknown error'}` };
          }
        };

        // Fetch additional data in parallel
        const [topTracks, topArtists, recentlyPlayed] = await Promise.all([
          fetchWithErrorHandling('/api/me/top/tracks?limit=50', 'top tracks'),
          fetchWithErrorHandling('/api/me/top/artists?limit=50', 'top artists'),
          fetchWithErrorHandling('/api/me/player/recently-played?limit=50', 'recently played'),
        ]);
        
        console.log('Fetched data:', {
          topTracks: topTracks.items?.length || 0,
          topArtists: topArtists.items?.length || 0,
          recentlyPlayed: recentlyPlayed.items?.length || 0,
          errors: {
            topTracks: topTracks.error,
            topArtists: topArtists.error,
            recentlyPlayed: recentlyPlayed.error,
          }
        });
        
        setSpotifyData({
          profile,
          topTracks: topTracks.items || [],
          topArtists: topArtists.items || [],
          recentlyPlayed: recentlyPlayed.items || [],
        });
        
      } catch (err) {
        console.error('Error fetching Spotify data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Spotify data';
        setError(errorMessage);
        
        // Log additional debug info
        console.log('Cookies:', document.cookie);
        console.log('API URL:', '/api/me');
        console.log('Credentials mode:', 'include' as const);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSpotifyData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Loading your Spotify data...</h1>
          <p className="text-gray-600 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Spotify Data</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="font-medium text-red-800">{error}</p>
            <p className="mt-2 text-sm text-red-700">
              Please check the following:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-red-600 space-y-1">
              <li>You are logged in to Spotify</li>
              <li>Your session hasn&apos;t expired</li>
              <li>You have granted all required permissions</li>
            </ul>
          </div>
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg text-left text-sm font-mono overflow-auto max-h-64">
            <p className="text-yellow-400 mb-2">Debug Information:</p>
            <pre>Cookies: {document.cookie || 'No cookies found'}</pre>
            <pre>API Endpoint: /api/me</pre>
            <pre>Time: {new Date().toISOString()}</pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors ml-4"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <pre className="bg-white p-4 rounded shadow overflow-auto max-w-full">
        {JSON.stringify(spotifyData, null, 2)}
      </pre>
    </div>
  );
}
