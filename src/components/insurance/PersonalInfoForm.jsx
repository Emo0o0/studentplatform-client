import React from "react";
import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { COURSE_YEARS, FACULTY_OPTIONS } from "../../constants/dropdownOptions";

function PersonalInfoForm({ formData, handleInputChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Лична информация
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          fullWidth
          label="Трите имена"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl required sx={{ flexGrow: 1, minWidth: "120px" }}>
            <InputLabel id="course-label">Курс</InputLabel>
            <Select
              labelId="course-label"
              value={formData.course}
              label="Курс"
              onChange={(e) => handleInputChange("course", e.target.value)}
            >
              <MenuItem value="">
                <em>Изберете</em>
              </MenuItem>
              {COURSE_YEARS.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Специалност"
            value={formData.specialty}
            onChange={(e) => handleInputChange("specialty", e.target.value)}
            sx={{ flexGrow: 1, minWidth: "120px" }}
          />
          <FormControl fullWidth required sx={{ minWidth: 120 }}>
            <InputLabel id="faculty-label">Факултет</InputLabel>
            <Select
              labelId="faculty-label"
              value={formData.faculty || ""}
              label="Факултет"
              onChange={(e) => handleInputChange("faculty", e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {FACULTY_OPTIONS.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            required
            label="Факултетен номер"
            value={formData.facultyNumber}
            onChange={(e) => handleInputChange("facultyNumber", e.target.value)}
            sx={{ flexGrow: 1, minWidth: "120px" }}
          />
          <TextField
            required
            label="Град/село"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            sx={{ flexGrow: 1, minWidth: "120px" }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            label="Улица/жк"
            value={formData.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            sx={{ flexGrow: 3, minWidth: "200px" }}
          />
          <TextField
            label="Блок"
            value={formData.block}
            onChange={(e) => handleInputChange("block", e.target.value)}
            sx={{ width: "80px" }}
          />
          <TextField
            label="Вход"
            value={formData.entrance}
            onChange={(e) => handleInputChange("entrance", e.target.value)}
            sx={{ width: "80px" }}
          />
          <TextField
            label="Етаж"
            value={formData.floor}
            onChange={(e) => handleInputChange("floor", e.target.value)}
            sx={{ width: "80px" }}
          />
          <TextField
            label="Ап."
            value={formData.apartment}
            onChange={(e) => handleInputChange("apartment", e.target.value)}
            sx={{ width: "80px" }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            required
            label="ЕГН"
            value={formData.egn}
            onChange={(e) => handleInputChange("egn", e.target.value)}
            sx={{ flexGrow: 1, minWidth: "120px" }}
          />
          <TextField
            label="Телефон"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            sx={{ flexGrow: 1, minWidth: "120px" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PersonalInfoForm;
