import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Typography, Paper, Grid } from "@mui/material";
import { SOCIAL_TYPES } from "../../constants/dropdownOptions";

export default function SocialScholarshipStep({ formData = {}, onChange }) {
  // Create a proper handler that updates the object structure
  const handleChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Вид социална стипендия
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ minWidth: 220 }}>
            <InputLabel>Изберете основание</InputLabel>
            <Select
              value={formData.socialType || ""}
              onChange={(e) => handleChange("socialType", e.target.value)}
              label="Изберете основание"
            >
              {SOCIAL_TYPES.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}
