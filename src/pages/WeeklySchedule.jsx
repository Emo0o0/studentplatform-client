import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box, Chip } from "@mui/material";
import { Schedule as ScheduleIcon } from "@mui/icons-material";

function WeeklySchedule() {
  const scheduleData = {
    Monday: [
      // { time: "08:00-09:30", subject: "Математика", type: "Лекция", teacher: "Проф. Иванов", room: "Зала 101" },
      // { time: "10:00-11:30", subject: "Програмиране", type: "Упражнение", teacher: "Ас. Петров", room: "Лаб 205" },
      // { time: "12:00-13:30", subject: "Физика", type: "Лекция", teacher: "Доц. Георгиев", room: "Зала 103" },
    ],
    Tuesday: [
      // { time: "07:45-10:00", subject: "ООП", type: "Упражнение", teacher: "хон. ас. Ив. Куцаров", room: "203 ТВ" },
      { time: "10:15-13:00", subject: "ООП", type: "Лекция", teacher: "доц. В. Николов", room: "827 М" },
      { time: "13:45-16:00", subject: "КЗД", type: "Упражнение", teacher: "доц. Д. Динев", room: "201 ТВ" },
    ],
    Wednesday: [
      // { time: "08:00-09:30", subject: "Мрежи", type: "Лекция", teacher: "Доц. Стоянов", room: "Зала 201" },
      // { time: "10:00-11:30", subject: "Математика", type: "Упражнение", teacher: "Ас. Тодоров", room: "Зала 105" },
    ],
    Thursday: [
      { time: "07:45-10:00", subject: "ООП", type: "Упражнение", teacher: "хон. ас. Ив. Куцаров", room: "203 ТВ" },
      {
        time: "11:15-14:00",
        subject: "КЗД",
        type: "Лекция",
        teacher: "доц. Д. Динев",
        room: "425 НУК",
      },
    ],
    Friday: [
      {
        time: "08:45-11:00",
        subject: "ФМ",
        type: "Упражнение",
        teacher: "гл. ас. Св. Симеонов",
        room: "505 НУК",
      },
      {
        time: "11:15-14:00",
        subject: "ФМ",
        type: "Лекция",
        teacher: "гл. ас. Св. Симеонов",
        room: "212 Е",
      },
    ],
  };

  const dayTranslations = {
    Monday: "Понеделник",
    Tuesday: "Вторник",
    Wednesday: "Сряда",
    Thursday: "Четвъртък",
    Friday: "Петък",
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <ScheduleIcon fontSize="large" color="primary" />
        Седмична програма
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(scheduleData).map(([day, classes]) => (
          <Grid item xs={12} md={6} lg={4} key={day}>
            <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  sx={{ borderBottom: 2, borderColor: "primary.main", pb: 1 }}
                >
                  {dayTranslations[day]}
                </Typography>
                {classes.map((cls, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: "grey.50",
                      borderRadius: 2,
                      borderLeft: 4,
                      borderLeftColor: cls.type === "Лекция" ? "info.main" : "success.main",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                      {cls.time}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      {cls.subject}
                    </Typography>
                    <Chip
                      label={cls.type}
                      size="small"
                      color={cls.type === "Лекция" ? "info" : "success"}
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      👨‍🏫 {cls.teacher}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📍 {cls.room}
                    </Typography>
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

export default WeeklySchedule;
