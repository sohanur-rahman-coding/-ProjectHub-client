import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const role = searchParams.get('state') || 'STUDENT';

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  if (error || !code) {
    const errorMsg = error || 'Authorization was cancelled by user';
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(errorMsg)}`);
  }

  try {
    const clientId =
      process.env.GOOGLE_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    const redirectUri = `${baseUrl}/api/auth/callback/google`;

    // 1. Exchange authorization code for Google tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errData = await tokenResponse.text();
      console.error('Failed to exchange code for Google token:', errData);
      return NextResponse.redirect(
        `${baseUrl}/login?error=${encodeURIComponent('Failed to exchange token with Google. Please try again.')}`
      );
    }

    const tokenData = await tokenResponse.json();
    const idToken = tokenData.id_token;

    if (!idToken) {
      return NextResponse.redirect(
        `${baseUrl}/login?error=${encodeURIComponent('No ID token received from Google.')}`
      );
    }

    // 2. Authenticate / register user in our backend database
    const authResponse = await fetch(`${backendUrl}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential: idToken,
        role,
      }),
    });

    const authData = await authResponse.json();

    if (!authResponse.ok || !authData.success || !authData.data?.token) {
      console.error('Backend Google auth failed:', authData);
      return NextResponse.redirect(
        `${baseUrl}/login?error=${encodeURIComponent(authData.message || 'Authentication with server failed.')}`
      );
    }

    const { token, user } = authData.data;

    // 3. Redirect to client callback handler with token
    const callbackRedirectUrl = new URL(`${baseUrl}/auth/callback`);
    callbackRedirectUrl.searchParams.set('token', token);
    callbackRedirectUrl.searchParams.set('user', JSON.stringify(user));

    return NextResponse.redirect(callbackRedirectUrl.toString());
  } catch (err: any) {
    console.error('Google OAuth callback unexpected error:', err);
    return NextResponse.redirect(
      `${baseUrl}/login?error=${encodeURIComponent(err.message || 'An unexpected error occurred during Google sign in.')}`
    );
  }
}
