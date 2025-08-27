import React from "react";
import { Grid, TextField, Typography, Paper, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BANK_OPTIONS } from "../../constants/dropdownOptions";

export default function BankInfoStep({ formData, onChange }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Банкова информация
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth size="medium">
            <InputLabel id="bank-label" sx={{ backgroundColor: "white", px: 1 }}>
              Банка
            </InputLabel>
            <Select
              labelId="bank-label"
              value={formData.bankInfo?.bankName || ""}
              onChange={(e) => onChange({ ...formData.bankInfo, bankName: e.target.value })}
              sx={{ minWidth: 200 }}
            >
              {BANK_OPTIONS.map((bank) => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="IBAN"
            size="medium"
            value={formData.bankInfo?.iban || ""}
            onChange={(e) => onChange({ ...formData.bankInfo, iban: e.target.value })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
