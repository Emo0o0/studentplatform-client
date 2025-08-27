import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  EventNote as EventNoteIcon,
  Stars as StarsIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const courses = [
    { id: 1, title: "React Fundamentals", description: "Learn the basics of React development" },
    { id: 2, title: "Advanced JavaScript", description: "Deep dive into modern JavaScript features" },
    { id: 3, title: "Material-UI Design", description: "Build beautiful interfaces with MUI" },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ p: 2 }}>
            Меню
          </Typography>
        </ListItem>
        {[
          { text: "Програма", icon: <EventNoteIcon /> },
          { text: "Учебен план", icon: <SchoolIcon /> },
          { text: "Оценки", icon: <StarsIcon /> },
          { text: "Формуляри", icon: <AssignmentIcon /> },
          { text: "Лична информация", icon: <PersonIcon /> },
        ].map((item) => (
          <ListItemButton key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Студентско състояние
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
      <div style={{ height: "150vh" }} />

      <div>Element to test (scroll down to see)</div>
    </Box>
  );
}

export default App;
