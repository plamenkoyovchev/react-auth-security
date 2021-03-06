import React, { createContext, useState } from 'react';
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const expiresAt = localStorage.getItem("expires");
  const userInfo = localStorage.getItem("userInfo");

  const [authState, setAuthState] = useState({
    token: null,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const history = useHistory();

  const setAuthStateInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem("expires", expiresAt);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setAuthState({
      token,
      expiresAt,
      userInfo
    });

    history.push('/login');
  }

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false
    }
    // expiresAt is in seconds therefore we should divide by 1000 since getTime returns miliseconds
    return new Date().getTime() / 1000 < authState.expiresAt;
  }

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  }

  const logout = () => {
    localStorage.removeItem("expires");
    localStorage.removeItem("userInfo");

    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {}
    });
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthStateInfo(authInfo),
        isAuthenticated,
        isAdmin,
        logout
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
