import React, { useState, useMemo, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { FAMILY_STATUSES } from "../../constants/dropdownOptions";

const incomeFields = [
  { id: "salaries", label: "Заплати" },
  { id: "pensions", label: "Пенсии" },
  { id: "unemploymentBenefits", label: "Обезщетения за безработица" },
  { id: "socialAid", label: "Социални помощи" },
  { id: "familyAllowances", label: "Семейни добавки" },
  { id: "childCareAllowances", label: "Помощи за отглеждане на деца" },
  { id: "personalScholarships", label: "Лични стипендии" },
  { id: "rent", label: "Наеми" },
  { id: "honorariums", label: "Хонорари" },
  { id: "alimony", label: "Издръжки" },
  { id: "businessIncome", label: "Доходи от бизнес" },
  { id: "otherIncome", label: "Други доходи" },
];

export default function MeritIncomeStep({ formData, onChange }) {
  // Initialize formData.specificInfo and formData.incomeInfo if they don't exist
  useEffect(() => {
    if (!formData.specificInfo || !formData.incomeInfo) {
      onChange({
        ...formData,
        specificInfo: formData.specificInfo || {},
        incomeInfo: formData.incomeInfo || {},
      });
    }
  }, []);

  // Handle changes to specificInfo fields
  const handleSpecificInfoChange = (field, value) => {
    onChange({
      ...formData,
      specificInfo: {
        ...formData.specificInfo,
        [field]: value,
      },
    });
  };

  // Handle changes to incomeInfo fields
  const handleIncomeInfoChange = (field, value) => {
    onChange({
      ...formData,
      incomeInfo: {
        ...formData.incomeInfo,
        [field]: value,
      },
    });
  };

  // Children handlers
  const addChild = () => {
    const children = [...(formData.incomeInfo?.children || [])];
    children.push({ fullName: "", birthDate: "" });
    handleIncomeInfoChange("children", children);
  };

  const removeChild = (index) => {
    const children = [...(formData.incomeInfo?.children || [])];
    children.splice(index, 1);
    handleIncomeInfoChange("children", children);
  };

  // Siblings handlers
  const addSibling = () => {
    const siblings = [...(formData.incomeInfo?.siblings || [])];
    siblings.push({ fullName: "", educationStatus: "" });
    handleIncomeInfoChange("siblings", siblings);
  };

  const removeSibling = (index) => {
    const siblings = [...(formData.incomeInfo?.siblings || [])];
    siblings.splice(index, 1);
    handleIncomeInfoChange("siblings", siblings);
  };

  // Calculate totals for FamilyIncomeInfo
  const totalIncome = useMemo(() => {
    let sum = 0;
    incomeFields.forEach((field) => {
      const value = parseFloat(formData.incomeInfo?.[field.id]) || 0;
      sum += value;
    });
    return Math.round(sum * 100) / 100;
  }, [formData.incomeInfo]);

  // Calculate family member count
  const getFamilyMemberCount = () => {
    let count = 1; // The student

    if (formData.specificInfo?.familyStatus === "MARRIED") {
      count += 1; // Spouse
      count += (formData.incomeInfo?.children || []).length; // Children
    } else if (formData.specificInfo?.familyStatus === "SINGLE") {
      if (formData.incomeInfo?.fatherName) count += 1; // Father
      if (formData.incomeInfo?.motherName) count += 1; // Mother
      count += (formData.incomeInfo?.siblings || []).length; // Siblings
    }

    return count;
  };

  // Update calculated values when income changes
  useEffect(() => {
    const memberCount = getFamilyMemberCount();
    const monthlyPerMember = memberCount > 0 ? Math.round((totalIncome / memberCount) * 100) / 100 : 0;

    handleSpecificInfoChange("totalIncome", totalIncome.toString());
    handleSpecificInfoChange("monthlyIncome", monthlyPerMember.toString());
    handleSpecificInfoChange("familyMemberCount", memberCount.toString());
  }, [totalIncome, formData.incomeInfo?.children, formData.incomeInfo?.siblings]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Стипендия за успех и доход
      </Typography>

      <Grid container spacing={3}>
        {/* Family Status Section */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Семейно положение
            </Typography>
            <FormControl fullWidth size="medium">
              <InputLabel>Семейно положение</InputLabel>
              <Select
                value={formData.specificInfo?.familyStatus || ""}
                onChange={(e) => handleSpecificInfoChange("familyStatus", e.target.value)}
                label="Семейно положение"
              >
                {FAMILY_STATUSES.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Married Family Section */}
        {formData.specificInfo?.familyStatus === "MARRIED" && (
          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Информация за семейството
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Име на съпруг/а"
                    value={formData.incomeInfo?.spouseName || ""}
                    onChange={(e) => handleIncomeInfoChange("spouseName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Трудов статус на съпруг/а"
                    value={formData.incomeInfo?.spouseEmploymentStatus || ""}
                    onChange={(e) => handleIncomeInfoChange("spouseEmploymentStatus", e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="subtitle2">Деца</Typography>
                  <Button startIcon={<AddIcon />} onClick={addChild} size="small">
                    Добави дете
                  </Button>
                </Box>
                <Box sx={{ width: "100%" }}>
                  {(formData.incomeInfo?.children || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Няма добавени деца
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {(formData.incomeInfo?.children || []).map((child, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField
                              sx={{ flex: 2 }}
                              label="Име на детето"
                              value={child.fullName || ""}
                              onChange={(e) => {
                                const children = [...(formData.incomeInfo?.children || [])];
                                children[index] = { ...children[index], fullName: e.target.value };
                                handleIncomeInfoChange("children", children);
                              }}
                            />
                            <TextField
                              sx={{ flex: 1 }}
                              label="Дата на раждане"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={child.birthDate || ""}
                              onChange={(e) => {
                                const children = [...(formData.incomeInfo?.children || [])];
                                children[index] = { ...children[index], birthDate: e.target.value };
                                handleIncomeInfoChange("children", children);
                              }}
                            />
                            <IconButton onClick={() => removeChild(index)} color="error" size="small">
                              <RemoveIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        )}

        {/* Single Family Section */}
        {formData.specificInfo?.familyStatus === "SINGLE" && (
          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Информация за родители
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Име на баща"
                    value={formData.incomeInfo?.fatherName || ""}
                    onChange={(e) => handleIncomeInfoChange("fatherName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Статус на баща"
                    value={formData.incomeInfo?.fatherStatus || ""}
                    onChange={(e) => handleIncomeInfoChange("fatherStatus", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Име на майка"
                    value={formData.incomeInfo?.motherName || ""}
                    onChange={(e) => handleIncomeInfoChange("motherName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Статус на майка"
                    value={formData.incomeInfo?.motherStatus || ""}
                    onChange={(e) => handleIncomeInfoChange("motherStatus", e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="subtitle2">Братя/Сестри</Typography>
                  <Button startIcon={<AddIcon />} onClick={addSibling} size="small">
                    Добави брат/сестра
                  </Button>
                </Box>
                <Box sx={{ width: "100%" }}>
                  {(formData.incomeInfo?.siblings || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Няма добавени братя/сестри
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {(formData.incomeInfo?.siblings || []).map((sibling, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField
                              sx={{ flex: 2 }}
                              label="Име"
                              value={sibling.fullName || ""}
                              onChange={(e) => {
                                const siblings = [...(formData.incomeInfo?.siblings || [])];
                                siblings[index] = { ...siblings[index], fullName: e.target.value };
                                handleIncomeInfoChange("siblings", siblings);
                              }}
                            />
                            <TextField
                              sx={{ flex: 1 }}
                              label="Учебно заведение"
                              value={sibling.educationStatus || ""}
                              onChange={(e) => {
                                const siblings = [...(formData.incomeInfo?.siblings || [])];
                                siblings[index] = { ...siblings[index], educationStatus: e.target.value };
                                handleIncomeInfoChange("siblings", siblings);
                              }}
                            />
                            <IconButton onClick={() => removeSibling(index)} color="error" size="small">
                              <RemoveIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        )}

        {/* Income Section */}
        <Grid item xs={12}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Доходи на семейството
            </Typography>
            <Box sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
              <Grid container spacing={2}>
                {incomeFields.map((field) => (
                  <Grid item xs={12} sm={6} key={field.id}>
                    <TextField
                      fullWidth
                      label={field.label}
                      type="number"
                      inputProps={{ min: 0, step: "0.01" }}
                      value={formData.incomeInfo?.[field.id] || ""}
                      onChange={(e) => handleIncomeInfoChange(field.id, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
