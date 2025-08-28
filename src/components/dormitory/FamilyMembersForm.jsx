import React from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function FamilyMembersForm({ familyInfo, handleFamilyInfoChange }) {
  const addSibling = () => {
    const siblings = [...(familyInfo.siblings || [])];
    siblings.push({ name: "", address: "", phone: "", type: "brother" });
    handleFamilyInfoChange("siblings", siblings);
  };

  const updateSibling = (index, field, value) => {
    const siblings = [...(familyInfo.siblings || [])];
    siblings[index] = { ...siblings[index], [field]: value };
    handleFamilyInfoChange("siblings", siblings);
  };

  const removeSibling = (index) => {
    const siblings = [...(familyInfo.siblings || [])];
    siblings.splice(index, 1);
    handleFamilyInfoChange("siblings", siblings);
  };

  const addChild = () => {
    const children = [...(familyInfo.children || [])];
    children.push({ name: "", birthDate: null });
    handleFamilyInfoChange("children", children);
  };

  const updateChild = (index, field, value) => {
    const children = [...(familyInfo.children || [])];
    children[index] = { ...children[index], [field]: value };
    handleFamilyInfoChange("children", children);
  };

  const removeChild = (index) => {
    const children = [...(familyInfo.children || [])];
    children.splice(index, 1);
    handleFamilyInfoChange("children", children);
  };

  const updateParentInfo = (parent, field, value) => {
    const updatedParent = { ...(familyInfo[parent] || {}), [field]: value };
    handleFamilyInfoChange(parent, updatedParent);
  };

  const updateSpouseInfo = (field, value) => {
    const updatedSpouse = { ...(familyInfo.spouse || {}), [field]: value };
    handleFamilyInfoChange("spouse", updatedSpouse);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Информация за семейството
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            1. Баща
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Трите имена"
              value={familyInfo?.father?.name || ""}
              onChange={(e) => updateParentInfo("father", "name", e.target.value)}
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Адрес"
                value={familyInfo?.father?.address || ""}
                onChange={(e) => updateParentInfo("father", "address", e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                label="Телефон"
                value={familyInfo?.father?.phone || ""}
                onChange={(e) => updateParentInfo("father", "phone", e.target.value)}
                sx={{ width: "200px" }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            2. Майка
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Трите имена"
              value={familyInfo?.mother?.name || ""}
              onChange={(e) => updateParentInfo("mother", "name", e.target.value)}
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Адрес"
                value={familyInfo?.mother?.address || ""}
                onChange={(e) => updateParentInfo("mother", "address", e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                label="Телефон"
                value={familyInfo?.mother?.phone || ""}
                onChange={(e) => updateParentInfo("mother", "phone", e.target.value)}
                sx={{ width: "200px" }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1">3. Брат/Сестра</Typography>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addSibling} variant="outlined" size="small">
              Добави
            </Button>
          </Box>

          {Array.isArray(familyInfo?.siblings) &&
            familyInfo.siblings.map((sibling, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mb: 3,
                  pb: 2,
                  position: "relative",
                  borderBottom: index < familyInfo.siblings.length - 1 ? "1px dashed #ccc" : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body2" sx={{ width: "80px" }}>
                    Тип:
                  </Typography>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Тип</InputLabel>
                    <Select
                      value={sibling.type || "brother"}
                      label="Тип"
                      onChange={(e) => updateSibling(index, "type", e.target.value)}
                    >
                      <MenuItem value="brother">Брат</MenuItem>
                      <MenuItem value="sister">Сестра</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton color="error" onClick={() => removeSibling(index)} sx={{ ml: "auto" }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <TextField
                  label="Трите имена"
                  value={sibling.name || ""}
                  onChange={(e) => updateSibling(index, "name", e.target.value)}
                  fullWidth
                />

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    label="Адрес"
                    value={sibling.address || ""}
                    onChange={(e) => updateSibling(index, "address", e.target.value)}
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    label="Телефон"
                    value={sibling.phone || ""}
                    onChange={(e) => updateSibling(index, "phone", e.target.value)}
                    sx={{ width: "200px" }}
                  />
                </Box>

                <TextField
                  label="Учащ се в"
                  value={sibling.school || ""}
                  onChange={(e) => updateSibling(index, "school", e.target.value)}
                  fullWidth
                  placeholder="Училище/Университет"
                />
              </Box>
            ))}
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            4. Съпруг/а
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Трите имена"
              value={familyInfo?.spouse?.name || ""}
              onChange={(e) => updateSpouseInfo("name", e.target.value)}
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Адрес"
                value={familyInfo?.spouse?.address || ""}
                onChange={(e) => updateSpouseInfo("address", e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                label="Телефон"
                value={familyInfo?.spouse?.phone || ""}
                onChange={(e) => updateSpouseInfo("phone", e.target.value)}
                sx={{ width: "200px" }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1">5. Деца</Typography>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addChild} variant="outlined" size="small">
              Добави
            </Button>
          </Box>

          {Array.isArray(familyInfo?.children) &&
            familyInfo.children.map((child, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mb: 3,
                  pb: 2,
                  position: "relative",
                  borderBottom: index < familyInfo.children.length - 1 ? "1px dashed #ccc" : "none",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2">Дете {index + 1}</Typography>
                  <IconButton color="error" onClick={() => removeChild(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <TextField
                  label="Трите имена"
                  value={child.name || ""}
                  onChange={(e) => updateChild(index, "name", e.target.value)}
                  fullWidth
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Дата на раждане"
                    value={child.birthDate || null}
                    onChange={(newValue) => updateChild(index, "birthDate", newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default FamilyMembersForm;
