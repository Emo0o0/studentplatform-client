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
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { terminateHealthInsurance } from "../services/insuranceService";
import { useNavigate } from "react-router-dom";
import PersonalInfoStep from "../components/scholarship/PersonalInfoStep";
import AcademicInfoStep from "../components/scholarship/AcademicInfoStep";

function HealthInsuranceTerminate() {
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
    terminationInfo: {
      terminationDate: null,
      terminationReason: "",
      gdprConsent: false,
    },
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxVisitedStep, setMaxVisitedStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [personalInfoValid, setPersonalInfoValid] = useState(false);
  const [academicInfoValid, setAcademicInfoValid] = useState(false);

  const steps = ["Лична информация", "Академична информация", "Заявление за спиране"];

  const validateStep = (currentStep) => {
    setError("");

    switch (currentStep) {
      case 0:
        // Validate personal information
        const personalInfo = formData.personalInfo;
        if (!personalInfoValid) {
          setError("Моля попълнете всички задължителни полета.");
          return false;
        }
        break;
      case 1:
        // Validate academic information
        const academicInfo = formData.academicInfo;
        if (!academicInfoValid) {
          setError("Моля попълнете всички задължителни академични полета.");
          return false;
        }
        break;
      case 2:
        // Validate termination information
        const terminationInfo = formData.terminationInfo;
        if (!terminationInfo.terminationDate) {
          setError("Моля посочете от коя дата желаете да бъдат прекратени здравните осигуровки.");
          return false;
        }
        if (!terminationInfo.terminationReason) {
          setError("Моля посочете причината за прекратяване.");
          return false;
        }
        if (!terminationInfo.gdprConsent) {
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
      // Transform data to match the format expected by the service
      const transformedFormData = {
        personalInfo: {
          ...formData.personalInfo,
          // Create fullName from firstName, middleName, and lastName
          fullName: `${formData.personalInfo.firstName || ""} ${formData.personalInfo.middleName || ""} ${
            formData.personalInfo.lastName || ""
          }`.trim(),
          // Map academic info to personalInfo structure as expected by the service
          facultyNumber: formData.academicInfo.facultyNumber || "",
          course: formData.academicInfo.courseYear || "",
          specialty: formData.academicInfo.specialty || "",
          faculty: formData.academicInfo.faculty || "",
        },
        terminationInfo: formData.terminationInfo,
      };

      await terminateHealthInsurance(transformedFormData);

      setIsSubmitted(true);
      setSubmitSuccess(true);
      setSnackbarMessage("Заявлението е подадено успешно!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/forms");
      }, 3000);
    } catch (error) {
      setIsSubmitted(false);
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
      setSnackbarMessage(
        error.response?.data?.message || "Възникна грешка при подаване на заявлението. Моля опитайте отново."
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

  // Handler for PersonalInfoStep component
  const handlePersonalInfoChange = (data) => {
    setFormData({
      ...formData,
      personalInfo: data,
    });
  };

  // Handler for AcademicInfoStep component
  const handleAcademicInfoChange = (data) => {
    setFormData({
      ...formData,
      academicInfo: data,
    });
  };

  const handleCheckboxChange = (field) => (event) => {
    handleInputChange("terminationInfo", field, event.target.checked);
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
              Заявление за спиране на здравно осигуряване
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" paragraph>
                Моля, да ми бъдат прекратени здравните осигуровки
              </Typography>

              <Box sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="От дата"
                    value={formData.terminationInfo.terminationDate}
                    onChange={(newValue) => {
                      handleInputChange("terminationInfo", "terminationDate", newValue);
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Поради:
                </Typography>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="започване на работа, смърт на родител, получаване на хонорари, смяна на формата на обучение, отписване от ВУ"
                  value={formData.terminationInfo.terminationReason}
                  onChange={(e) => handleInputChange("terminationInfo", "terminationReason", e.target.value)}
                  helperText="Например: започване на работа, смърт на родител, получаване на хонорари, смяна на формата на обучение, отписване от ВУ"
                />
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
                    checked={formData.terminationInfo.gdprConsent}
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
          Заявление за спиране на здравно осигуряване
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

export default HealthInsuranceTerminate;
