import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box, Chip, Divider } from "@mui/material";
import { Grade as GradeIcon } from "@mui/icons-material";

function Grades() {
  const gradesData = {
    1: [
      { subject: "Математика I", grade: "6", status: "completed" },
      { subject: "Базово програмиране", grade: "5", status: "completed" },
      { subject: "Уеб дизайн", grade: "Не се явил", status: "absent" },
      { subject: "Електроника", grade: "Зачита се", status: "credited" },
    ],
    2: [
      { subject: "Математика II", grade: "5", status: "completed" },
      { subject: "Синтез и анализ на алгоритми", grade: "6", status: "completed" },
      { subject: "Английски език", grade: "4", status: "completed" },
      { subject: "Логика и автомати", grade: "5", status: "completed" },
    ],
    3: [
      { subject: "ООП I част", grade: "5", status: "completed" },
      { subject: "Бази от данни", grade: "6", status: "completed" },
      { subject: "Дискретни структури", grade: "4", status: "completed" },
      { subject: "Организация на компютъра", grade: "5", status: "completed" },
    ],
  };

  const getGradeColor = (grade, status) => {
    if (status === "absent") return "error";
    if (status === "credited") return "info";
    const numGrade = parseInt(grade);
    if (numGrade === 6) return "success";
    if (numGrade === 5) return "primary";
    if (numGrade >= 3) return "warning";
    return "error";
  };

  const calculateAverage = (grades) => {
    const numericGrades = grades.filter((g) => !isNaN(parseInt(g.grade))).map((g) => parseInt(g.grade));
    return numericGrades.length > 0
      ? (numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length).toFixed(2)
      : "N/A";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <GradeIcon fontSize="large" color="primary" />
        Оценки
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(gradesData).map(([semester, grades]) => (
          <Grid item xs={12} md={6} lg={4} key={semester}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ mr: 2 }} variant="h5" color="primary">
                    {semester} семестър
                  </Typography>
                  <Chip label={`Среден успех: ${calculateAverage(grades)}`} color="primary" variant="outlined" />
                </Box>
                <Divider sx={{ mb: 2 }} />
                {grades.map((grade, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1.5,
                      borderBottom: index < grades.length - 1 ? "1px solid" : "none",
                      borderBottomColor: "grey.200",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                      {grade.subject}
                    </Typography>
                    <Chip
                      label={grade.grade}
                      color={getGradeColor(grade.grade, grade.status)}
                      size="medium"
                      sx={{ ml: 2, minWidth: 80, fontWeight: "bold" }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Grades;

//Added left margin to grade
//Added right margin to semester
//changes
