export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar?: Avatar;
  banner?: Banner;
  venueManager?: boolean;
}

export interface AuthResponseData extends UserProfile {
  accessToken: string;
}

export interface AuthResponse {
  data: AuthResponseData;
  meta: Record<string, unknown>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  password: string;
  venueManager?: boolean;
}
