import { NextResponse, NextRequest } from 'next/server'

const verifyAuth0Session = async (
  req: NextRequest,
): Promise<boolean> => {
  const res = await fetch(req.nextUrl.origin + '/api/auth/me', {
    headers: { cookie: req.headers.get('cookie') ?? '' }
  })

  return res.ok
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const isLoggedIn = await verifyAuth0Session(req);

    if (pathname == '/' && isLoggedIn) {
        return NextResponse.redirect(req.nextUrl.origin + '/conversations')
    }

    return NextResponse.next()
}