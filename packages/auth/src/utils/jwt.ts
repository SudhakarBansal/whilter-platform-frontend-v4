import { JwtPayload } from '../types/jwt';

export function decodeJwt(token: string): JwtPayload | null {
    try {
        if (!token) {
            console.error('No token provided');
            return null;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error('Invalid JWT format');
            return null;
        }

        const base64Url = parts[1];
        if (!base64Url) {
            console.error('Invalid JWT payload');
            return null;
        }

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            (typeof window !== 'undefined'
                ? atob(base64)
                : Buffer.from(base64, 'base64').toString('utf-8')
            )
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const parsed = JSON.parse(jsonPayload) as Partial<JwtPayload>;

        // Validate required fields
        if (!parsed.role || !parsed.userId) {
            console.error('Invalid token payload structure');
            return null;
        }

        return parsed as JwtPayload;
    } catch (error) {
        console.error('Failed to decode JWT token:', error);
        return null;
    }
}
