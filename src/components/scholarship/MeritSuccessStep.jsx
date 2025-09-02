import React from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";
import { useState, useEffect } from "react";

export default function MeritSuccessStep({ formData, onChange, onValidationChange }) {
  const [errors, setErrors] = useState({
    previousGPA: "",
  });

  const validateGPA = (value) => {
    // If empty, show required error
    if (!value) {
      return "Успехът е задължителен";
    }

    // Convert to number for comparison
    const numValue = parseFloat(value);

    // Check if valid number
    if (isNaN(numValue)) {
      return "Въведете валидно число";
    }

    // Check range
    if (numValue < 2.0 || numValue > 6.0) {
      return "Успехът трябва да е между 2.00 и 6.00";
    }

    // Valid
    return "";
  };

  const handleGPAChange = (e) => {
    const value = e.target.value;
    const errorMessage = validateGPA(value);

    setErrors({
      ...errors,
      previousGPA: errorMessage,
    });

    // Update form data
    onChange({ ...formData, previousGPA: value });
  };

  // Validate form and notify parent
  const validateForm = () => {
    const isValid = !errors.previousGPA && formData.previousGPA;
    return isValid;
  };

  // Update validation status whenever relevant data changes
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(validateForm());
    }
  }, [formData, errors]);

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
            onChange={handleGPAChange}
            error={!!errors.previousGPA}
            helperText={errors.previousGPA || "Въведете успех между 5.00 и 6.00"}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
