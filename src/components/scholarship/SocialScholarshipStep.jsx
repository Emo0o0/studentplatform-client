// New component: SocialScholarshipStep.jsx
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Typography, Paper } from "@mui/material";

const socialTypes = [
  {
    id: "DISABLED_STUDENT",
    label: "Студент с трайни увреждания",
  },
  {
    id: "ORPHAN_STUDENT",
    label: "Несемеен студент без двама родители",
  },
  {
    id: "ONE_PARENT_DECEASED_ONE_DISABLED",
    label: "Несемеен студент с починал родител и родител, който е с трайни увреждания",
  },
  {
    id: "BOTH_PARENTS_DISABLED",
    label: "Студент с двама родители с трайни увреждания",
  },
  {
    id: "PARENT_WITH_CHILD_UNDER_6",
    label: "Майки/Бащи на деца до 6 год. възраст",
  },
  {
    id: "CHILD_PROTECTION_MEASURE",
    label: "Студент, който до пълнолетие са с предприета мярка за закрила по реда на ЗЗД",
  },
];

export default function SocialScholarshipStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Вид социална стипендия
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Изберете основание</InputLabel>
        <Select value={formData.socialType || ""} onChange={(e) => onChange(e.target.value)} label="Изберете основание">
          {socialTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
