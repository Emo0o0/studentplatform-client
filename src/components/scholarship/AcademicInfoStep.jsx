import React from "react";
import { Grid, Paper, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const facultyOptions = [
  { id: "MT", label: "Машинно-технологичен факултет" },
  { id: "E", label: "Електротехнически факултет" },
  { id: "SHB", label: "Корабостроителен факултет" },
  { id: "FCSA", label: "Факултет по изчислителна техника и автоматизация" },
  //   { id: "SI", label: "Добруджански технологичен колеж" },
  //   { id: "SI", label: "Колеж в структурата на ТУ-Варна" },
  // Add other faculties as needed
];

const degreeLevels = [
  { id: "BACHELOR", label: "Бакалавър" },
  { id: "MASTER", label: "Магистър" },
  { id: "DOCTORAL", label: "Докторант" },
];

const courseYears = [
  { id: "FIRST", label: "Първи" },
  { id: "SECOND", label: "Втори" },
  { id: "THIRD", label: "Трети" },
  { id: "FOURTH", label: "Четвърти" },
];

const semesters = [
  { id: "WINTER", label: "Зимен" },
  { id: "SUMMER", label: "Летен" },
];

export default function AcademicInfoStep({ formData = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Академична информация
      </Typography>

      <Grid container spacing={3}>
        {/* Faculty Info */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Факултетен номер"
                value={formData.facultyNumber || ""}
                onChange={(e) => handleChange("facultyNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ minWidth: 120 }}>
                <InputLabel id="faculty-label">Факултет</InputLabel>
                <Select
                  labelId="faculty-label"
                  value={formData.faculty || ""}
                  label="Факултет"
                  onChange={(e) => handleChange("faculty", e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {facultyOptions.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {/* Education Info */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Специалност"
                value={formData.specialty || ""}
                onChange={(e) => handleChange("specialty", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ minWidth: 230 }}>
                <InputLabel>Образователна степен</InputLabel>
                <Select
                  value={formData.degreeLevel || ""}
                  label="Образователна степен"
                  onChange={(e) => handleChange("degreeLevel", e.target.value)}
                >
                  {degreeLevels.map((level) => (
                    <MenuItem key={level.id} value={level.label}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {/* Course Info */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ minWidth: 90 }}>
                <InputLabel>Курс</InputLabel>
                <Select
                  value={formData.courseYear || ""}
                  label="Курс"
                  onChange={(e) => handleChange("courseYear", e.target.value)}
                >
                  {courseYears.map((year) => (
                    <MenuItem key={year.id} value={year.label}>
                      {year.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ minWidth: 130 }}>
                <InputLabel>Семестър</InputLabel>
                <Select
                  value={formData.semester || ""}
                  label="Семестър"
                  onChange={(e) => handleChange("semester", e.target.value)}
                >
                  {semesters.map((semester) => (
                    <MenuItem key={semester.id} value={semester.label}>
                      {semester.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {/* Group Info */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Група"
                value={formData.group || ""}
                onChange={(e) => handleChange("group", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Подгрупа"
                value={formData.stream || ""}
                onChange={(e) => handleChange("stream", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
