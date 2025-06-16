// context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 1, username: "Bhavya" });
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
