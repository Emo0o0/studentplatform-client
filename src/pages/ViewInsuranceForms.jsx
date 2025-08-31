import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Divider,
  Grid,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  fetchInsuranceApplyForms,
  fetchInsuranceLateforms,
  fetchInsuranceTerminateForms,
} from "../services/viewInsuranceFormsService";

// TabPanel component for handling tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`insurance-tabpanel-${index}`}
      aria-labelledby={`insurance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const renderStatusChip = (status) => {
  let color = "default";

  switch (status) {
    case "SENT":
      color = "primary";
      break;
    case "SEEN":
      color = "info";
      break;
    case "APPROVED":
      color = "success";
      break;
    case "DENIED":
      color = "error";
      break;
    case "RETURNED":
      color = "warning";
      break;
    default:
      color = "default";
  }

  const statusLabels = {
    SENT: "Изпратено",
    SEEN: "Прегледано",
    APPROVED: "Одобрено",
    DENIED: "Отказано",
    RETURNED: "Върнато",
  };

  return <Chip label={statusLabels[status] || status} color={color} size="small" />;
};

function ViewInsuranceForms() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyForms, setApplyForms] = useState([]);
  const [lateForms, setLateForms] = useState([]);
  const [terminateForms, setTerminateForms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getInsuranceForms = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual user ID from auth context
        const studentId = 1;

        // Fetch all types of forms in parallel
        const [applyData, lateData, terminateData] = await Promise.all([
          fetchInsuranceApplyForms(studentId),
          fetchInsuranceLateforms(studentId),
          fetchInsuranceTerminateForms(studentId),
        ]);

        setApplyForms(applyData.forms || []);
        setLateForms(lateData.forms || []);
        setTerminateForms(terminateData.forms || []);
      } catch (err) {
        console.error("Error fetching insurance forms:", err);
        setError("Възникна грешка при зареждането на формулярите. Моля, опитайте отново.");
      } finally {
        setLoading(false);
      }
    };

    getInsuranceForms();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Format date string to a more readable format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("bg-BG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Get insurer name
  const getInsurerName = (insurer) => {
    const insurers = {
      TU: "Технически университет",
      NHIF: "НЗОК",
      OTHER: "Друг",
    };
    return insurers[insurer] || insurer;
  };

  // Render apply form card
  const renderApplyFormCard = (form) => {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Здравно осигуряване за текущ период
            </Typography>
            <Box>{renderStatusChip(form.formStatus)}</Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Име и фамилия
              </Typography>
              <Typography variant="body1">
                {form.studentFirstName} {form.studentLastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Факултетен номер
              </Typography>
              <Typography variant="body1">{form.studentFacultyNumber}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Дата на подаване
              </Typography>
              <Typography variant="body1">{formatDate(form.date)}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Получавам доходи от трудова дейност
              </Typography>
              <Typography variant="body1">{form.isReceivingWorkRelatedIncome ? "Да" : "Не"}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Получавам пенсия
              </Typography>
              <Typography variant="body1">{form.isReceivingPension ? "Да" : "Не"}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Получавам други доходи с осигуровки
              </Typography>
              <Typography variant="body1">{form.isReceivingOtherInsuredIncome ? "Да" : "Не"}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Настоящ осигурител
              </Typography>
              <Typography variant="body1">{getInsurerName(form.currentInsurer)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Render late form card
  const renderLateFormCard = (form) => {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Здравно осигуряване за минал период
            </Typography>
            <Box>{renderStatusChip(form.formStatus)}</Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Име и фамилия
              </Typography>
              <Typography variant="body1">
                {form.studentFirstName} {form.studentLastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Факултетен номер
              </Typography>
              <Typography variant="body1">{form.studentFacultyNumber}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Дата на подаване
              </Typography>
              <Typography variant="body1">{formatDate(form.date)}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Учебна година
              </Typography>
              <Typography variant="body1">{form.year}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Render terminate form card
  const renderTerminateFormCard = (form) => {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Прекратяване на здравно осигуряване
            </Typography>
            <Box>{renderStatusChip(form.formStatus)}</Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Име и фамилия
              </Typography>
              <Typography variant="body1">
                {form.studentFirstName} {form.studentLastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Факултетен номер
              </Typography>
              <Typography variant="body1">{form.studentFacultyNumber}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Дата на подаване
              </Typography>
              <Typography variant="body1">{formatDate(form.date)}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Причина за прекратяване
              </Typography>
              <Typography variant="body1">{form.terminationReason}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Calculate the total number of forms
  const totalFormsCount = (applyForms?.length || 0) + (lateForms?.length || 0) + (terminateForms?.length || 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Моите формуляри за здравно осигуряване</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : totalFormsCount === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>
            Нямате изпратени формуляри за здравно осигуряване.
          </Alert>
        ) : (
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label={`Всички (${totalFormsCount})`} />
              {applyForms?.length > 0 && <Tab label={`Текущ период (${applyForms.length})`} />}
              {lateForms?.length > 0 && <Tab label={`Минал период (${lateForms.length})`} />}
              {terminateForms?.length > 0 && <Tab label={`Прекратяване (${terminateForms.length})`} />}
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              {Array.isArray(applyForms) && applyForms.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Здравно осигуряване за текущ период
                  </Typography>
                  <Stack spacing={2}>
                    {applyForms.map((form) => (
                      <Box key={form.formId}>{renderApplyFormCard(form)}</Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {Array.isArray(lateForms) && lateForms.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Здравно осигуряване за минал период
                  </Typography>
                  <Stack spacing={2}>
                    {lateForms.map((form) => (
                      <Box key={form.formId}>{renderLateFormCard(form)}</Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {Array.isArray(terminateForms) && terminateForms.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Прекратяване на здравно осигуряване
                  </Typography>
                  <Stack spacing={2}>
                    {terminateForms.map((form) => (
                      <Box key={form.formId}>{renderTerminateFormCard(form)}</Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </TabPanel>

            {applyForms?.length > 0 && (
              <TabPanel value={tabValue} index={1}>
                <Stack spacing={2}>
                  {applyForms.map((form) => (
                    <Box key={form.formId}>{renderApplyFormCard(form)}</Box>
                  ))}
                </Stack>
              </TabPanel>
            )}

            {lateForms?.length > 0 && (
              <TabPanel value={tabValue} index={applyForms?.length > 0 ? 2 : 1}>
                <Stack spacing={2}>
                  {lateForms.map((form) => (
                    <Box key={form.formId}>{renderLateFormCard(form)}</Box>
                  ))}
                </Stack>
              </TabPanel>
            )}

            {terminateForms?.length > 0 && (
              <TabPanel value={tabValue} index={(applyForms?.length > 0 ? 1 : 0) + (lateForms?.length > 0 ? 1 : 0) + 1}>
                <Stack spacing={2}>
                  {terminateForms.map((form) => (
                    <Box key={form.formId}>{renderTerminateFormCard(form)}</Box>
                  ))}
                </Stack>
              </TabPanel>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}

export default ViewInsuranceForms;
