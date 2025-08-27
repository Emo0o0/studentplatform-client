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

export default function MeritIncomeStep3({ formData, onChange }) {
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
      <Typography variant="h6" gutterBottom>
        Стипендия за успех и доход
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth size="medium">
            <InputLabel sx={{ backgroundColor: "white", px: 1 }}>Семейно положение</InputLabel>
            <Select
              value={formData.familyStatus || ""}
              onChange={(e) => handleChange("familyStatus", e.target.value)}
              label="Семейно положение"
              sx={{ minWidth: 220 }}
            >
              {familyStatuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Married-specific fields */}
        {formData.familyStatus === "MARRIED" && (
          <>
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
          </>
        )}

        {/* Single-specific fields */}
        {formData.familyStatus === "SINGLE" && (
          <>
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
          </>
        )}

        {/* Income Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Доходи на семейството
          </Typography>
        </Grid>

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

        <Grid item xs={12}>
          <TextField fullWidth label="Общ доход" type="number" value={totalIncome} InputProps={{ readOnly: true }} />
        </Grid>

        {/* Continue with children and siblings sections... */}
        {/* Children Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1">Деца</Typography>
            <Button startIcon={<AddIcon />} onClick={addChild}>
              Добави дете
            </Button>
          </Box>
        </Grid>

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
              <IconButton onClick={() => removeChild(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}

        {/* Siblings Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1">Братя/Сестри учащи</Typography>
            <Button startIcon={<AddIcon />} onClick={addSibling}>
              Добави брат/сестра
            </Button>
          </Box>
        </Grid>

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
              <IconButton onClick={() => removeSibling(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}

        {/* Total Members Display */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Общ брой членове в семейството:{" "}
            {1 + // student
              (formData.familyStatus === "MARRIED" ? 1 : 2) + // spouse or parents
              (formData.children?.length || 0) +
              (formData.siblings?.length || 0)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
