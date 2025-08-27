import React from "react";
import { Container, Typography, Card, CardContent, Grid, Box, Avatar } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

function PersonalInfo() {
  const studentInfo = {
    name: "Емо еМо емО",
    studentId: "21621506",
    faculty: "Факултет по изчислителна техника и автоматизация",
    specialty: "Софтуерни и интернет технологии",
    course: "4",
    group: "3а",
    email: "emo@onlineedu.tu-varna.bg",
    phone: "+359 888 123 456",
    address: "гр. Варна, ул. Драгоман 15",
    birthDate: "26.11.2002",
    enrollmentYear: "2021",
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <PersonIcon fontSize="large" color="primary" />
        Лична информация
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: "primary.main", fontSize: "2rem" }}>
              {studentInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                {studentInfo.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Студент • Факултетен номер: {studentInfo.studentId}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Академична информация
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Факултет
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.faculty}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Специалност
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.specialty}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Курс
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.course} курс
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Група
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Група {studentInfo.group}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Година на записване
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.enrollmentYear}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Контактна информация
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.email}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Телефон
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.phone}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Адрес
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.address}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Дата на раждане
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {studentInfo.birthDate}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PersonalInfo;
