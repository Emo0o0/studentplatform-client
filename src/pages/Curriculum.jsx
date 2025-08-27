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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <SchoolIcon fontSize="large" color="primary" />
        Учебен план
      </Typography>

      <Grid container spacing={4}>
        {Object.entries(curriculumData).map(([semester, subjects]) => (
          <Grid item xs={12} md={6} key={semester}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: "center", mb: 3 }}>
                  {semester} семестър
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Предмет</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Кредити
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Преподавател</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subjects.map((subject, index) => (
                        <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "grey.50" } }}>
                          <TableCell sx={{ fontWeight: 500 }}>{subject.name}</TableCell>
                          <TableCell align="center">
                            <Chip label={subject.credits} size="small" color="primary" variant="outlined" />
                          </TableCell>
                          <TableCell sx={{ fontSize: "0.9rem", color: "text.secondary" }}>{subject.teacher}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Typography variant="body2" color="primary">
                    Общо кредити: {subjects.reduce((sum, subject) => sum + subject.credits, 0)}
                  </Typography>
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
