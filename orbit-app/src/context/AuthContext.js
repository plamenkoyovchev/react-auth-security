import React, { createContext, useState } from 'react';

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

  const setAuthStateInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", expiresAt);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setAuthState({
      token,
      expiresAt,
      userInfo
    });
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthStateInfo(authInfo)
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
