import { NextResponse } from 'next/server';
import { getRecentlyPlayed } from '@/lib/spotify';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const data = await getRecentlyPlayed(50, cookieHeader);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error in /api/me/player/recently-played:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch recently played tracks' }
    );
  }
}
