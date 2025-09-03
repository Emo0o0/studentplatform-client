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
  TextField,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { applyForPreviousHealthInsurance } from "../services/insuranceService";
import { useNavigate } from "react-router-dom";
import PersonalInfoStep from "../components/scholarship/PersonalInfoStep";
import AcademicInfoStep from "../components/scholarship/AcademicInfoStep";

function HealthInsurancePrevious() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    personalInfo: {},
    academicInfo: {},
    previousYearInfo: {
      academicYear: "",
      gdprConsent: false,
    },
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxVisitedStep, setMaxVisitedStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [personalInfoValid, setPersonalInfoValid] = useState(false);
  const [academicInfoValid, setAcademicInfoValid] = useState(false);

  const steps = ["Лична информация", "Академична информация", "Декларация за минал период"];

  const validateStep = (currentStep) => {
    setError("");

    switch (currentStep) {
      case 0:
        const personalInfo = formData.personalInfo;
        if (!personalInfoValid) {
          setError("Моля попълнете всички задължителни полета.");
          return false;
        }
        break;
      case 1:
        const academicInfo = formData.academicInfo;
        if (!academicInfoValid) {
          setError("Моля попълнете всички задължителни академични полета.");
          return false;
        }
        break;
      case 2:
        const previousYearInfo = formData.previousYearInfo;
        if (!previousYearInfo.academicYear) {
          setError("Моля посочете академичната година, за която се отнася декларацията.");
          return false;
        }
        if (!previousYearInfo.gdprConsent) {
          setError("Необходимо е да дадете съгласие за обработка на личните данни.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleStepClick = (stepIndex) => {
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
      const transformedFormData = {
        personalInfo: {
          ...formData.personalInfo,
          fullName: `${formData.personalInfo.firstName || ""} ${formData.personalInfo.middleName || ""} ${
            formData.personalInfo.lastName || ""
          }`.trim(),
          facultyNumber: formData.academicInfo.facultyNumber || "",
          course: formData.academicInfo.courseYear || "",
          specialty: formData.academicInfo.specialty || "",
          faculty: formData.academicInfo.faculty || "",
        },
        previousYearInfo: formData.previousYearInfo,
      };

      await applyForPreviousHealthInsurance(transformedFormData);

      setIsSubmitted(true);
      setSubmitSuccess(true);
      setSnackbarMessage("Декларацията е подадена успешно!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/forms");
      }, 3000);
    } catch (error) {
      setIsSubmitted(false);
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

  const handlePersonalInfoChange = (data) => {
    setFormData({
      ...formData,
      personalInfo: data,
    });
  };

  const handleAcademicInfoChange = (data) => {
    setFormData({
      ...formData,
      academicInfo: data,
    });
  };

  const handleCheckboxChange = (field) => (event) => {
    handleInputChange("previousYearInfo", field, event.target.checked);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData.personalInfo}
            onChange={handlePersonalInfoChange}
            onValidationChange={setPersonalInfoValid}
          />
        );
      case 1:
        return (
          <AcademicInfoStep
            formData={formData.academicInfo}
            onChange={handleAcademicInfoChange}
            onValidationChange={setAcademicInfoValid}
          />
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              Декларация за минал период
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" paragraph>
                Декларирам, че не съм подал декларация за здравно осигуряване в началото на учебната
              </Typography>

              <TextField
                required
                fullWidth
                label="Академична година"
                placeholder="напр. 2024/2025"
                value={formData.previousYearInfo.academicYear}
                onChange={(e) => handleInputChange("previousYearInfo", "academicYear", e.target.value)}
                sx={{ mb: 2 }}
              />

              <Typography variant="body1" paragraph>
                година, поради което имам непогасени здравни осигуровки. Моля, същите да ми бъдат погасени, като за този
                период не съм:
              </Typography>

              <Box sx={{ pl: 3 }}>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Получавал доходи на трудово основание
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Получавал пенсия
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Получавал други доходи, върху които се дължат здравно осигурителни вноски по реда на чл. 40, ал. 1 от
                  ЗЗО
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" paragraph>
                Съгласен/на съм Технически университет – Варна да съхранява и обработва личните ми данни, съгласно
                разпоредбите на Закон за защита на личните данни и Регламент (ЕС) 2016/679 на Европейския парламент и на
                Съвета от 27.04.2016 – относно защита на физическите лица във връзка с обработката на лични данни.
              </Typography>

              <Typography variant="body1" paragraph>
                Давам съгласие за обработване на личните ми данни за следните цели:
              </Typography>

              <Typography variant="body1" paragraph sx={{ pl: 3 }}>
                - Обработка и подаване на информация за здравноосигурителния статус, Декларация – към НАП.
              </Typography>

              <Typography variant="body1" paragraph>
                Запознат/а съм с:
              </Typography>

              <Box sx={{ pl: 3 }}>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Целта и средствата за обрабока на личните ми данни;
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Правото да оттегля съгласието си по всяко време, като оттеглянето на съгласието не засяга
                  законосъобразността на обработването, основано на дадено съгласие преди неговото оттегляне;
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Доброволния характер на предоставянето на данните;
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FiberManualRecordIcon fontSize="small" sx={{ mr: 1 }} />
                  Правото на достъп, коригиране и изтриване на събраните данни.
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={formData.previousYearInfo.gdprConsent}
                    onChange={handleCheckboxChange("gdprConsent")}
                  />
                }
                label="Съгласен/на съм с обработката на личните ми данни"
                sx={{ mt: 2 }}
              />
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
          за минал период - за учащите се във висши училища съгласно чл. 40(3), т 2 от Закона за здравно осигуряване
        </Typography>
        <Divider sx={{ mb: 4 }} />

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
            disabled={loading || (activeStep === steps.length - 1 && isSubmitted)}
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

export default HealthInsurancePrevious;
