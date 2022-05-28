import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";

const secret = process.env.JWT_SECRET;

export default async function middleware(req: NextApiRequest) {
  const { cookies } = req;

  const jwt = cookies.GuardianJWT;

  //@ts-ignore
  const url = req.nextUrl.clone();
  if (url.pathname.includes("/api")) return NextResponse.next();

  if (jwt === undefined) {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  const invalid = url.pathname === "/" || url.pathname === "/child-panel";

  try {
    const verified = await jwtVerify(jwt, new TextEncoder().encode(secret));
    if (verified.payload.role === "USER") {
      if (invalid) {
        url.pathname = "/activity";
        return NextResponse.rewrite(url);
      } else return NextResponse.next();
    } else {
      if (url.pathname === "/child-panel-dev") return NextResponse.next();
      url.pathname = "/child-panel";
      return NextResponse.rewrite(url);
    }
  } catch (error) {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }
}
