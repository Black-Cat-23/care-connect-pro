import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, UserRole, demoUsers, doctors, patients } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('his_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('his_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo login - in production, validate with backend
    const foundUser = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('his_user', JSON.stringify(foundUser));
      return true;
    }

    // Check if email matches a doctor
    const foundDoctor = doctors.find(d => d.email.toLowerCase() === email.toLowerCase());
    if (foundDoctor) {
      const doctorUser: User = {
        id: foundDoctor.userId,
        email: foundDoctor.email,
        name: foundDoctor.name,
        role: 'doctor',
      };
      setUser(doctorUser);
      localStorage.setItem('his_user', JSON.stringify(doctorUser));
      return true;
    }

    // Check if email matches a patient
    const foundPatient = patients.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (foundPatient) {
      const patientUser: User = {
        id: foundPatient.userId,
        email: foundPatient.email,
        name: foundPatient.name,
        role: 'patient',
      };
      setUser(patientUser);
      localStorage.setItem('his_user', JSON.stringify(patientUser));
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('his_user');
  }, []);

  const register = useCallback(async (email: string, _password: string, name: string, role: UserRole): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo registration - in production, send to backend
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
    };

    setUser(newUser);
    localStorage.setItem('his_user', JSON.stringify(newUser));
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
