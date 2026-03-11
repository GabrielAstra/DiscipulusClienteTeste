export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthTokens;
  erros: string[] | null;
  timestamp: string;
}
