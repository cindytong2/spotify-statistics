'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    if (error) {
      setError(`Spotify authentication failed: ${error}`);
      return;
    }

    if (!code) {
      setError('No authorization code received from Spotify');
      return;
    }

    if (!state) {
      setError('Missing state parameter in the callback');
      return;
    }

    // Get the stored state from sessionStorage
    const storedState = typeof window !== 'undefined' ? sessionStorage.getItem('spotify_auth_state') : null;
    
    if (!storedState || state !== storedState) {
      setError('Invalid state parameter. Possible CSRF attack.');
      return;
    }

    // Clear the stored state as we don't need it anymore
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('spotify_auth_state');
    }

    const handleCallback = async () => {
      try {
        const response = await fetch(`/api/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to authenticate with Spotify');
        }
        
        // If we get here, the API call was successful
        // The API will handle the redirect to /success
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    handleCallback();
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h1 className="text-2xl font-bold text-white mb-2">Your Spotify Data</h1>
              <div className="flex items-center text-gray-400">
                {data.user?.images?.[0]?.url && (
                  <Image 
                    src={data.user.images[0].url} 
                    alt={data.user.display_name || 'User profile'}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="text-lg font-medium text-white">{data.user?.display_name || 'User'}</p>
                  <p className="text-sm">{data.user?.email}</p>
                  <p className="text-xs text-gray-500">{data.user?.followers} followers</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-green-400">Top Tracks</h2>
                  <div className="space-y-3">
                    {data.topTracks?.slice(0, 5).map((track: any, index: number) => (
                      <div key={track.id} className="flex items-center p-2 hover:bg-gray-800 rounded">
                        <span className="text-gray-500 w-6 text-right mr-2">{index + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white truncate">{track.name}</p>
                          <p className="text-sm text-gray-400 truncate">
                            {track.artists?.map((a: any) => a.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-green-400">Top Artists</h2>
                  <div className="space-y-3">
                    {data.topArtists?.slice(0, 5).map((artist: any, index: number) => (
                      <div key={artist.id} className="flex items-center p-2 hover:bg-gray-800 rounded">
                        <span className="text-gray-500 w-6 text-right mr-2">{index + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white">{artist.name}</p>
                          <p className="text-sm text-gray-400">
                            {artist.genres?.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-green-400">Recently Played</h2>
                <div className="space-y-3">
                  {data.recentlyPlayed?.slice(0, 5).map((item: any, index: number) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-800 rounded">
                      <span className="text-gray-500 w-6 text-right mr-2">{index + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">{item.track?.name}</p>
                        <p className="text-sm text-gray-400 truncate">
                          {item.track?.artists?.map((a: any) => a.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/30 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Raw Data</h3>
                <div className="bg-black p-4 rounded overflow-auto max-h-64">
                  <pre className="text-green-400 text-xs">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Connecting to Spotify...</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading your Spotify data...</p>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
