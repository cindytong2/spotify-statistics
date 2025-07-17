import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';
    const timeRange = searchParams.get('time_range') || 'short_term';

    // Get access token from cookies
    const accessToken = request.cookies.get('spotify_access_token')?.value;
    if (!accessToken) {
      console.error('No access token found in cookies');
      return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    // Fetch the user's top tracks
    const topTracksResponse = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!topTracksResponse.ok) {
      const text = await topTracksResponse.text();
      console.error('Failed to fetch top tracks:', topTracksResponse.status, text);
      return NextResponse.json({ error: 'Failed to fetch top tracks', status: topTracksResponse.status, details: text }, { status: 500 });
    }
    const topTracksData = await topTracksResponse.json();
    const trackIds = topTracksData.items?.map((track: any) => track.id) || [];
    if (trackIds.length === 0) {
      console.error('No tracks found for user');
      return NextResponse.json({ error: 'No tracks found' }, { status: 404 });
    }

    // Fetch audio features for all tracks (Spotify API allows up to 100 track IDs per request)
    const audioFeaturesPromises = [];
    for (let i = 0; i < trackIds.length; i += 100) {
      const batch = trackIds.slice(i, i + 100);
      const audioFeaturesResponse = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${batch.join(',')}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!audioFeaturesResponse.ok) {
        const text = await audioFeaturesResponse.text();
        console.error('Failed to fetch audio features:', audioFeaturesResponse.status, text);
        return NextResponse.json({ error: 'Failed to fetch audio features', status: audioFeaturesResponse.status, details: text }, { status: 500 });
      }
      const audioFeaturesData = await audioFeaturesResponse.json();
      audioFeaturesPromises.push(audioFeaturesData.audio_features);
    }
    // Flatten the results
    const allAudioFeatures = audioFeaturesPromises.flat().filter(Boolean);
    // Calculate average values for each feature
    const features = {
      energy: 0,
      danceability: 0,
      loudness: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0
    };
    let validTracks = 0;
    allAudioFeatures.forEach((trackFeatures: any) => {
      if (trackFeatures) {
        features.energy += trackFeatures.energy || 0;
        features.danceability += trackFeatures.danceability || 0;
        features.loudness += trackFeatures.loudness || 0;
        features.speechiness += trackFeatures.speechiness || 0;
        features.acousticness += trackFeatures.acousticness || 0;
        features.instrumentalness += trackFeatures.instrumentalness || 0;
        features.liveness += trackFeatures.liveness || 0;
        features.valence += trackFeatures.valence || 0;
        validTracks++;
      }
    });
    // Calculate averages
    if (validTracks > 0) {
      Object.keys(features).forEach(key => {
        features[key as keyof typeof features] = features[key as keyof typeof features] / validTracks;
      });
    }
    // Normalize loudness (convert from dB to linear scale)
    // Spotify loudness ranges from -60 to 0 dB, normalize to 0-1
    features.loudness = (features.loudness + 60) / 60;
    features.loudness = Math.max(0, Math.min(1, features.loudness)); // Clamp to 0-1
    return NextResponse.json({
      features,
      trackCount: validTracks,
      timeRange,
    });
  } catch (error) {
    console.error('Error fetching audio features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audio features', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
} 