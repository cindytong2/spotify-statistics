// Helper function to get cookie value from cookie header
function getCookieValue(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, ...rest] = cookie.trim().split('=');
    if (cookieName === name) {
      return rest.join('=');
    }
  }
  return undefined;
}

export async function fetchFromSpotify(endpoint: string, cookieHeader?: string | null) {
  let accessToken: string | undefined;
  
  if (cookieHeader) {
    // Get token from cookie header (for API routes)
    accessToken = getCookieValue(cookieHeader, 'spotify_access_token');
  } else if (typeof document !== 'undefined') {
    // Get token from document.cookie (for client-side)
    accessToken = getCookieValue(document.cookie, 'spotify_access_token');
  }

  if (!accessToken) {
    throw new Error('No access token found in cookies');
  }

  const response = await fetch(`https://api.spotify.com/v1/me/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Spotify API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function fetchFromSpotifyDirect(endpoint: string, cookieHeader?: string | null) {
  let accessToken: string | undefined;
  
  if (cookieHeader) {
    // Get token from cookie header (for API routes)
    accessToken = getCookieValue(cookieHeader, 'spotify_access_token');
  } else if (typeof document !== 'undefined') {
    // Get token from document.cookie (for client-side)
    accessToken = getCookieValue(document.cookie, 'spotify_access_token');
  }

  if (!accessToken) {
    throw new Error('No access token found in cookies');
  }

  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Spotify API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function getTopTracks(limit = 50, timeRange: string = 'short_term', cookieHeader?: string) {
  return fetchFromSpotify(`top/tracks?limit=${limit}&time_range=${timeRange}`, cookieHeader);
}

export async function getTopArtists(limit = 50, timeRange: string = 'short_term', cookieHeader?: string) {
  return fetchFromSpotify(`top/artists?limit=${limit}&time_range=${timeRange}`, cookieHeader);
}

export async function getRecentlyPlayed(limit = 50, cookieHeader?: string) {
  return fetchFromSpotify(`player/recently-played?limit=${limit}`, cookieHeader);
}

export async function getAudioFeatures(trackIds: string[], cookieHeader?: string) {
  if (trackIds.length === 0) return { audio_features: [] };
  
  // Spotify API allows max 100 track IDs per request
  const chunks = [];
  for (let i = 0; i < trackIds.length; i += 100) {
    chunks.push(trackIds.slice(i, i + 100));
  }
  
  const results = await Promise.all(
    chunks.map(chunk => 
      fetchFromSpotifyDirect(`audio-features?ids=${chunk.join(',')}`, cookieHeader)
    )
  );
  
  // Combine all results
  const combinedFeatures = results.reduce((acc, result) => {
    return {
      audio_features: [...acc.audio_features, ...result.audio_features]
    };
  }, { audio_features: [] });
  
  return combinedFeatures;
}
