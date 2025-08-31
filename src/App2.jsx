// Update the import and route for HealthInsuranceTerminate
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

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

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <Navigation />
        <Routes>
          <Route path="/" />
          <Route path="/schedule" element={<WeeklySchedule />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/health-insurance" element={<HealthInsuranceApply />} />
          <Route path="/health-insurance-previous" element={<HealthInsurancePrevious />} />
          <Route path="/health-insurance-terminate" element={<HealthInsuranceTerminate />} />
          <Route path="/dormitory-keep-room" element={<DormitoryKeepRoom />} />
          <Route path="/dormitory-apply" element={<DormitoryApply />} />
          <Route path="/profile" element={<PersonalInfo />} />
          <Route path="/queries" element={<Queries />} />
          <Route path="/my-forms" element={<ViewScholarshipForms />} />
          <Route path="/my-insurance-forms" element={<ViewInsuranceForms />} />
          <Route path="/my-dormitory-forms" element={<ViewDormitoryForms />} />
          <Route path="/view-forms" element={<ViewFormsSelection />} />
          <Route path="/admin/forms" element={<AdminFormsSelection />} />
          <Route path="/admin/forms/scholarship" element={<AdminScholarshipForms />} />
          <Route path="/admin/forms/insurance" element={<AdminInsuranceForms />} />
          <Route path="/admin/forms/dormitory" element={<AdminDormitoryForms />} />
        </Routes>
      </Box>
    </Router>
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
