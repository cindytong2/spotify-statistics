"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-.96 10.14-.3 13.92 1.74.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
  </svg>
);

interface SpotifyLoginButtonProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export default function SpotifyLoginButton({ className = '', size = 'lg' }: SpotifyLoginButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
      
      if (!clientId || !redirectUri) {
        throw new Error('Missing Spotify configuration');
      }

      const scopes = [
        'user-top-read',
        'user-read-recently-played',
        'user-read-private',
        'user-read-email',
        'user-read-playback-state'
      ];

      // Generate a random state parameter for CSRF protection
      const state = Math.random().toString(36).substring(2, 15);
      
      // Store state in session storage to verify in callback
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('spotify_auth_state', state);
      }

      const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scopes.join(' '),
        state: state,
        show_dialog: 'true'
      });

      // Redirect to Spotify authorization page
      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to initiate login');
      setIsLoading(false);
    }
  };

  const baseClasses = 'relative overflow-hidden group flex items-center justify-center rounded-xl bg-gradient-to-r from-[hsl(263,83%,60%)] to-[hsl(263,83%,70%)] text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed';
  
  const sizeClasses = size === 'sm' 
    ? 'h-9 px-4 text-sm space-x-2' 
    : 'h-10 px-5 text-sm space-x-2.5';

  return (
    <div className="text-center">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`${baseClasses} ${sizeClasses} ${className} ${error ? 'ring-2 ring-red-500' : ''} hover:brightness-110`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-3.5 w-3.5" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <SpotifyIcon className="h-3.5 w-3.5" />
            <span>Connect Spotify</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
