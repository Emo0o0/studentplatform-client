import React from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";

export default function SpecialAchievementsStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Стипендия за специални постижения
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Опишете постижението"
            value={formData.achievementDescription || ""}
            onChange={(e) => onChange({ ...formData, achievementDescription: e.target.value })}
            helperText="Опишете научното/спортното/културното постижение"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
