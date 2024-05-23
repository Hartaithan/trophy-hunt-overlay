"use client";

import type { FC, PropsWithChildren } from "react";
import { useState, useEffect, useContext, createContext, useMemo } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { LoadingOverlay } from "@mantine/core";

interface Context {
  user: User | null;
  isLoading: boolean;
}

const initialValue: Context = {
  user: null,
  isLoading: true,
};

export const AuthContext = createContext<Context>(initialValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [user, setUser] = useState<Context["user"]>(initialValue.user);
  const [isLoading, setLoading] = useState<Context["isLoading"]>(
    initialValue.isLoading,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const exposed: Context = useMemo(() => {
    return { user, isLoading };
  }, [user, isLoading]);

  return (
    <AuthContext.Provider value={exposed}>
      {isLoading ? (
        <LoadingOverlay visible overlayProps={{ opacity: 0 }} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
