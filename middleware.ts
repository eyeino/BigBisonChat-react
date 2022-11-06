import { NextResponse, NextRequest } from "next/server";

const getIsAuthenticated = async (req: NextRequest): Promise<boolean> => {
  const url = req.nextUrl.origin + "/api/auth/me";

  console.log(url);

  const res = await fetch(url, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });

  return res.ok;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = await getIsAuthenticated(req);

  if (pathname == "/" && isLoggedIn) {
    return NextResponse.redirect(req.nextUrl.origin + "/conversations");
  }

  return NextResponse.next();
}
