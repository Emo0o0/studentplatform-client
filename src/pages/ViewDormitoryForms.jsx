import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchStudentDormitoryForms } from "../services/viewDormitoryFormsService";

function ViewDormitoryForms() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDormitoryForms = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual user ID from auth context
        const studentId = 1;
        const data = await fetchStudentDormitoryForms(studentId);
        setForms(data.forms || []);
      } catch (err) {
        console.error("Error fetching dormitory forms:", err);
        setError("Възникна грешка при зареждането на формулярите. Моля, опитайте отново.");
      } finally {
        setLoading(false);
      }
    };

    getDormitoryForms();
  }, []);

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

  // Get relation name in Bulgarian
  const getFamilyRelationName = (relation) => {
    const relations = {
      FATHER: "Баща",
      MOTHER: "Майка",
      BROTHER: "Брат",
      SISTER: "Сестра",
      SPOUSE: "Съпруг/а",
      CHILD: "Дете",
      OTHER: "Друго",
    };
    return relations[relation] || relation;
  };

  // Format birth date
  const formatBirthDate = (dateString) => {
    if (!dateString) return "-";

    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("bg-BG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return dateString || "-";
    }
  };

  // Render family members table
  const renderFamilyMembersTable = (familyMembers) => {
    if (!familyMembers || familyMembers.length === 0) {
      return (
        <Alert severity="info" sx={{ mt: 2 }}>
          Няма добавени членове на семейството
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Роля</TableCell>
              <TableCell>Име</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Дата на раждане</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {familyMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{getFamilyRelationName(member.familyMemberRelation)}</TableCell>
                <TableCell>{member.name || "-"}</TableCell>
                <TableCell>{member.address || "-"}</TableCell>
                <TableCell>{member.phoneNumber || "-"}</TableCell>
                <TableCell>{formatBirthDate(member.dateOfBirth)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Render keep room info
  const renderKeepRoomInfo = (form) => {
    if (!form.hasKeepRoomForm) {
      return null;
    }

    return (
      <Box
        sx={{ mt: 3, p: 2, bgcolor: "background.paper", borderRadius: 1, border: "1px dashed", borderColor: "divider" }}
      >
        <Typography variant="h6" gutterBottom>
          Заявка за запазване на стая
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Номер на блок
            </Typography>
            <Typography variant="body1">{form.keepRoomFormBuildingNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Номер на стая
            </Typography>
            <Typography variant="body1">{form.keepRoomFormRoomNumber}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render dormitory form card
  const renderDormitoryFormCard = (form) => {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Формуляр за общежитие</Typography>
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
          </Grid>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Членове на семейството
          </Typography>
          {renderFamilyMembersTable(form.familyMembers)}

          {renderKeepRoomInfo(form)}
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
          <Typography variant="h4">Моите формуляри за общежитие</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : forms.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>
            Нямате изпратени формуляри за общежитие.
          </Alert>
        ) : (
          <Stack spacing={3}>
            {forms.map((form) => (
              <Box key={form.formId}>{renderDormitoryFormCard(form)}</Box>
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}

export default ViewDormitoryForms;
