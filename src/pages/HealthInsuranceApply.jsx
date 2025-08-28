import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Alert,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Snackbar,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import PersonalInfoForm from "../components/insurance/PersonalInfoForm";
import { applyForHealthInsurance } from "../services/insuranceService";
import { useNavigate } from "react-router-dom";

function HealthInsuranceApply() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      course: "",
      specialty: "",
      facultyNumber: "",
      city: "",
      street: "",
      block: "",
      entrance: "",
      floor: "",
      apartment: "",
      egn: "",
      phone: "",
    },
    declarationInfo: {
      hasEmploymentIncome: null,
      hasPension: null,
      hasOtherIncome: null,
      isCurrentlyInsured: null,
      insuredThrough: "",
    },
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxVisitedStep, setMaxVisitedStep] = useState(0);

  const steps = ["Лична информация", "Декларация"];

  const validateStep = (currentStep) => {
    setError("");

    switch (currentStep) {
      case 0:
        // Validate personal information
        const personalInfo = formData.personalInfo;
        if (!personalInfo.fullName || !personalInfo.facultyNumber || !personalInfo.egn) {
          setError("Моля попълнете всички задължителни полета.");
          return false;
        }
        break;
      case 1:
        // Validate declaration information
        const declarationInfo = formData.declarationInfo;
        if (
          declarationInfo.hasEmploymentIncome === null ||
          declarationInfo.hasPension === null ||
          declarationInfo.hasOtherIncome === null ||
          declarationInfo.isCurrentlyInsured === null
        ) {
          setError("Моля отговорете на всички въпроси в декларацията.");
          return false;
        }
        if (declarationInfo.isCurrentlyInsured === true && !declarationInfo.insuredThrough) {
          setError("Моля посочете през кого сте здравно осигуряван/а.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleStepClick = (stepIndex) => {
    // Allow navigation up to the highest step reached
    if (stepIndex <= maxVisitedStep) {
      setActiveStep(stepIndex);
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setMaxVisitedStep(Math.max(maxVisitedStep, nextStep));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setLoading(true);
    try {
      await applyForHealthInsurance(formData);

      setSubmitSuccess(true);
      setSnackbarMessage("Декларацията е подадена успешно!");
      setSnackbarOpen(true);

      // Redirect to forms page after successful submission
      setTimeout(() => {
        navigate("/forms");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
      setSnackbarMessage(
        error.response?.data?.message || "Възникна грешка при подаване на декларацията. Моля опитайте отново."
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  // Handler specifically for PersonalInfoForm component
  const handlePersonalInfoChange = (field, value) => {
    handleInputChange("personalInfo", field, value);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm formData={formData.personalInfo} handleInputChange={handlePersonalInfoChange} />;
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              ДЕКЛАРИРАМ
            </Typography>
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">1. Получавам доходи от трудова дейност:</FormLabel>
                <RadioGroup
                  value={
                    formData.declarationInfo.hasEmploymentIncome === null
                      ? ""
                      : String(formData.declarationInfo.hasEmploymentIncome)
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "declarationInfo",
                      "hasEmploymentIncome",
                      e.target.value === "true" ? true : false
                    )
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="ПОЛУЧАВАМ" />
                  <FormControlLabel value="false" control={<Radio />} label="НЕ ПОЛУЧАВАМ" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">2. Получавам пенсия:</FormLabel>
                <RadioGroup
                  value={
                    formData.declarationInfo.hasPension === null ? "" : String(formData.declarationInfo.hasPension)
                  }
                  onChange={(e) =>
                    handleInputChange("declarationInfo", "hasPension", e.target.value === "true" ? true : false)
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="ПОЛУЧАВАМ" />
                  <FormControlLabel value="false" control={<Radio />} label="НЕ ПОЛУЧАВАМ" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  3. Получавам други доходи, върху които се дължат здравноосигурителни вноски:
                </FormLabel>
                <RadioGroup
                  value={
                    formData.declarationInfo.hasOtherIncome === null
                      ? ""
                      : String(formData.declarationInfo.hasOtherIncome)
                  }
                  onChange={(e) =>
                    handleInputChange("declarationInfo", "hasOtherIncome", e.target.value === "true" ? true : false)
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="ПОЛУЧАВАМ" />
                  <FormControlLabel value="false" control={<Radio />} label="НЕ ПОЛУЧАВАМ" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">4. До настоящия момент:</FormLabel>
                <RadioGroup
                  value={
                    formData.declarationInfo.isCurrentlyInsured === null
                      ? ""
                      : String(formData.declarationInfo.isCurrentlyInsured)
                  }
                  onChange={(e) =>
                    handleInputChange("declarationInfo", "isCurrentlyInsured", e.target.value === "true" ? true : false)
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="СЪМ здравно осигуряван/а" />
                  <FormControlLabel value="false" control={<Radio />} label="НЕ СЪМ здравно осигуряван/а" />
                </RadioGroup>
              </FormControl>
              {formData.declarationInfo.isCurrentlyInsured === true && (
                <TextField
                  fullWidth
                  label="Здравно осигуряван/а чрез"
                  placeholder="Висше училище, самоосигуряващ се, работодател, средно училище, БА"
                  value={formData.declarationInfo.insuredThrough}
                  onChange={(e) => handleInputChange("declarationInfo", "insuredThrough", e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
            <Typography variant="body1" sx={{ mt: 4, fontWeight: "bold", textAlign: "center" }}>
              ЗАДЪЛЖАВАМ СЕ ДА ДЕКЛАРИРАМ НАСТЪПИЛИТЕ ОБСТОЯТЕЛСТВА В ТРИ (3) ДНЕВЕН СРОК ДА ПОПЪЛНЯ И ПОДАМ НОВА
              ДЕКЛАРАЦИЯ.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic", textAlign: "center" }}>
              (при започване на работа, смърт на родител, получаване на хонорари, смяна на форма на обучение, отписване
              от Висшето училище.)
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  ВАЖНО!
                </Typography>
                <Typography variant="body2">
                  ПРИ ЗАПОЧВАНЕ НА РАБОТА, СЕ ЗАДЪЛЖАВАМ ДА ПРЕДОСТАВЯ В ТРИ (3) ДНЕВЕН СРОК ДЕКЛАРАЦИЯ, ЧЕ ЗАПОЧВАМ
                  РАБОТА И ВИСШЕТО УЧИЛИЩЕ НЯМА ДА ПОЕМЕ МОИТЕ ЗДРАВНО ОСИГУРОВКИ, А РАБОТОДАТЕЛЯТ МИ.
                </Typography>
              </Alert>

              <Alert severity="error">
                <Typography variant="body2">
                  Известно ми е, че за неверни данни нося наказателна отговорност по чл.313 от НК.
                </Typography>
              </Alert>
            </Box>
          </Box>
        );
      default:
        return "Непозната стъпка";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Декларация за здравно осигуряване
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
          за учащите се във висши училища съгласно чл. 40(3), т 2 от Закона за здравно осигуряване
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* Responsive Stepper */}
        <Box
          sx={{
            overflowX: "auto",
            mb: 4,
            px: 0.5,
            py: 1,
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
              minWidth: isMobile ? "unset" : "unset",
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
                  {activeStep === steps.length - 1 ? "Подай декларация" : "Напред"}
                </span>
                <CircularProgress size={24} color="inherit" />
              </>
            ) : activeStep === steps.length - 1 ? (
              "Подай декларация"
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

export default HealthInsuranceApply;
