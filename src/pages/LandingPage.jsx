import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useAuth } from "../config/AuthContext";

const LandingPage = () => {
  const { authenticated, login, loading } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Student Platform
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Welcome to the Student Management Platform
        </Typography>

        {!loading && !authenticated && (
          <Button variant="contained" color="primary" size="large" onClick={login} sx={{ mt: 4 }}>
            Sign In
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default LandingPage;
