import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import { Box, CircularProgress, Typography, Button } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { authenticated, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && !authenticated) {
      console.log("Not authenticated, redirecting to login immediately");
      const currentPath = window.location.pathname;
      localStorage.setItem("auth_redirect", currentPath);

      setTimeout(() => {
        login();
      }, 100);
    }
  }, [loading, authenticated, login]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Зареждане...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, show a message briefly before redirect occurs
  if (!authenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Пренасочване към страницата за вход...
        </Typography>
      </Box>
    );
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
