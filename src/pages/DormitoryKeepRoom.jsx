import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Alert,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keepDormitoryRoom } from "../services/dormitoryService";

function DormitoryKeepRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    buildingNumber: "",
    roomNumber: "",
    academicYear: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    setError("");

    if (!formData.buildingNumber) {
      setError("Моля въведете номер на блок.");
      return false;
    }

    if (!formData.roomNumber) {
      setError("Моля въведете номер на стая.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await keepDormitoryRoom(formData);
      setSuccess(true);

      // Navigate to the full dormitory application with the keepRoomFormId
      navigate("/dormitory-apply", {
        state: {
          keepRoomFormId: response.id,
          keepRoomData: formData,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "Възникна грешка при подаване на заявлението.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/dormitory-apply");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Искане за запазване на стая
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" paragraph>
          Попълнете тази форма ако желаете да запазите стаята, в която сте били настанени предходната година
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Искането е подадено успешно. Продължете с основната форма за кандидатстване.
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
          <TextField
            label="Учебна година"
            value={formData.academicYear}
            onChange={(e) => handleInputChange("academicYear", e.target.value)}
            fullWidth
            disabled
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              required
              label="Блок №"
              type="number"
              value={formData.buildingNumber}
              onChange={(e) => handleInputChange("buildingNumber", e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              required
              label="Стая №"
              type="number"
              value={formData.roomNumber}
              onChange={(e) => handleInputChange("roomNumber", e.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Съгласно чл. 10, ал. 1, т. 4 и чл. 12, ал. 2 от Правилника за настаняване и реда на ползване на студентските
            общежития и столове към Технически университет – Варна, заявявам желанието си да ползвам стаята, в която съм
            бил настанен предходната година.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button variant="outlined" color="primary" onClick={handleSkip} disabled={loading} fullWidth={isMobile}>
            Пропусни този етап
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth={isMobile}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Изпращане..." : "Продължи"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default DormitoryKeepRoom;
