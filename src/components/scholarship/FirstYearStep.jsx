import React from "react";
import { Paper, Typography, TextField, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DIRECTION_OPTIONS, SUBJECT_OPTIONS } from "../../constants/dropdownOptions";

export default function FirstYearStep({ formData, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Стипендия за първокурсник
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ minWidth: 220 }}>
            <InputLabel>Професионално направление</InputLabel>
            <Select
              value={formData.professionalDirection || ""}
              onChange={(e) => handleChange("professionalDirection", e.target.value)}
              label="Професионално направление"
            >
              {DIRECTION_OPTIONS.map((dir) => (
                <MenuItem key={dir.id} value={dir.id}>
                  {dir.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Оценка БЕЛ"
            type="number"
            inputProps={{ step: 0.01 }}
            value={formData.bulgarianLanguageGrade || ""}
            onChange={(e) => handleChange("bulgarianLanguageGrade", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel>Втори предмет</InputLabel>
            <Select
              value={formData.secondSubject || ""}
              onChange={(e) => handleChange("secondSubject", e.target.value)}
              label="Втори предмет"
            >
              {SUBJECT_OPTIONS.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Оценка втори предмет"
            type="number"
            inputProps={{ step: 0.01 }}
            value={formData.secondSubjectGrade || ""}
            onChange={(e) => handleChange("secondSubjectGrade", e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
