// Updated ScholarshipTypeStep.jsx with proper options from ScholarshipType.java
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Typography, Paper } from "@mui/material";
import { SCHOLARSHIP_OPTIONS } from "../../constants/dropdownOptions";

export default function ScholarshipTypeStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Изберете вид стипендия
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Вид стипендия</InputLabel>
        <Select value={formData.scholarshipType} onChange={(e) => onChange(e.target.value)} label="Вид стипендия">
          {SCHOLARSHIP_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
