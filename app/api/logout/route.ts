import { NextResponse } from "next/server";

export async function GET(req) {
  const res = NextResponse.json({ message: "Logged out" });

  // Clear cookie
  res.cookies.set("token", "", { maxAge: 0, path: "/" });
  return res;
}
