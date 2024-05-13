import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

// Renamed UseAuth to useAuth to follow naming conventions
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");  // Clear only the token
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Correct placement for PropTypes definition
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

