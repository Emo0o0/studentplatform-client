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
            Изисква се успех от 5.00 до 6.00
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Среден успех от предходен семестър"
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
