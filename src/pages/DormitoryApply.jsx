import React, { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalInfoStep from "../components/scholarship/PersonalInfoStep";
import AcademicInfoStep from "../components/scholarship/AcademicInfoStep";
import FamilyMembersForm from "../components/dormitory/FamilyMembersForm";
import { keepDormitoryRoom, applyForDormitory } from "../services/dormitoryService";
import { DEGREE_LEVELS } from "../constants/dropdownOptions";

function DormitoryApply() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from location state if available
  const keepRoomFormId = location.state?.keepRoomFormId || null;
  const keepRoomData = location.state?.keepRoomData || null;

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [maxVisitedStep, setMaxVisitedStep] = useState(0);
  const [wantsToKeepRoom, setWantsToKeepRoom] = useState(false);
  const [noOwnHousing, setNoOwnHousing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [personalInfoValid, setPersonalInfoValid] = useState(false);
  const [academicInfoValid, setAcademicInfoValid] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {},
    academicInfo: {},
    dormitoryInfo: {
      degreeLevel: "BACHELOR",
      buildingNumber: keepRoomData?.buildingNumber || "",
      roomNumber: keepRoomData?.roomNumber || "",
      academicYear: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
      keepSameRoom: false,
    },
    familyInfo: {
      father: { name: "", address: "", phone: "" },
      mother: { name: "", address: "", phone: "" },
      siblings: [],
      spouse: { name: "", address: "", phone: "" },
      children: [],
    },
  });

  useEffect(() => {
    if (keepRoomData) {
      setFormData((prevState) => ({
        ...prevState,
        dormitoryInfo: {
          ...prevState.dormitoryInfo,
          buildingNumber: keepRoomData.buildingNumber || "",
          roomNumber: keepRoomData.roomNumber || "",
          academicYear: keepRoomData.academicYear || prevState.dormitoryInfo.academicYear,
        },
      }));

      setWantsToKeepRoom(true);
    }
  }, [keepRoomData]);

  useEffect(() => {
    if (!wantsToKeepRoom && keepRoomData) {
      setFormData((prevState) => ({
        ...prevState,
        dormitoryInfo: {
          ...prevState.dormitoryInfo,
          roomNumber: "",
          buildingNumber:
            keepRoomData.buildingNumber === prevState.dormitoryInfo.buildingNumber
              ? ""
              : prevState.dormitoryInfo.buildingNumber,
        },
      }));
    }
  }, [wantsToKeepRoom, keepRoomData]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = ["Лична информация", "Академична информация", "Данни за общежитие", "Семейство"];

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

  const handleDormitoryInfoChange = (field, value) => {
    handleInputChange("dormitoryInfo", field, value);
  };

  const handleFamilyInfoChange = (field, value) => {
    handleInputChange("familyInfo", field, value);
  };

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
        const academicInfo = formData.academicInfo;
        if (!academicInfoValid) {
          setError("Моля попълнете всички задължителни академични полета.");
          return false;
        }
        break;
      case 2:
        const dormitoryInfo = formData.dormitoryInfo;
        if (wantsToKeepRoom && !dormitoryInfo.roomNumber) {
          setError("Моля посочете номер на стая, която искате да запазите.");
          return false;
        }
        break;
      case 3:
        if (!noOwnHousing) {
          setError(
            "Моля потвърдете, че вие или член от семейството ви НЕ ПРИТЕЖАВА собствено годно за обитаване жилище."
          );
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
      let keepRoomId = keepRoomFormId;
      setIsSubmitted(true);

      if (wantsToKeepRoom && !keepRoomId) {
        const keepRoomResponse = await keepDormitoryRoom({
          buildingNumber: formData.dormitoryInfo.buildingNumber,
          roomNumber: formData.dormitoryInfo.roomNumber,
          academicYear: formData.dormitoryInfo.academicYear,
        });
        keepRoomId = keepRoomResponse.formId;
      }

      const transformedData = {
        personalInfo: {
          fullName: `${formData.personalInfo.firstName || ""} ${formData.personalInfo.middleName || ""} ${
            formData.personalInfo.lastName || ""
          }`.trim(),
          course: formData.academicInfo.courseYear || "",
          specialty: formData.academicInfo.specialty || "",
          facultyNumber: formData.academicInfo.facultyNumber || "",
          city: formData.personalInfo.city || "",
          street: formData.personalInfo.street || "",
          block: formData.personalInfo.block || "",
          entrance: formData.personalInfo.entrance || "",
          floor: formData.personalInfo.floor || "",
          apartment: formData.personalInfo.apartment || "",
          egn: formData.personalInfo.egn || "",
          phone: formData.personalInfo.phone || "",
          email: formData.personalInfo.email || "",
          faculty: formData.academicInfo.faculty || "",
          semester: formData.academicInfo.semester || "",
        },
        dormitoryInfo: formData.dormitoryInfo,
        familyInfo: formData.familyInfo,
      };

      await applyForDormitory(transformedData, wantsToKeepRoom ? keepRoomId : null);

      setSubmitSuccess(true);
      setSnackbarMessage("Заявлението е подадено успешно!");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/forms");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
      setSnackbarMessage(error.message || "Възникна грешка при подаване на заявлението. Моля опитайте отново.");
      setSnackbarOpen(true);
      setIsSubmitted(false);
    } finally {
      setLoading(false);
    }
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Учебна година" value={formData.dormitoryInfo.academicYear} disabled fullWidth />

            <FormControlLabel
              control={
                <Checkbox
                  checked={wantsToKeepRoom}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setWantsToKeepRoom(isChecked);

                    if (isChecked && keepRoomData) {
                      setFormData((prevState) => ({
                        ...prevState,
                        dormitoryInfo: {
                          ...prevState.dormitoryInfo,
                          buildingNumber: keepRoomData.buildingNumber || "",
                          roomNumber: keepRoomData.roomNumber || "",
                        },
                      }));
                    }
                  }}
                />
              }
              label="Искам да запазя същата стая от предходната година"
            />

            {wantsToKeepRoom && (
              <Alert severity="info">
                Съгласно чл. 10, ал. 1, т. 4 и чл. 12, ал. 2 от Правилника за настаняване и реда на ползване на
                студентските общежития и столове към Технически университет – Варна, заявявам желанието си да ползвам
                стаята, в която съм бил настанен предходната година.
              </Alert>
            )}

            {wantsToKeepRoom ? (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  required
                  label="Блок №"
                  type="number"
                  value={formData.dormitoryInfo.buildingNumber}
                  onChange={(e) => handleDormitoryInfoChange("buildingNumber", e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <TextField
                  required
                  label="Стая №"
                  type="number"
                  value={formData.dormitoryInfo.roomNumber}
                  onChange={(e) => handleDormitoryInfoChange("roomNumber", e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            ) : null}
          </Box>
        );
      case 3:
        return (
          <Box>
            <FamilyMembersForm familyInfo={formData.familyInfo} handleFamilyInfoChange={handleFamilyInfoChange} />

            <Box sx={{ mt: 4, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={noOwnHousing} onChange={(e) => setNoOwnHousing(e.target.checked)} />}
                label={
                  <Typography fontWeight="bold">
                    Аз или член от семейството ми НЕ ПРИТЕЖАВА собствено годно за обитаване жилище и не е настанено в
                    държавно, общинско или ведомствено жилище в гр. Варна.
                  </Typography>
                }
              />
            </Box>

            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Известно ми е, че за вписване на неверни или непълни данни в тази декларация нося наказателна
                отговорност по чл. 313 от Наказателния кодекс.
              </Typography>
            </Alert>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Комисията по социално-битовите въпроси на учащите (КСБВУ) си има право да изисква допълнително документи
                от декларатора за доказване на декларирания доход, жилищното или имущественото състояние.
              </Typography>
            </Alert>
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
          Заявление за настаняване в общежитие
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

export default DormitoryApply;
