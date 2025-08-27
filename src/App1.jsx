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
} from "@mui/icons-material";

function App() {
  // State to control sidebar drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sample data for cards
  const courses = [
    { id: 1, title: "React Fundamentals", description: "Learn the basics of React development" },
    { id: 2, title: "Advanced JavaScript", description: "Deep dive into modern JavaScript features" },
    { id: 3, title: "Material-UI Design", description: "Build beautiful interfaces with MUI" },
  ];

  // Function to toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Sidebar content
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ p: 2 }}>
            Student Platform
          </Typography>
        </ListItem>
        {[
          { text: "Dashboard", icon: <HomeIcon /> },
          { text: "Courses", icon: <SchoolIcon /> },
          { text: "Profile", icon: <PersonIcon /> },
          { text: "Settings", icon: <SettingsIcon /> },
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
      {/* Top Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Student Platform
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your courses and track your progress
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField fullWidth label="Search courses..." variant="outlined" sx={{ maxWidth: 600 }} />
        </Box>

        {/* Course Cards Grid */}
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">
                    View Course
                  </Button>
                  <Button size="small" variant="outlined">
                    Enroll
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Your Stats
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="primary">
                    12
                  </Typography>
                  <Typography variant="body1">Courses Completed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="secondary">
                    4
                  </Typography>
                  <Typography variant="body1">In Progress</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="success.main">
                    87%
                  </Typography>
                  <Typography variant="body1">Average Score</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="warning.main">
                    24
                  </Typography>
                  <Typography variant="body1">Hours This Week</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
