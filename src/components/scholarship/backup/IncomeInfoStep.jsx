import React from "react";
import { Box, Grid, TextField, Typography, Paper, Button, IconButton, Divider } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

export default function IncomeInfoStep({ formData, onChange }) {
  const handleIncomeChange = (field, value) => {
    onChange({
      ...formData.incomeInfo,
      [field]: value,
    });
  };

  const addSibling = () => {
    const siblings = [...(formData.incomeInfo?.siblings || [])];
    siblings.push({ fullName: "", educationStatus: "" });
    handleIncomeChange("siblings", siblings);
  };

  const removeSibling = (index) => {
    const siblings = [...(formData.incomeInfo?.siblings || [])];
    siblings.splice(index, 1);
    handleIncomeChange("siblings", siblings);
  };

  const updateSibling = (index, field, value) => {
    const siblings = [...(formData.incomeInfo?.siblings || [])];
    siblings[index] = { ...siblings[index], [field]: value };
    handleIncomeChange("siblings", siblings);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Информация за доходите
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Месечен доход"
            type="number"
            value={formData.incomeInfo?.monthlyIncome || ""}
            onChange={(e) => handleIncomeChange("monthlyIncome", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Брой членове в семейството"
            type="number"
            value={formData.incomeInfo?.familyMembers || ""}
            onChange={(e) => handleIncomeChange("familyMembers", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1">Братя/Сестри</Typography>
            <Button startIcon={<AddIcon />} onClick={addSibling} sx={{ ml: 2 }}>
              Добави
            </Button>
          </Box>

          {(formData.incomeInfo?.siblings || []).map((sibling, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Име"
                    value={sibling.fullName}
                    onChange={(e) => updateSibling(index, "fullName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Статус на обучение"
                    value={sibling.educationStatus}
                    onChange={(e) => updateSibling(index, "educationStatus", e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeSibling(index)} color="error">
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
