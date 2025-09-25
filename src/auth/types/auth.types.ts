export interface JwtPayload {
  sub: number;
  name: string;
}

interface AuthenticatedUser {
  id: number;
  name: string;
}

export type AuthenticatedRequest = Request & { user: AuthenticatedUser };
