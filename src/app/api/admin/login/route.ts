import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (
    !email ||
    !password ||
    email !== process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD_HASH
  ) {
    return NextResponse.json({ error: "Невірні дані" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return NextResponse.json({ error: "Невірні дані" }, { status: 401 });
  }

  const token = await createToken({ email });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;        
}
