import { NextResponse } from 'next/server';

// Helper function to get cookie value from request headers
function getCookieValue(cookieHeader: string | null, cookieName: string): string | undefined {
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return undefined;
}

// Define the shape of the error response from Spotify API
interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}

// Define the shape of the user data from Spotify
interface SpotifyUser {
  id: string;
  display_name?: string;
  email?: string;
  images?: Array<{ url: string }>;
  followers?: { total: number };
  product?: string;
}

// This endpoint fetches the authenticated user's profile from Spotify
export async function GET(request: Request) {
  try {
    // Get the access token from cookies
    const cookieHeader = request.headers.get('cookie');
    const accessToken = getCookieValue(cookieHeader, 'spotify_access_token');

    // If no access token is found, return 401 Unauthorized
    if (!accessToken) {
      console.error('No access token found in cookies');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('Fetching user profile from Spotify API...');
    
    // Make request to Spotify API
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle non-200 responses from Spotify
    if (!response.ok) {
      const errorData: SpotifyError = await response.json().catch(() => ({} as SpotifyError));
      console.error('Spotify API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // If token is invalid, clear the cookie
      if (response.status === 401) {
        const response = NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
        
        // Clear the invalid token by setting an expired cookie
        response.headers.set('Set-Cookie', `spotify_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        
        return response;
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch user data from Spotify',
          details: errorData 
        },
        { status: response.status }
      );
    }

    // Parse and return the user data
    const userData: SpotifyUser = await response.json();
    
    // Don't log the entire user data for security, just log that we got it
    console.log(`Successfully fetched profile for user: ${userData.id}`);
    
    return NextResponse.json(userData);
    
  } catch (error: unknown) {
    console.error('Unexpected error in /api/me:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { details: errorMessage })
      },
      { status: 500 }
    );
  }
}
