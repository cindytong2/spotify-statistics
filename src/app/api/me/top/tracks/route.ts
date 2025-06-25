import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 50;
    const timeRange = searchParams.get('time_range') || 'short_term';
    const cookieHeader = request.headers.get('cookie') || '';
    
    const data = await getTopTracks(limit, timeRange, cookieHeader);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error in /api/me/top/tracks:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch top tracks' }
    );
  }
}
