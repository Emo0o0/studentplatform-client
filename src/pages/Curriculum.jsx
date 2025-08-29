import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import { School as SchoolIcon } from "@mui/icons-material";

function Curriculum() {
  const curriculumData = {
    1: [
      { name: "Математика I", credits: 6, teacher: "гл. ас. Д. Неделчева" },
      { name: "Базово програмиране", credits: 8, teacher: "проф. М. Карова" },
      { name: "Уеб дизайн", credits: 5, teacher: "доц. В. Божикова" },
      { name: "Електроника", credits: 3, teacher: "ас. Г. Димитров" },
    ],
    2: [
      { name: "Математика II", credits: 6, teacher: "доц. Д. Неделчева" },
      { name: "Синтез и анализ на алгоритми", credits: 8, teacher: "доц. Н. Калчева" },
      { name: "Английски език", credits: 7, teacher: "ас. Б. Гемова" },
      { name: "Логика и автомати", credits: 5, teacher: "доц. Ю. Петкова" },
    ],
    3: [
      { name: "ООП I част", credits: 7, teacher: "доц. Хр. Ненов" },
      { name: "Бази от данни", credits: 6, teacher: "доц. Д. Динев" },
      { name: "Дискретни структури", credits: 6, teacher: "доц. Владо Николов" },
      { name: "Организация на компютъра", credits: 5, teacher: "доц. Ю. Петкова" },
    ],
    4: [
      { name: "ООП II част", credits: 7, teacher: "доц. Хр. Ненов" },
      { name: "Уеб програмиране", credits: 6, teacher: "доц. В. Божикова" },
      { name: "Микропроцесорна техника", credits: 6, teacher: "доц. Ж. Жейнов" },
      { name: "ООП проект - I част", credits: 5, teacher: "доц. Хр. Ненов" },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <SchoolIcon fontSize="large" color="primary" />
          Учебен план
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {Object.entries(curriculumData).map(([semester, subjects]) => (
          <Grid item xs={12} md={6} key={semester}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="primary"
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    borderBottom: "2px solid",
                    borderColor: "primary.light",
                    pb: 1,
                  }}
                >
                  {semester} семестър
                </Typography>
                <TableContainer>
                  <Table size="small" aria-label={`Предмети ${semester} семестър`}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "primary.light" }}>
                        <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Предмет</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.contrastText" }}>
                          Кредити
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Преподавател</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subjects.map((subject, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:nth-of-type(odd)": { backgroundColor: "grey.50" },
                            "&:hover": { backgroundColor: "grey.100" },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 500 }}>{subject.name}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={subject.credits}
                              size="small"
                              color="primary"
                              sx={{ fontWeight: "bold", minWidth: "30px" }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: "0.9rem" }}>{subject.teacher}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    mt: 3,
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Брой предмети: {subjects.length}
                  </Typography>
                  <Chip
                    label={`Общо кредити: ${subjects.reduce((sum, subject) => sum + subject.credits, 0)}`}
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Curriculum;
