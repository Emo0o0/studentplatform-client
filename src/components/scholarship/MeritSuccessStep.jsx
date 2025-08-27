import React from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";

export default function MeritSuccessStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Стипендия за успех
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Среден успех от предходните 2 семестъра
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ minWidth: 120 }}
            fullWidth
            label="Успех"
            type="number"
            inputProps={{
              min: "5.00",
              max: "6.00",
              step: "0.01",
            }}
            value={formData?.previousGPA || ""}
            onChange={(e) => onChange({ ...formData, previousGPA: e.target.value })}
            helperText="Въведете успех между 5.00 и 6.00"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
