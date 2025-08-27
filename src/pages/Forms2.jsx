// import React from "react";
// import { Container, Typography, Grid, Card, CardContent, Alert } from "@mui/material";
// import { Assignment as AssignmentIcon } from "@mui/icons-material";

// function Forms() {
//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h3" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//         <AssignmentIcon fontSize="large" color="primary" />
//         Формуляри
//       </Typography>

//       <Alert severity="info" sx={{ mb: 4 }}>
//         Тази секция ще бъде разработена скоро. Тук ще можете да намерите различни формуляри за попълване.
//       </Alert>

//       <Grid container spacing={3}>
//         {[
//           { title: "Заявление за академична справка", description: "Подайте заявление за академична справка" },
//           { title: "Заявление за отсрочка", description: "Заявете отсрочка на изпит" },
//           { title: "Оценка на преподавател", description: "Оценете качеството на преподаване" },
//         ].map((form, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Card sx={{ height: "100%" }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {form.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {form.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default Forms;

import React, { useMemo, useState } from "react";
import { Box, Container, Paper, Stepper, Step, StepLabel, Typography, Button, Divider } from "@mui/material";
import ScholarshipTypeStep from "../components/ScholarshipTypeStep";
import PersonalInfoStep from "../components/PersonalInfoStep";
import IncomeInfoStep from "../components/IncomeInfoStep";
import BankInfoStep from "../components/BankInfoStep";
import ReviewStep from "../components/ReviewStep";

function Forms() {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    scholarshipType: "",
    personalInfo: {},
    incomeInfo: {},
    bankInfo: {},
  });

  const steps = ["Тип стипендия", "Лична информация", "Доходи", "Банкова информация", "Преглед"];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    // Your submit logic here
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ScholarshipTypeStep
            formData={formData}
            onChange={(data) => setFormData({ ...formData, scholarshipType: data })}
          />
        );
      case 1:
        return (
          <PersonalInfoStep formData={formData} onChange={(data) => setFormData({ ...formData, personalInfo: data })} />
        );
      case 2:
        return (
          <IncomeInfoStep formData={formData} onChange={(data) => setFormData({ ...formData, incomeInfo: data })} />
        );
      case 3:
        return <BankInfoStep formData={formData} onChange={(data) => setFormData({ ...formData, bankInfo: data })} />;
      case 4:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Заявление за стипендия
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, mb: 2 }}>{getStepContent(activeStep)}</Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Назад
          </Button>
          <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
            {activeStep === steps.length - 1 ? "Подай заявление" : "Напред"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Forms;
