import { NextResponse } from 'next/server';

function getBaseUrl(request: Request) {
  const host = request.headers.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  
  // production
  if (process.env.NODE_ENV === 'production') {
    return 'https://spotify-statistics-beta.vercel.app';
  }
  
  // development
  return `${protocol}://${host}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const baseUrl = getBaseUrl(request);

  // spotify oauth error
  if (error) {
    console.error('Spotify auth error:', error);
    return NextResponse.redirect(
      `${baseUrl}/error?message=${encodeURIComponent(`Spotify authentication failed: ${error}`)}`
    );
  }

  // no code
  if (!code) {
    console.error('No code provided in callback');
    return NextResponse.redirect(
      `${baseUrl}/error?message=${encodeURIComponent('No authorization code received from Spotify')}`
    );
  }

  try {
    // exchange authorization code for access token
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    
    if (!clientId || !clientSecret || !redirectUri) {
      console.error('Missing Spotify configuration');
      return NextResponse.redirect(
        `${baseUrl}/error?message=${encodeURIComponent('Server configuration error')}`
      );
    }
    
    // create url search params for token request
    const tokenParams = new URLSearchParams();
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('code', code);
    tokenParams.append('redirect_uri', redirectUri);
    
    console.log('Exchanging code for tokens...');
    
    // exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      body: tokenParams
    });
    
    console.log('Token response status:', tokenResponse.status);
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(
        `${baseUrl}/error?message=${encodeURIComponent('Failed to exchange authorization code for tokens')}`
      );
    }
    
    const tokens = await tokenResponse.json();
    console.log('tokens received:', JSON.stringify(tokens, null, 2));
    
    if (!tokens.access_token) {
      console.error('No access token in response');
      return NextResponse.redirect(
        `${baseUrl}/error?message=${encodeURIComponent('No access token received from Spotify')}`
      );
    }
    
    // for local development, we need to handle cookies differently
    const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('loca.lt');
    
    // create response with redirect first
    const redirectUrl = `${baseUrl}/dashboard`;
    console.log('redirecting to:', redirectUrl);
    const response = NextResponse.redirect(redirectUrl);
    
    // common cookie options
    const commonCookieOptions = {
      path: '/',
      sameSite: 'lax' as const,
      secure: !isLocalhost,
      httpOnly: true,
    };
    
    console.log('Setting cookies with options:', JSON.stringify(commonCookieOptions, null, 2));
    
    // set access token cookie - make it non-httpOnly for testing
    console.log('Setting access token cookie');
    response.cookies.set({
      name: 'spotify_access_token',
      value: tokens.access_token,
      ...commonCookieOptions,
      httpOnly: false, // make it accessible via JavaScript for testing
      maxAge: tokens.expires_in || 60 * 60 * 24 * 7, // 1 week default
    });
    
    // set refresh token cookie if available
    if (tokens.refresh_token) {
      console.log('Setting refresh token cookie');
      response.cookies.set({
        name: 'spotify_refresh_token',
        value: tokens.refresh_token,
        ...commonCookieOptions,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    } else {
      console.log('No refresh token provided by Spotify');
    }
    
    // add a test cookie to verify cookie setting works
    response.cookies.set({
      name: 'test_cookie',
      value: 'test_value',
      ...commonCookieOptions,
      httpOnly: false, // make it accessible via JavaScript for testing
    });
    
    // log all cookies being set
    console.log('All cookies being set:');
    response.cookies.getAll().forEach((cookie, index) => {
      console.log(`Cookie ${index + 1}:`, cookie);
    });
    
    return response;
  } catch (error) {
    console.error('Error in callback route:', error);
    return NextResponse.redirect(
      `${baseUrl}/error?message=${encodeURIComponent('An unexpected error occurred')}`
    );
  }
}
