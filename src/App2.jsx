// Update the import and route for HealthInsuranceTerminate
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AuthProvider } from "./config/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./config/AuthContext";
// Import pages
import WeeklySchedule from "./pages/WeeklySchedule.jsx";
import Curriculum from "./pages/Curriculum";
import Grades from "./pages/Grades";
import Forms from "./pages/Forms";
import Scholarship from "./pages/Scholarship";
import HealthInsuranceApply from "./pages/HealthInsuranceApply.jsx";
import HealthInsurancePrevious from "./pages/HealthInsurancePrevious.jsx";
import HealthInsuranceTerminate from "./pages/HealthInsuranceTerminate.jsx"; // Import the new component
import DormitoryKeepRoom from "./pages/DormitoryKeepRoom.jsx";
import DormitoryApply from "./pages/DormitoryApply.jsx";
import PersonalInfo from "./pages/PersonalInfo";
import Queries from "./pages/QueriesPage.jsx";
import ViewScholarshipForms from "./pages/ViewScholarshipForms.jsx";
import ViewInsuranceForms from "./pages/ViewInsuranceForms.jsx";
import ViewDormitoryForms from "./pages/ViewDormitoryForms.jsx";
import ViewFormsSelection from "./pages/ViewFormsSelection.jsx";
import AdminFormsSelection from "./pages/AdminFormsSelection.jsx";
import AdminScholarshipForms from "./pages/AdminScholarshipForms.jsx";
import AdminInsuranceForms from "./pages/AdminInsuranceForms.jsx";
import AdminDormitoryForms from "./pages/AdminDormitoryForms.jsx";

// Import components
import Navigation from "./components/Navigation";

// Update HomePage component
const HomePage = () => {
  const { authenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Handle redirect after login
  useEffect(() => {
    if (authenticated && !loading) {
      const redirectPath = localStorage.getItem("auth_redirect");
      if (redirectPath) {
        console.log("Found redirect path after login:", redirectPath);
        localStorage.removeItem("auth_redirect");
        navigate(redirectPath);
      }
    }
  }, [authenticated, loading, navigate]);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {authenticated ? "" : "Добре дошли"}
      </Typography>
      <Typography variant="body1">
        {authenticated ? "" : "Моля, влезте в акаунта си, за да получите достъп до студентските услуги."}
      </Typography>
    </Box>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <WeeklySchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curriculum"
              element={
                <ProtectedRoute>
                  <Curriculum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grades"
              element={
                <ProtectedRoute>
                  <Grades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forms"
              element={
                <ProtectedRoute>
                  <Forms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scholarship"
              element={
                <ProtectedRoute>
                  <Scholarship />
                </ProtectedRoute>
              }
            />
            <Route
              path="/health-insurance"
              element={
                <ProtectedRoute>
                  <HealthInsuranceApply />
                </ProtectedRoute>
              }
            />
            <Route
              path="/health-insurance-previous"
              element={
                <ProtectedRoute>
                  <HealthInsurancePrevious />
                </ProtectedRoute>
              }
            />
            <Route
              path="/health-insurance-terminate"
              element={
                <ProtectedRoute>
                  <HealthInsuranceTerminate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dormitory-keep-room"
              element={
                <ProtectedRoute>
                  <DormitoryKeepRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dormitory-apply"
              element={
                <ProtectedRoute>
                  <DormitoryApply />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PersonalInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/queries"
              element={
                <ProtectedRoute>
                  <Queries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-forms"
              element={
                <ProtectedRoute>
                  <ViewScholarshipForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-insurance-forms"
              element={
                <ProtectedRoute>
                  <ViewInsuranceForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-dormitory-forms"
              element={
                <ProtectedRoute>
                  <ViewDormitoryForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-forms"
              element={
                <ProtectedRoute>
                  <ViewFormsSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/forms"
              element={
                <ProtectedRoute>
                  <AdminFormsSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/forms/scholarship"
              element={
                <ProtectedRoute>
                  <AdminScholarshipForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/forms/insurance"
              element={
                <ProtectedRoute>
                  <AdminInsuranceForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/forms/dormitory"
              element={
                <ProtectedRoute>
                  <AdminDormitoryForms />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
}

function ComingSoon({ title }) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <h2>{title}</h2>
      <p>This feature is coming soon. Please check back later.</p>
    </Box>
  );
}

export default App;
