import React from "react";
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

const familyStatuses = [
  { id: "MARRIED", label: "Женен/Омъжена" },
  { id: "SINGLE", label: "Неженен/Неомъжена" },
  { id: "DIVORCED", label: "Разведен/а" },
  { id: "WIDOWED", label: "Вдовец/Вдовица" },
];

export default function MeritIncomeStep2({ formData, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

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

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Стипендия за успех и доход
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Среден успех от предходен семестър"
            type="number"
            inputProps={{ min: 4.0, max: 4.99, step: 0.01 }}
            value={formData.previousGPA || ""}
            onChange={(e) => handleChange("previousGPA", e.target.value)}
            helperText="Въведете успех между 4.00 и 4.99"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
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
        </Grid>

        {/* Income fields */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Доходи на семейството
          </Typography>
        </Grid>

        {[
          { id: "salaries", label: "Заплати" },
          { id: "pensions", label: "Пенсии" },
          { id: "familyBenefits", label: "Семейни помощи" },
          { id: "scholarships", label: "Стипендии" },
          { id: "otherIncome", label: "Други доходи" },
        ].map((income) => (
          <Grid item xs={12} sm={6} key={income.id}>
            <TextField
              fullWidth
              label={income.label}
              type="number"
              inputProps={{ step: 0.01 }}
              value={formData[income.id] || ""}
              onChange={(e) => handleChange(income.id, e.target.value)}
            />
          </Grid>
        ))}

        {/* Children section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1">Деца</Typography>
            <Button startIcon={<AddIcon />} onClick={addChild}>
              Добави дете
            </Button>
          </Box>
        </Grid>

        {(formData.children || []).map((child, index) => (
          <Grid item xs={12} key={index}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                sx={{ flex: 2 }}
                label="Име на детето"
                value={child.fullName}
                onChange={(e) => {
                  const children = [...formData.children];
                  children[index].fullName = e.target.value;
                  handleChange("children", children);
                }}
              />
              <TextField
                sx={{ flex: 1 }}
                label="Дата на раждане"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={child.birthDate}
                onChange={(e) => {
                  const children = [...formData.children];
                  children[index].birthDate = e.target.value;
                  handleChange("children", children);
                }}
              />
              <IconButton onClick={() => removeChild(index)}>
                <RemoveIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
