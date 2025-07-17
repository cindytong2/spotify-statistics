import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('time_range') || 'short_term';

    // Get access token from cookies
    const accessToken = request.cookies.get('spotify_access_token')?.value;
    
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    // Get recently played tracks (most recent first)
    const recentlyPlayedResponse = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!recentlyPlayedResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch recently played tracks' }, { status: 500 });
    }

    const recentlyPlayedData = await recentlyPlayedResponse.json();
    
    if (!recentlyPlayedData.items || recentlyPlayedData.items.length === 0) {
      return NextResponse.json({ error: 'No recently played tracks found' }, { status: 404 });
    }

    const mostRecentTrack = recentlyPlayedData.items[0];
    const result = {
      track: mostRecentTrack.track,
      playedAt: mostRecentTrack.played_at,
      message: 'Your most recent Spotify jam! 🎵'
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error fetching most recent song:', error);
    return NextResponse.json({ error: 'Failed to fetch most recent song' }, { status: 500 });
  }
} 