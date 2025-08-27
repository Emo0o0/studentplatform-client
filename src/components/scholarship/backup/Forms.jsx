import React, { useState } from "react";
import { Box, Container, Paper, Stepper, Step, StepLabel, Typography, Button, Divider, Alert } from "@mui/material";
import ScholarshipTypeStep from "../components/scholarship/ScholarshipTypeStep";
import PersonalInfoStep from "../components/scholarship/PersonalInfoStep";
import MeritSuccessStep from "../components/scholarship/MeritSuccessStep";
import MeritIncomeStep from "../components/scholarship/MeritIncomeStep";
import SocialScholarshipStep from "../components/scholarship/SocialScholarshipStep";
import FirstYearStep from "../components/scholarship/FirstYearStep";
import SpecialAchievementsStep from "../components/scholarship/SpecialAchievementsStep";
import ForeignStudentStep from "../components/scholarship/ForeignStudentStep";
import BankInfoStep from "../components/scholarship/BankInfoStep";
import DocumentUploadStep from "../components/scholarship/DocumentUploadStep";
import ReviewStep from "../components/scholarship/ReviewStep";

function Forms() {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    scholarshipType: "",
    personalInfo: {},
    specificInfo: {},
    bankInfo: {},
    documents: [],
  });

  const validateStep = (currentStep) => {
    setError("");

    switch (currentStep) {
      case 0:
        if (!formData.scholarshipType) {
          setError("Моля изберете тип стипендия");
          return false;
        }
        break;
      case 1:
        if (!formData.personalInfo?.facultyNumber) {
          setError("Моля въведете факултетен номер");
          return false;
        }
        break;
      // ...existing validation cases...
    }
    return true;
  };

  const getSteps = () => {
    const baseSteps = ["Тип стипендия", "Лична информация"];

    switch (formData.scholarshipType) {
      case "MERIT_SUCCESS":
        return [...baseSteps, "Успех", "Банкова информация", "Документи", "Преглед"];
      case "MERIT_WITH_INCOME":
        return [...baseSteps, "Успех и доходи", "Банкова информация", "Документи", "Преглед"];
      case "SOCIAL_PREFERENTIAL":
        return [...baseSteps, "Социално основание", "Банкова информация", "Документи", "Преглед"];
      case "FIRST_YEAR":
        return [...baseSteps, "Кандидатстудентски изпити", "Банкова информация", "Документи", "Преглед"];
      case "SPECIAL_ACHIEVEMENTS":
        return [...baseSteps, "Постижения", "Банкова информация", "Документи", "Преглед"];
      case "FOREIGN_STUDENT":
        return [...baseSteps, "Произход", "Банкова информация", "Документи", "Преглед"];
      default:
        return [...baseSteps, "Банкова информация", "Документи", "Преглед"];
    }
  };

  const [maxVisitedStep, setMaxVisitedStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    // Allow navigation up to the highest step reached
    if (stepIndex <= maxVisitedStep) {
      setActiveStep(stepIndex);
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => {
        const nextStep = prevStep + 1;
        setMaxVisitedStep(Math.max(maxVisitedStep, nextStep));
        return nextStep;
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              scholarshipType: formData.scholarshipType,
              personalInfo: formData.personalInfo,
              specificInfo: formData.specificInfo,
              bankInfo: formData.bankInfo,
            }),
          ],
          { type: "application/json" }
        )
      );

      formData.documents.forEach((doc) => {
        formDataToSend.append("documents", doc);
      });

      console.log([...formDataToSend]);

      const response = await fetch(`${API_BASE}/scholarship/apply`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Неуспешно подаване на заявление");
      }

      // Handle success
      setError("");
      // Reset form or redirect
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const getStepContent = (step) => {
    const steps = getSteps();
    const stepName = steps[step];

    switch (stepName) {
      case "Тип стипендия":
        return (
          <ScholarshipTypeStep
            formData={formData}
            onChange={(type) => setFormData({ ...formData, scholarshipType: type })}
          />
        );
      case "Лична информация":
        return (
          <PersonalInfoStep formData={formData} onChange={(data) => setFormData({ ...formData, personalInfo: data })} />
        );
      case "Успех":
        return (
          <MeritSuccessStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Успех и доходи":
        return (
          <MeritIncomeStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Социално основание":
        return (
          <SocialScholarshipStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Кандидатстудентски изпити":
        return (
          <FirstYearStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Постижения":
        return (
          <SpecialAchievementsStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Произход":
        return (
          <ForeignStudentStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Банкова информация":
        return <BankInfoStep formData={formData} onChange={(data) => setFormData({ ...formData, bankInfo: data })} />;
      case "Документи":
        return (
          <DocumentUploadStep
            formData={formData}
            scholarshipType={formData.scholarshipType}
            onChange={(data) => setFormData({ ...formData, documents: data.documents })}
          />
        );
      case "Преглед":
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  const steps = getSteps();

  // ...existing code...

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Заявление за стипендия
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
          Кликнете върху стъпките, за да навигирате между тях
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={index <= maxVisitedStep && index < activeStep}
              sx={{
                cursor: index <= maxVisitedStep ? "pointer" : "default",
                "& .MuiStepLabel-label": {
                  color: index <= maxVisitedStep ? "text.primary" : "text.disabled",
                },
                "& .MuiStepIcon-root": {
                  color: index <= maxVisitedStep ? "primary.main" : "grey.400",
                },
                "&:hover .MuiStepLabel-label": {
                  color: index <= maxVisitedStep ? "primary.main" : "text.disabled",
                },
              }}
              onClick={() => handleStepClick(index)}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 2, mb: 2 }}>{getStepContent(activeStep)}</Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
            {activeStep === steps.length - 1 ? "Подай заявление" : "Напред"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Forms;
