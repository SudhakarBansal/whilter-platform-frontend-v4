// apps/main/app/api/auth/[...nextauth]/route.ts
import { authHandler } from "@whilter/auth";

export const GET = authHandler;
export const POST = authHandler;