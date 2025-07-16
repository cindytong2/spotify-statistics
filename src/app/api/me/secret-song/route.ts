import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('time_range') || 'short_term';
    const cookieHeader = request.headers.get('cookie') || '';
    
    // Get top tracks (50 to ensure we have enough)
    const topTracksData = await getTopTracks(50, timeRange, cookieHeader);
    const tracks = topTracksData.items || [];
    
    if (tracks.length === 0) {
      return NextResponse.json({ error: 'No tracks found' }, { status: 404 });
    }
    
    // Get the last track (bottom of the list) as the "secret song"
    const secretTrack = tracks[tracks.length - 1];
    const trackPosition = tracks.length;
    
    // Generate a fun message
    const message = generateSecretSongMessage(trackPosition);
    
    return NextResponse.json({
      track: secretTrack,
      message,
      trackPosition,
      totalTracks: tracks.length
    });
    
  } catch (error: unknown) {
    console.error('Error in /api/me/secret-song:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to find secret song' },
      { status: 500 }
    );
  }
}

function generateSecretSongMessage(position: number): string {
  const messages = [
    "Your secret track hiding in plain sight 👀",
    `Underrated banger of the month 🎧 #${position} but should be #1`,
    "The hidden gem at the bottom 💎",
    "Your playlist's best kept secret 🤫",
    "The track that deserves more love ❤️",
    "Your musical dark horse 🐎",
    "The underdog of your favorites 🏆",
    "Your secret weapon 🎯",
    "The track that's flying under the radar 🛩️",
    "Your playlist's hidden treasure 🗝️"
  ];
  
  // Pick a random message
  return messages[Math.floor(Math.random() * messages.length)];
} 