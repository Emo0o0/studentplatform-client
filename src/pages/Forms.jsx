import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";

function Forms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [healthDialogOpen, setHealthDialogOpen] = useState(false);

  const handleOpenHealthDialog = () => {
    setHealthDialogOpen(true);
  };

  const handleCloseHealthDialog = () => {
    setHealthDialogOpen(false);
  };

  const healthInsuranceOptions = [
    {
      title: "Здравно осигуряване за текущ период",
      description: "Подайте заявление за здравно осигуряване за текущата академична година",
      path: "/health-insurance",
    },
    {
      title: "Здравно осигуряване за минал период",
      description: "Подайте заявление за здравно осигуряване за минал период, за който не сте били осигурени",
      path: "/health-insurance-previous",
    },
    {
      title: "Прекратяване на здравно осигуряване",
      description: "Подайте заявление за прекратяване на здравно осигуряване през университета",
      path: "/health-insurance-terminate",
    },
  ];

  const formTypes = [
    {
      title: "Стипендии",
      description:
        "Кандидатствайте за различни типове студентски стипендии - успех, социални, специални постижения и други.",
      icon: <SchoolIcon fontSize="large" color="primary" />,
      path: "/scholarship",
      onClick: null,
    },
    {
      title: "Здравно осигуряване",
      description: "Подайте заявление за здравно осигуряване за студенти с актуална информация и необходими документи.",
      icon: <LocalHospitalIcon fontSize="large" color="primary" />,
      path: "#",
      onClick: handleOpenHealthDialog,
    },
    {
      title: "Общежития",
      description: "Кандидатствайте за настаняване в студентски общежития и проверете възможностите за настаняване.",
      icon: <HomeIcon fontSize="large" color="primary" />,
      path: "/dormitory-keep-room", // This now goes to the keep room form first
      onClick: null, // Let the router handle navigation
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 3 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Студентски формуляри
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Изберете типа формуляр, който желаете да попълните
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "stretch",
            gap: 2,
            maxWidth: "950px",
            mx: "auto",
          }}
        >
          {formTypes.map((form, index) => (
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
                  {form.icon}
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  {form.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {form.description}
                </Typography>
              </CardContent>
              <CardActions>
                {form.onClick ? (
                  <Button variant="contained" fullWidth onClick={form.onClick}>
                    Към формуляра
                  </Button>
                ) : (
                  <Button component={RouterLink} to={form.path} variant="contained" fullWidth>
                    Към формуляра
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Имате въпроси? Свържете се със студентската канцелария за повече информация.
          </Typography>
        </Box>
      </Paper>

      {/* Health Insurance Options Dialog */}
      <Dialog open={healthDialogOpen} onClose={handleCloseHealthDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Изберете тип здравно осигуряване</DialogTitle>
        <DialogContent>
          <List>
            {healthInsuranceOptions.map((option, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to={option.path} onClick={handleCloseHealthDialog}>
                    <ListItemText
                      primary={option.title}
                      secondary={option.description}
                      primaryTypographyProps={{ fontWeight: "medium" }}
                    />
                  </ListItemButton>
                </ListItem>
                {index < healthInsuranceOptions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Forms;
