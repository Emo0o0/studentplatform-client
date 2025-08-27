import React from "react";
import { Grid, Paper, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  FACULTY_OPTIONS,
  DEGREE_LEVELS,
  COURSE_YEARS,
  SEMESTERS,
  GROUP_OPTIONS,
  SUBGROUP_OPTIONS,
} from "../../constants/dropdownOptions";

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
                  {FACULTY_OPTIONS.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
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
                  {DEGREE_LEVELS.map((level) => (
                    <MenuItem key={level.id} value={level.id}>
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
                  {COURSE_YEARS.map((year) => (
                    <MenuItem key={year.id} value={year.id}>
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
                  {SEMESTERS.map((semester) => (
                    <MenuItem key={semester.id} value={semester.id}>
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
              <FormControl fullWidth sx={{ minWidth: 90 }}>
                <InputLabel>Група</InputLabel>
                <Select
                  value={formData.studentGroup || ""}
                  label="Група"
                  onChange={(e) => handleChange("studentGroup", e.target.value)}
                >
                  {GROUP_OPTIONS.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ minWidth: 90 }}>
                <InputLabel>Подгрупа</InputLabel>
                <Select
                  value={formData.subGroup || ""}
                  label="Подгрупа"
                  onChange={(e) => handleChange("subGroup", e.target.value)}
                >
                  {SUBGROUP_OPTIONS.map((subgroup) => (
                    <MenuItem key={subgroup.id} value={subgroup.id}>
                      {subgroup.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
