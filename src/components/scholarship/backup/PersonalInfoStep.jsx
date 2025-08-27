import React from "react";
import { Box, Grid, TextField, Typography, Paper } from "@mui/material";

export default function PersonalInfoStep({ formData, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...formData.personalInfo,
      [field]: value,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Лична информация
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Име"
            value={formData.personalInfo?.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Фамилия"
            value={formData.personalInfo?.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Факултетен номер"
            value={formData.personalInfo?.facultyNumber || ""}
            onChange={(e) => handleChange("facultyNumber", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Специалност"
            value={formData.personalInfo?.specialty || ""}
            onChange={(e) => handleChange("specialty", e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
