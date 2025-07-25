// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import { checkServiceAccess } from './utils/checkAccess';
import { Role } from './constants/role';

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get('cookie');
console.log("cookie",cookie)
  const token = cookie?.match(/next-auth\.session-token=([^;]+)/)?.[1] ||
  cookie?.match(/__Secure-next-auth\.session-token=([^;]+)/)?.[1];
console.log("token",token)

  if (!token) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }
  try {
    const decoded: any = jwt.decode(token);
    const role: Role = decoded?.role;
    const sections: string[] = decoded?.section || [];
    const currentSection = process.env.NEXT_PUBLIC_SECTION_KEY!;
    console.log("currentSection",currentSection,decoded,role)
    const hasAccess = checkServiceAccess(role, sections, currentSection);

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', process.env.NEXT_PUBLIC_MAIN_URL!));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT decode error:', err);
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }
}
