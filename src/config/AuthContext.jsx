import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import keycloak from "./keycloak";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitializing = useRef(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Auth check timed out, assuming not authenticated");
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  useEffect(() => {
    if (isInitializing.current) return;

    isInitializing.current = true;
    console.log("Initializing Keycloak...");

    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        enableLogging: true,
        checkLoginIframe: false,
        silentCheckSsoFallback: false,
        responseMode: "fragment",
        flow: "standard",
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
  }, []);

  const login = () => {
    const currentPath = window.location.pathname;
    if (currentPath !== "/" && currentPath !== "/login") {
      localStorage.setItem("auth_redirect", currentPath);
    }

    keycloak.login({
      idpHint: "azure",
    });
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
