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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchStudentScholarshipForms } from "../services/viewScholarshipFormsService";
import {
  getScholarshipName,
  getBankName,
  getSubjectName,
  getFamilyStatusName,
  getFormStatusLabel,
} from "../constants/dropdownOptions";
import keycloak from "../config/keycloak";

// TabPanel component for handling tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scholarship-tabpanel-${index}`}
      aria-labelledby={`scholarship-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function ViewScholarshipForms() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forms, setForms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  // Get forms by type
  const meritSuccessForms = Array.isArray(forms)
    ? forms.filter((form) => form?.scholarshipType === "MERIT_SUCCESS")
    : [];
  const meritWithIncomeForms = Array.isArray(forms)
    ? forms.filter((form) => form?.scholarshipType === "MERIT_WITH_INCOME")
    : [];
  const socialForms = Array.isArray(forms)
    ? forms.filter((form) => form?.scholarshipType === "SOCIAL_PREFERENTIAL")
    : [];
  const foreignStudentForms = Array.isArray(forms)
    ? forms.filter((form) => form?.scholarshipType === "FOREIGN_STUDENT")
    : [];
  const firstYearForms = Array.isArray(forms) ? forms.filter((form) => form?.scholarshipType === "FIRST_YEAR") : [];
  const specialAchievementForms = Array.isArray(forms)
    ? forms.filter((form) => form?.scholarshipType === "SPECIAL_ACHIEVEMENTS")
    : [];

  useEffect(() => {
    const getScholarshipForms = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual user ID from auth context
        let studentId = null;
        if (keycloak.tokenParsed && keycloak.tokenParsed.name) {
          // Get the third value from name claim which contains space-separated values
          const nameParts = keycloak.tokenParsed.name.split(" ");
          if (nameParts.length >= 3) {
            studentId = nameParts[2]; // Get third value
            console.log("Extracted student ID from token:", studentId);
          }
        }

        if (!studentId) {
          console.warn("Could not extract student ID from token, falling back to default");
          // You could either use a fallback or show an error
          throw new Error("Неуспешно извличане на студентски номер от токена.");
        }
        const data = await fetchStudentScholarshipForms(studentId);
        setForms(data.forms);
      } catch (err) {
        console.error("Error fetching scholarship forms:", err);
        setError("Възникна грешка при зареждането на формулярите. Моля, опитайте отново.");
      } finally {
        setLoading(false);
      }
    };

    getScholarshipForms();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Helper function to render status chip
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

  // Render common form info
  const renderCommonFormInfo = (form) => (
    <Box sx={{ mb: 2 }}>
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
            Среден успех
          </Typography>
          <Typography variant="body1">{form.previousGPA}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Банкова информация
        </Typography>
        <Typography variant="body1">
          {getBankName(form.bankingInfo?.bankName)} • {form.bankingInfo?.bankAccount}
        </Typography>
      </Box>
    </Box>
  );

  // Render Merit With Income form details
  const renderMeritWithIncomeDetails = (form) => {
    const meritWithIncome = form.meritWithIncomeScholarship;
    if (!meritWithIncome) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Информация за доходи
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Семеен статус
            </Typography>
            <Typography variant="body1">{getFamilyStatusName(meritWithIncome.familyStatus)}</Typography>
          </Grid>

          {meritWithIncome.familyStatus === "MARRIED" ? (
            // Married info
            <>
              {meritWithIncome.spouseName && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Име на съпруг/а
                  </Typography>
                  <Typography variant="body1">{meritWithIncome.spouseName}</Typography>
                </Grid>
              )}
              {meritWithIncome.spouseEmploymentStatus && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Статус на съпруг/а
                  </Typography>
                  <Typography variant="body1">{meritWithIncome.spouseEmploymentStatus}</Typography>
                </Grid>
              )}
              {meritWithIncome.children && meritWithIncome.children?.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Деца
                  </Typography>
                  {meritWithIncome.children.map((child, index) => (
                    <Typography key={index} variant="body1">
                      {child.fullName} • {child.age} години
                    </Typography>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            // Single info
            <>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Име на баща
                </Typography>
                <Typography variant="body1">{meritWithIncome.fatherName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Статус на баща
                </Typography>
                <Typography variant="body1">{meritWithIncome.fatherStatus}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Име на майка
                </Typography>
                <Typography variant="body1">{meritWithIncome.motherName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Статус на майка
                </Typography>
                <Typography variant="body1">{meritWithIncome.motherStatus}</Typography>
              </Grid>
              {meritWithIncome.siblings && meritWithIncome.siblings?.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Братя/Сестри
                  </Typography>
                  {meritWithIncome.siblings.map((sibling, index) => (
                    <Typography key={index} variant="body1">
                      {sibling.fullName} • {sibling.educationStatus}
                    </Typography>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Grid>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Месечни доходи
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Заплати
                </TableCell>
                <TableCell align="right">{meritWithIncome.salaries} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Пенсии
                </TableCell>
                <TableCell align="right">{meritWithIncome.pensions} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Обезщетения за безработица
                </TableCell>
                <TableCell align="right">{meritWithIncome.unemploymentBenefits} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Социални помощи
                </TableCell>
                <TableCell align="right">{meritWithIncome.socialAid} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Семейни помощи
                </TableCell>
                <TableCell align="right">{meritWithIncome.familyAllowances} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Обезщетения за отглеждане на дете
                </TableCell>
                <TableCell align="right">{meritWithIncome.childCareAllowances} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Лични стипендии
                </TableCell>
                <TableCell align="right">{meritWithIncome.personalScholarships} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Наеми
                </TableCell>
                <TableCell align="right">{meritWithIncome.rent} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Хонорари
                </TableCell>
                <TableCell align="right">{meritWithIncome.honorariums} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Присъдени издръжки
                </TableCell>
                <TableCell align="right">{meritWithIncome.alimony} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Доходи от бизнес
                </TableCell>
                <TableCell align="right">{meritWithIncome.businessIncome} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Други доходи
                </TableCell>
                <TableCell align="right">{meritWithIncome.otherIncome} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                  Общ доход
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {meritWithIncome.totalIncome} лв.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                  Месечен доход на член от семейството
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {meritWithIncome.monthlyIncomePerMember} лв.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Render Social form details
  const renderSocialDetails = (form) => {
    const social = form.socialScholarship;
    if (!social) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Информация за социална стипендия
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Тип социална стипендия
            </Typography>
            <Typography variant="body1">{social.socialScholarshipType}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Семейно положение
            </Typography>
            <Typography variant="body1">{social.hasMarriage ? "Семеен/а" : "Несемеен/а"}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render First Year form details
  const renderFirstYearDetails = (form) => {
    const firstYear = form.firstYearScholarship;
    if (!firstYear) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Информация за първокурсник
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Оценка по български език
            </Typography>
            <Typography variant="body1">{firstYear.bulgarianLanguageGrade}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Втори предмет
            </Typography>
            <Typography variant="body1">{getSubjectName(firstYear.secondExamSubject)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Оценка по втори предмет
            </Typography>
            <Typography variant="body1">{firstYear.secondExamGrade}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render Special Achievement form details
  const renderSpecialAchievementDetails = (form) => {
    const specialAchievement = form.specialAchievementScholarship;
    if (!specialAchievement) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Информация за специални постижения
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Тема на постижението
            </Typography>
            <Typography variant="body1">{specialAchievement.achievementTopic}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render form card
  const renderFormCard = (form) => {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">{getScholarshipName(form.scholarshipType)}</Typography>
            <Box>{renderStatusChip(form.formStatus)}</Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {renderCommonFormInfo(form)}

          {form.scholarshipType === "MERIT_WITH_INCOME" && renderMeritWithIncomeDetails(form)}
          {form.scholarshipType === "SOCIAL_PREFERENTIAL" && renderSocialDetails(form)}
          {form.scholarshipType === "FIRST_YEAR" && renderFirstYearDetails(form)}
          {form.scholarshipType === "SPECIAL_ACHIEVEMENTS" && renderSpecialAchievementDetails(form)}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Моите формуляри за стипендии</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : // Fix: Add null check to forms
        !forms || forms.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>
            Нямате изпратени формуляри за стипендии.
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
              <Tab label={`Всички (${forms?.length || 0})`} />
              {meritSuccessForms?.length > 0 && <Tab label={`За успех (${meritSuccessForms.length})`} />}
              {meritWithIncomeForms?.length > 0 && <Tab label={`За успех с доходи (${meritWithIncomeForms.length})`} />}
              {socialForms?.length > 0 && <Tab label={`Социални (${socialForms.length})`} />}
              {foreignStudentForms?.length > 0 && (
                <Tab label={`За чуждестранни студенти (${foreignStudentForms.length})`} />
              )}
              {firstYearForms?.length > 0 && <Tab label={`За първокурсници (${firstYearForms.length})`} />}
              {specialAchievementForms?.length > 0 && (
                <Tab label={`За специални постижения (${specialAchievementForms.length})`} />
              )}
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              {Array.isArray(forms) &&
                forms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
            </TabPanel>

            {meritSuccessForms?.length > 0 && (
              <TabPanel value={tabValue} index={1}>
                {meritSuccessForms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
              </TabPanel>
            )}

            {meritWithIncomeForms?.length > 0 && (
              <TabPanel value={tabValue} index={meritSuccessForms.length > 0 ? 2 : 1}>
                {meritWithIncomeForms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
              </TabPanel>
            )}

            {socialForms?.length > 0 && (
              <TabPanel
                value={tabValue}
                index={(meritSuccessForms?.length > 0 ? 1 : 0) + (meritWithIncomeForms?.length > 0 ? 1 : 0) + 1}
              >
                {socialForms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
              </TabPanel>
            )}

            {foreignStudentForms?.length > 0 && (
              <TabPanel
                value={tabValue}
                index={
                  (meritSuccessForms?.length > 0 ? 1 : 0) +
                  (meritWithIncomeForms?.length > 0 ? 1 : 0) +
                  (socialForms?.length > 0 ? 1 : 0) +
                  1
                }
              >
                {foreignStudentForms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
              </TabPanel>
            )}

            {firstYearForms?.length > 0 && (
              <TabPanel
                value={tabValue}
                index={
                  (meritSuccessForms?.length > 0 ? 1 : 0) +
                  (meritWithIncomeForms?.length > 0 ? 1 : 0) +
                  (socialForms?.length > 0 ? 1 : 0) +
                  (foreignStudentForms?.length > 0 ? 1 : 0) +
                  1
                }
              >
                {firstYearForms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
              </TabPanel>
            )}

            {specialAchievementForms?.length > 0 && (
              <TabPanel
                value={tabValue}
                index={
                  (meritSuccessForms?.length > 0 ? 1 : 0) +
                  (meritWithIncomeForms?.length > 0 ? 1 : 0) +
                  (socialForms?.length > 0 ? 1 : 0) +
                  (foreignStudentForms?.length > 0 ? 1 : 0) +
                  (firstYearForms?.length > 0 ? 1 : 0) +
                  1
                }
              >
                {specialAchievementForms.map((form) => (
                  <Box key={form.formId} sx={{ mb: 3 }}>
                    {renderFormCard(form)}
                  </Box>
                ))}
              </TabPanel>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}

export default ViewScholarshipForms;
