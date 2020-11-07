import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: null,
    userInfo: {}
  });

  const setAuthStateInfo = ({ token, expiresAt, userInfo }) => {
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
