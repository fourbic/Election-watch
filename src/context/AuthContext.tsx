import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  regions: string[];
  isActive: boolean;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async (): Promise<void> => {
      const storedUser = localStorage.getItem('dexterUser');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          localStorage.removeItem('dexterUser');
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // In a real app, this would make an API call to verify credentials
      // Mocking a successful login for demo purposes
      if (email && password) {
        const userData: User = {
          id: 'user-123',
          name: 'Demo User',
          email: email,
          organization: 'Election Watch',
          role: 'RESEARCHER',
          regions: ['Lagos', 'Abuja'],
          isActive: true,
          lastLogin: new Date().toISOString()
        };
        
        setUser(userData);
        localStorage.setItem('dexterUser', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('dexterUser');
  };

  // Refresh user data
  const refreshUser = (): void => {
    const storedUser = localStorage.getItem('dexterUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
  };

  return (    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
