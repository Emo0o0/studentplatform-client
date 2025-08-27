import React, { useMemo } from "react";
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

// Match FamilyStatus.java enum
const familyStatuses = [
  { id: "MARRIED", label: "Семейни" },
  { id: "SINGLE", label: "Несемейни" },
];

// Match all fields from FamilyIncomeInfo.java
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
  const handleChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  // Children handlers (from Child.java)
  const addChild = () => {
    const children = [...(formData.children || [])];
    children.push({ fullName: "", birthDate: "" });
    handleChange("children", children);
  };

  const removeChild = (index) => {
    const children = [...(formData.children || [])];
    children.splice(index, 1);
    handleChange("children", children);
  };

  // Siblings handlers (from Sibling.java)
  const addSibling = () => {
    const siblings = [...(formData.siblings || [])];
    siblings.push({ fullName: "", educationStatus: "" });
    handleChange("siblings", siblings);
  };

  const removeSibling = (index) => {
    const siblings = [...(formData.siblings || [])];
    siblings.splice(index, 1);
    handleChange("siblings", siblings);
  };

  // Calculate totals for FamilyIncomeInfo
  const totalIncome = useMemo(() => {
    return incomeFields.reduce((sum, field) => {
      const value = parseFloat(formData[field.id]) || 0;
      return Math.round((sum + value) * 100) / 100;
    }, 0);
  }, [formData]);

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
                value={formData.familyStatus || ""}
                onChange={(e) => handleChange("familyStatus", e.target.value)}
                label="Семейно положение"
              >
                {familyStatuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Married Family Section */}
        {formData.familyStatus === "MARRIED" && (
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
                    value={formData.spouseName || ""}
                    onChange={(e) => handleChange("spouseName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Трудов статус на съпруг/а"
                    value={formData.spouseEmploymentStatus || ""}
                    onChange={(e) => handleChange("spouseEmploymentStatus", e.target.value)}
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
                  {(formData.children || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Няма добавени деца
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {(formData.children || []).map((child, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField
                              sx={{ flex: 2 }}
                              label="Име на детето"
                              value={child.fullName || ""}
                              onChange={(e) => {
                                const children = [...formData.children];
                                children[index] = { ...children[index], fullName: e.target.value };
                                handleChange("children", children);
                              }}
                            />
                            <TextField
                              sx={{ flex: 1 }}
                              label="Дата на раждане"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={child.birthDate || ""}
                              onChange={(e) => {
                                const children = [...formData.children];
                                children[index] = { ...children[index], birthDate: e.target.value };
                                handleChange("children", children);
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
        {formData.familyStatus === "SINGLE" && (
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
                    value={formData.fatherName || ""}
                    onChange={(e) => handleChange("fatherName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Име на майка"
                    value={formData.motherName || ""}
                    onChange={(e) => handleChange("motherName", e.target.value)}
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
                  {(formData.siblings || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Няма добавени братя/сестри
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {(formData.siblings || []).map((sibling, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField
                              sx={{ flex: 2 }}
                              label="Име"
                              value={sibling.fullName || ""}
                              onChange={(e) => {
                                const siblings = [...formData.siblings];
                                siblings[index] = { ...siblings[index], fullName: e.target.value };
                                handleChange("siblings", siblings);
                              }}
                            />
                            <TextField
                              sx={{ flex: 1 }}
                              label="Учебно заведение"
                              value={sibling.educationStatus || ""}
                              onChange={(e) => {
                                const siblings = [...formData.siblings];
                                siblings[index] = { ...siblings[index], educationStatus: e.target.value };
                                handleChange("siblings", siblings);
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
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Общ доход"
                  type="number"
                  value={totalIncome}
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
