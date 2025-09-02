import React from "react";
import { Container, Typography, Box, Paper, Card, CardContent, CardActions, Button, IconButton } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AdminFormsSelection() {
  const navigate = useNavigate();

  const formCategories = [
    {
      title: "Стипендии",
      description: "Преглед и одобрение на формуляри за стипендии",
      icon: <SchoolIcon fontSize="large" color="primary" />,
      path: "/admin/forms/scholarship",
    },
    {
      title: "Здравно осигуряване",
      description: "Преглед и одобрение на формуляри за здравно осигуряване",
      icon: <LocalHospitalIcon fontSize="large" color="primary" />,
      path: "/admin/forms/insurance",
    },
    {
      title: "Общежития",
      description: "Преглед и одобрение на формуляри за настаняване в общежитие",
      icon: <HomeIcon fontSize="large" color="primary" />,
      path: "/admin/forms/dormitory",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Преглед и одобрение на формуляри</Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Изберете категория формуляри за преглед и одобрение
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "stretch",
            gap: 3,
            maxWidth: "950px",
            mx: "auto",
          }}
        >
          {formCategories.map((category, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: { xs: "1", sm: "1 1 0px" }, // Equal width on sm and up
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    p: 2,
                    borderRadius: "50%",
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                    width: "fit-content",
                    mx: "auto",
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={category.path} variant="contained" fullWidth>
                  Преглед
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}

export default AdminFormsSelection;
