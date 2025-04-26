import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";


import { RootState } from "../store/store";
import { logout } from "../store/auth";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
