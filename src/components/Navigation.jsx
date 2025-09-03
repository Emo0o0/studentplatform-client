import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  EventNote as EventNoteIcon,
  School as SchoolIcon,
  Stars as StarsIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import { useAuth } from "../config/AuthContext";

function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, loading, login, logout, user } = useAuth();

  const menuItems = [
    { text: "Програма", icon: <EventNoteIcon />, path: "/schedule" },
    { text: "Учебен план", icon: <SchoolIcon />, path: "/curriculum" },
    { text: "Оценки", icon: <StarsIcon />, path: "/grades" },
    { text: "Формуляри", icon: <AssignmentIcon />, path: "/forms" },
    { text: "Лична информация", icon: <PersonIcon />, path: "/profile" },
    { text: "Справки", icon: <AnalyticsIcon />, path: "/queries" },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ p: 2 }}>
            Меню
          </Typography>
        </ListItem>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleMenuClick(item.path)}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? "primary.contrastText" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const renderAuthSection = () => {
    if (authenticated) {
      return (
        <>
          {user && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user.name || user.username || "Потребител"}
            </Typography>
          )}
          <Button color="inherit" onClick={logout}>
            Изход
          </Button>
        </>
      );
    }

    if (loading && authenticated !== false) {
      return <CircularProgress color="inherit" size={24} />;
    }

    return (
      <Button color="inherit" onClick={login}>
        Вход
      </Button>
    );
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Студентско състояние
          </Typography>

          {renderAuthSection()}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Navigation;
