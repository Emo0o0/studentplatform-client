import React from "react";
import { Paper, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { COUNTRY_CODES } from "../../constants/dropdownOptions";

export default function ForeignStudentStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Стипендия за чуждестранни студенти
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ minWidth: 210 }}>
            <InputLabel>Държава на произход</InputLabel>
            <Select
              value={formData.countryOfOrigin || ""}
              onChange={(e) => onChange({ ...formData, countryOfOrigin: e.target.value })}
              label="Държава на произход"
            >
              {COUNTRY_CODES.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}
