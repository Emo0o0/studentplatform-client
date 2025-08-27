import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
import AcademicInfoStep from "../components/scholarship/AcademicInfoStep";
import { handleScholarshipSubmit } from "../services/scholarshipService";

function Forms() {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    scholarshipType: "",
    personalInfo: {},
    specificInfo: {},
    incomeInfo: {},
    bankInfo: {},
    documents: [],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validateStep = (currentStep) => {
    setError("");

    switch (currentStep) {
      case 0:
        if (!formData.scholarshipType) {
          setError("Моля изберете тип стипендия");
          return false;
        }
        break;
      case 1: // Personal Info
        const requiredPersonalFields = [
          "firstName",
          "lastName",
          "egn",
          "email",
          "phone",
          "city",
          "street",
          "streetNumber",
        ];
        const missingPersonal = requiredPersonalFields.find((field) => !formData.personalInfo[field]);
        if (missingPersonal) {
          setError("Моля попълнете всички задължителни полета");
          return false;
        }
        break;
      case 2:
        const requiredAcademicFields = ["facultyNumber", "faculty", "specialty"];
        const missingAcademic = requiredAcademicFields.find((field) => !formData.academicInfo[field]);
        if (missingAcademic) {
          setError("Моля попълнете всички задължителни академични данни");
          return false;
        }
        break;
      // ...existing validation cases...
    }
    return true;
  };

  const getSteps = () => {
    const baseSteps = ["Тип стипендия", "Лична информация", "Академична информация"];

    switch (formData.scholarshipType) {
      case "MERIT_SUCCESS":
        return [...baseSteps, "Успех", "Банкова информация", "Документи", "Преглед"];
      case "MERIT_WITH_INCOME":
        return [...baseSteps, "Успех", "Доходи", "Банкова информация", "Документи", "Преглед"];
      case "SOCIAL_PREFERENTIAL":
        return [...baseSteps, "Успех", "Социално основание", "Банкова информация", "Документи", "Преглед"];
      case "FIRST_YEAR":
        return [...baseSteps, "Кандидатстудентски изпити", "Банкова информация", "Документи", "Преглед"];
      case "SPECIAL_ACHIEVEMENTS":
        return [...baseSteps, "Успех", "Постижения", "Банкова информация", "Документи", "Преглед"];
      case "FOREIGN_STUDENT":
        return [...baseSteps, "Успех", "Банкова информация", "Документи", "Преглед"];
      default:
        return [...baseSteps, "Успех", "Банкова информация", "Документи", "Преглед"];
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
      // Show loading indicator
      setLoading(true);

      const result = await handleScholarshipSubmit(formData);

      if (result.success) {
        // Show success message
        setSnackbarMessage("Заявлението е изпратено успешно!");
        setSubmitSuccess(true);
        setSnackbarOpen(true);

        // Optional: redirect or reset form
        // history.push("/dashboard");
        // or
        // resetForm();
      } else {
        // Show error message
        setError(result.error);
        setSnackbarMessage(result.error);
        setSubmitSuccess(false);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Възникна проблем при подаване на заявлението. Моля, опитайте отново по-късно.");
      setSnackbarMessage("Възникна проблем при подаване на заявлението.");
      setSubmitSuccess(false);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
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
          <PersonalInfoStep
            formData={formData.personalInfo}
            onChange={(data) => setFormData({ ...formData, personalInfo: data })}
          />
        );
      case "Академична информация":
        return (
          <AcademicInfoStep
            formData={formData.academicInfo}
            onChange={(data) => setFormData({ ...formData, academicInfo: data })}
          />
        );
      case "Успех":
        return (
          <MeritSuccessStep
            formData={formData.specificInfo}
            onChange={(data) => setFormData({ ...formData, specificInfo: data })}
          />
        );
      case "Доходи":
        return (
          <MeritIncomeStep
            formData={formData} // Pass the entire formData object
            onChange={(updatedFormData) => {
              console.log("MeritIncomeStep onChange called with:", updatedFormData);
              setFormData(updatedFormData);
            }}
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

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Заявление за стипендия
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
          Кликнете върху стъпките, за да навигирате между тях
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* Responsive Stepper */}
        <Box
          sx={{
            overflowX: "auto",
            mb: 4,
            // Add small padding to prevent focus outline clipping
            px: 0.5,
            py: 1,
            // Remove scrollbar in most browsers but keep functionality
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "6px",
            },
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{
              minWidth: isMobile ? "unset" : steps.length > 5 ? "700px" : "unset",
              "& .MuiStepLabel-label": {
                mt: isMobile ? 0 : 1,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={index <= maxVisitedStep && index < activeStep}
                sx={{
                  cursor: index <= maxVisitedStep ? "pointer" : "default",
                  "& .MuiStepLabel-label": {
                    color: index <= maxVisitedStep ? "text.primary" : "text.disabled",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
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
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 2, mb: 2 }}>{getStepContent(activeStep)}</Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            disabled={activeStep === 0 || loading}
            onClick={() => setActiveStep(activeStep - 1)}
            fullWidth={isMobile}
          >
            Назад
          </Button>

          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={loading}
            fullWidth={isMobile}
            sx={{
              position: "relative",
              "& .MuiCircularProgress-root": {
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: "-12px",
                marginTop: "-12px",
              },
            }}
          >
            {loading ? (
              <>
                <span style={{ visibility: "hidden" }}>
                  {activeStep === steps.length - 1 ? "Подай заявление" : "Напред"}
                </span>
                <CircularProgress size={24} color="inherit" />
              </>
            ) : activeStep === steps.length - 1 ? (
              "Подай заявление"
            ) : (
              "Напред"
            )}
          </Button>
        </Box>
      </Paper>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={submitSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Forms;
