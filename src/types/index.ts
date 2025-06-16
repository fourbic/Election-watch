export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  regions: string[];
  isActive: boolean;
  lastLogin: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}
