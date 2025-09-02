import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import keycloak from "./keycloak";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitializing = useRef(false);

  useEffect(() => {
    // Prevent multiple initialization attempts
    if (isInitializing.current) return;

    isInitializing.current = true;
    console.log("Initializing Keycloak...");

    // Only initialize if not already authenticated
    if (!keycloak.authenticated) {
      keycloak
        .init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
        })
        .then((auth) => {
          console.log("Keycloak initialization result:", auth);
          setAuthenticated(auth);
          if (auth && keycloak.tokenParsed) {
            setUser({
              id: keycloak.subject,
              username: keycloak.tokenParsed.preferred_username,
              name: keycloak.tokenParsed.name,
              email: keycloak.tokenParsed.email,
              roles: keycloak.realmAccess?.roles || [],
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Keycloak initialization error:", error);
          setLoading(false);
        });
    } else {
      setAuthenticated(true);
      setLoading(false);
    }
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, loading, login, logout, keycloak }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
