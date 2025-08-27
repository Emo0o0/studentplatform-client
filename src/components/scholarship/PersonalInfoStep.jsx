import React from "react";
import { Grid, TextField, Typography, Box, Paper, Divider } from "@mui/material";

export default function PersonalInfoStep({ formData = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Лична информация
      </Typography>

      <Grid container spacing={3}>
        {/* Names Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Имена
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Име"
                value={formData.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Презиме"
                value={formData.middleName || ""}
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Фамилия"
                value={formData.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Контактна информация
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="ЕГН"
                value={formData.egn || ""}
                onChange={(e) => handleChange("egn", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Телефон"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Address Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Адрес
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Населено място"
                value={formData.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Улица"
                value={formData.street || ""}
                onChange={(e) => handleChange("street", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="Номер"
                value={formData.streetNumber || ""}
                onChange={(e) => handleChange("streetNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Вход"
                value={formData.entrance || ""}
                onChange={(e) => handleChange("entrance", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Етаж"
                value={formData.floor || ""}
                onChange={(e) => handleChange("floor", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Апартамент"
                value={formData.apartment || ""}
                onChange={(e) => handleChange("apartment", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
