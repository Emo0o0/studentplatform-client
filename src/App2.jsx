import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

// Import pages
import WeeklySchedule from "./pages/WeeklySchedule.jsx";
import Curriculum from "./pages/Curriculum";
import Grades from "./pages/Grades";
import Forms from "./pages/Forms";
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
          <Route path="/profile" element={<PersonalInfo />} />
          <Route path="/queries" element={<Queries />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
