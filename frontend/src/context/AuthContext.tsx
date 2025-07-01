"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.post("http://localhost:8001/api/v1/profile", {}, {
          withCredentials: true,
        });

        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = (user: User) => {
    setUser(user);
    router.push("/dashboard");
  };

  const logout = async () => {
    await axios.post("http://localhost:8001/api/v1/logout", {}, { withCredentials: true });
    setUser(null);
  };

  useEffect(() => {
    if(!loading) {
      console.log({user})
      setIsAdmin(user?.role?.name === "admin");
    }
  }, [loading, user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}