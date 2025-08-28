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
