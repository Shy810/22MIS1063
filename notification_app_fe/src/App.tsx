import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';
import { AllNotifications } from './pages/AllNotifications';
import { PriorityInbox } from './pages/PriorityInbox';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Navigation = () => {
  const location = useLocation();
  
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
          Campus Notifications
        </Typography>
        <Box display="flex" gap={1}>
          <Button 
            component={Link} 
            to="/" 
            color={location.pathname === '/' ? 'primary' : 'inherit'}
            variant={location.pathname === '/' ? 'contained' : 'text'}
            startIcon={<NotificationsIcon />}
          >
            All
          </Button>
          <Button 
            component={Link} 
            to="/priority" 
            color={location.pathname === '/priority' ? 'primary' : 'inherit'}
            variant={location.pathname === '/priority' ? 'contained' : 'text'}
            startIcon={<StarIcon />}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
