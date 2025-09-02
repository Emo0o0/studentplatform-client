import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  FACULTY_OPTIONS,
  DEGREE_LEVELS,
  COURSE_YEARS,
  SEMESTERS,
  GROUP_OPTIONS,
  SUBGROUP_OPTIONS,
  SPECIALTIES,
} from "../../constants/dropdownOptions";

export default function AcademicInfoStep({ formData = {}, onChange, onValidationChange }) {
  // Define required fields
  const requiredFields = [
    "facultyNumber",
    "specialty",
    "faculty",
    "degreeLevel",
    "courseYear",
    "semester",
    "studentGroup",
    "subGroup",
  ];

  // Optional fields that are not required but still part of the form
  // const optionalFields = ["studentGroup", "subGroup"];

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  // Validate the entire form and return if it's valid
  const validateForm = () => {
    // Check if all required fields have values
    return requiredFields.every((field) => !!formData[field]);
  };

  // Notify parent component about validation status whenever form data changes
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(validateForm());
    }
  }, [formData]);

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
                error={!formData.facultyNumber}
                helperText={!formData.facultyNumber && "Факултетният номер е задължителен"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ minWidth: 120 }}>
                <InputLabel id="faculty-label" error={!formData.faculty}>
                  Факултет
                </InputLabel>
                <Select
                  labelId="faculty-label"
                  value={formData.faculty || ""}
                  label="Факултет"
                  onChange={(e) => handleChange("faculty", e.target.value)}
                  error={!formData.faculty}
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
              <FormControl fullWidth required sx={{ minWidth: 120 }}>
                <InputLabel error={!formData.specialty}>Специалност</InputLabel>
                <Select
                  value={formData.specialty || ""}
                  label="Специалност"
                  onChange={(e) => handleChange("specialty", e.target.value)}
                  error={!formData.specialty}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {SPECIALTIES.map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ minWidth: 230 }}>
                <InputLabel error={!formData.degreeLevel}>Образователна степен</InputLabel>
                <Select
                  value={formData.degreeLevel || ""}
                  label="Образователна степен"
                  onChange={(e) => handleChange("degreeLevel", e.target.value)}
                  error={!formData.degreeLevel}
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
                <InputLabel error={!formData.courseYear}>Курс</InputLabel>
                <Select
                  value={formData.courseYear || ""}
                  label="Курс"
                  onChange={(e) => handleChange("courseYear", e.target.value)}
                  error={!formData.courseYear}
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
                <InputLabel error={!formData.semester}>Семестър</InputLabel>
                <Select
                  value={formData.semester || ""}
                  label="Семестър"
                  onChange={(e) => handleChange("semester", e.target.value)}
                  error={!formData.semester}
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

        {/* Group Info - These are optional fields */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ minWidth: 90 }}>
                <InputLabel error={!formData.studentGroup}>Група</InputLabel>
                <Select
                  value={formData.studentGroup || ""}
                  label="Група"
                  onChange={(e) => handleChange("studentGroup", e.target.value)}
                  error={!formData.studentGroup}
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
                <InputLabel error={!formData.subGroup}>Подгрупа</InputLabel>
                <Select
                  value={formData.subGroup || ""}
                  label="Подгрупа"
                  onChange={(e) => handleChange("subGroup", e.target.value)}
                  error={!formData.subGroup}
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
