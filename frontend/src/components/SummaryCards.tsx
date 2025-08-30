import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DevicesOther,
  CheckCircle,
  Warning,
  Cancel,
} from '@mui/icons-material';
import type { Summary } from '../types/device';
import logoImage from '../assets/image.png';

interface SummaryCardsProps {
  summary: Summary | null;
  devices: any[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary, devices }) => {
  const theme = useTheme();

  const cards = [
    {
      title: 'Total Devices',
      value: summary?.total || 0,
      icon: <DevicesOther />,
      color: theme.palette.primary.main,
      description: 'All registered network devices',
    },
    {
      title: 'Active Devices',
      value: summary?.active || 0,
      icon: <CheckCircle />,
      color: theme.palette.success.main,
      description: 'Currently online devices',
    },
    {
      title: 'Custom Blocklists',
      value: devices.filter(d => d.has_custom_blocklist).length,
      icon: <Warning />,
      color: theme.palette.warning.main,
      description: 'Devices with custom policies',
    },
    {
      title: 'Inactive Devices',
      value: devices.filter(d => !d.is_active).length,
      icon: <Cancel />,
      color: theme.palette.error.main,
      description: 'Offline or disconnected devices',
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
      <Box
          component="img"
          src={logoImage}
          alt="Chimera Logo"
          sx={{
            width: 28,
            height: 28,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          System Overview
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={index}
            sx={{
              display: 'flex',
              minHeight: { xs: 'auto', sm: 160, md: 180 },
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 3,
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: card.color,
                  opacity: 0.8,
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  border: `1px solid ${card.color}20`,
                  '& .card-icon': {
                    transform: 'scale(1.1)',
                    backgroundColor: `${card.color}15`,
                  },
                  '& .card-value': {
                    color: card.color,
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Box
                  className="card-icon"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: `${card.color}10`,
                    color: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease-in-out',
                    border: `1px solid ${card.color}20`,
                  }}
                >
                  {React.cloneElement(card.icon, { 
                    sx: { 
                      fontSize: { xs: 24, sm: 28, md: 32 },
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    } 
                  })}
                </Box>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: card.color,
                    boxShadow: `0 0 8px ${card.color}40`,
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography 
                  variant="h3" 
                  className="card-value"
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    lineHeight: 1,
                    transition: 'color 0.3s ease-in-out',
                  }}
                >
                  {card.value.toLocaleString()}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 1,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  }}
                >
                  {card.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                    lineHeight: 1.4,
                    opacity: 0.8,
                  }}
                >
                  {card.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  pt: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  opacity: 0.6,
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Last updated: {new Date().toLocaleTimeString()}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SummaryCards;
