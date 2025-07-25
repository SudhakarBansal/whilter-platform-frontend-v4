// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import { checkServiceAccess } from './utils/checkAccess';
import { Role } from './contants/role';

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get('cookie');

  const token = cookie?.match(/next-auth\.session-token=([^;]+)/)?.[1] ||
    cookie?.match(/__Secure-next-auth\.session-token=([^;]+)/)?.[1];


  if (!token) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }
  try {
    const decoded: any = jwt.decode(token);
    const role: Role = decoded?.role;
    const sections: string[] = decoded?.section || [];
    const currentSection = process.env.NEXT_PUBLIC_SECTION_KEY!;
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
