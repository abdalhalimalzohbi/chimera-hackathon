import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Container,
} from '@mui/material';
import { useDeviceContext } from '../context/DeviceContext';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';
import DeviceGrid from './DeviceGrid';
import logoImage from '../assets/image.png';

const Dashboard: React.FC = () => {
  const { devices, summary, loading, error } = useDeviceContext();
  const theme = useTheme();

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Loading devices...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="h6" 
            color="error"
            sx={{ fontWeight: 600 }}
          >
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        py: 3,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
            borderRadius: 4,
            p: 4,
            border: `1px solid ${theme.palette.divider}`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}08 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}08 0%, transparent 50%)`,
              pointerEvents: 'none',
            }
          }}
        >
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            sx={{ mb: 3 }}
          >
            <Box
              component="img"
              src={logoImage}
              alt="Chimera Logo"
              sx={{
                width: 60,
                height: 60,
                mr: 2,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: theme.palette.text.primary,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '-0.02em',
              }}
            >
              Chimera
            </Typography>
          </Box>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 3,
              opacity: 0.9,
            }}
          >
            Device Management Dashboard
          </Typography>

          {/* Enhanced Description */}
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                fontSize: '1.1rem',
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              Welcome to your comprehensive network device management center. Monitor device activity and details.
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                opacity: 0.8,
                fontSize: '0.95rem',
              }}
            >
              Get real-time visibility into your network infrastructure, manage device access policies, 
              and leverage advanced analytics to optimize your network performance and security posture.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Box sx={{ maxWidth: '100%' }}>
        <SummaryCards summary={summary} devices={devices} />

        <ChartsSection summary={summary} />

        <DeviceGrid devices={devices} />
      </Box>
    </Box>
  );
};

export default Dashboard;
