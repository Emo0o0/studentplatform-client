// Updated ScholarshipTypeStep.jsx with proper options from ScholarshipType.java
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Typography, Paper } from "@mui/material";

const scholarshipOptions = [
  {
    id: "MERIT_SUCCESS",
    label: "Стипендия за успех (успех от 5.00 до 6.00)",
  },
  {
    id: "MERIT_WITH_INCOME",
    label: "Стипендия за успех с доходи (успех от 4.00 до 4.99)",
  },
  {
    id: "SOCIAL_PREFERENTIAL",
    label: "Стипендия (социална/предимствена)",
  },
  {
    id: "FOREIGN_STUDENT",
    label: "Стипендия за чуждестранни студенти",
  },
  {
    id: "FIRST_YEAR",
    label: "Стипендия ПЪРВОКУРСНИК",
  },
  {
    id: "SPECIAL_ACHIEVEMENTS",
    label: "Стипендия за специални постижения",
  },
];

export default function ScholarshipTypeStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Изберете вид стипендия
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Вид стипендия</InputLabel>
        <Select value={formData.scholarshipType} onChange={(e) => onChange(e.target.value)} label="Вид стипендия">
          {scholarshipOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
