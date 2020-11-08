import React, { createContext, useState } from 'react';
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expires");
  const userInfo = localStorage.getItem("userInfo");

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const history = useHistory();

  const setAuthStateInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem("token", token);
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

  const logout = () => {
    localStorage.removeItem("token");
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
        logout
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
