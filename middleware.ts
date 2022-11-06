import { NextResponse, NextRequest } from "next/server";

const getIsLoggedIn = async (req: NextRequest): Promise<boolean> => {
  const url = req.nextUrl.origin + "/api/auth/me";

  const res = await fetch(url, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });

  return res.ok;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = await getIsLoggedIn(req);

  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/conversations", req.url));
  }

  return NextResponse.next();
}
