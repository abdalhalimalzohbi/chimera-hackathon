import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import type { Summary } from '../types/device';
import logoImage from '../assets/image.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsSectionProps {
  summary: Summary | null;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ summary }) => {
  const theme = useTheme();
  
  const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56', 
    '#4BC0C0', 
    '#9966FF', 
    '#FF9F40', 
    '#E7E9ED', 
  ];

  const pieChartData = {
    labels: summary?.by_group ? Object.keys(summary.by_group) : [],
    datasets: [{
      data: summary?.by_group ? Object.values(summary.by_group) : [],
      backgroundColor: COLORS,
      borderColor: theme.palette.background.paper,
      borderWidth: 2,
      hoverBorderWidth: 3,
    }]
  };

  const barChartData = {
    labels: summary?.by_category ? Object.keys(summary.by_category) : [],
    datasets: [{
      label: 'Device Count',
      data: summary?.by_category ? Object.values(summary.by_category) : [],
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 500,
          },
          color: theme.palette.text.secondary,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        cornerRadius: 4,
        displayColors: true,
        padding: 12,
      },
    },
  };

  const pieChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(0);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: function(context: any) {
            return `Devices: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            weight: 500,
          },
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
              x: {
          ticks: {
            font: {
              size: 12,
              weight: 500,
            },
            color: theme.palette.text.secondary,
          },
          grid: {
            display: false,
          },
        },
    },
  };

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
          Data Analytics
        </Typography>
      </Box>
      <Grid container sx={{ width: '100%', margin: 0, padding: 0 }}>
  <Grid 
    item 
    xs={12} 
    sm={6} 
    md={4} 
    lg={3} 
    sx={{
      display: 'flex',
      minHeight: { xs: 'auto', sm: 450, md: 500 },
      paddingRight: { xs: 0, sm: 1.5 },
    }}
  >
    <Paper
      elevation={2}
      sx={{
        p: 3,
        width: 550, 
        height: 470, 
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: theme.palette.primary.main,
          opacity: 0.8,
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6],
          border: `1px solid ${theme.palette.primary.main}20`,
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          color: theme.palette.text.primary,
          textAlign: 'center',
          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
        }}
      >
        Devices by Group
      </Typography>
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: { xs: 250, sm: 300, md: 350 },
      }}>
        <Pie data={pieChartData} options={pieChartOptions} />
      </Box>
    </Paper>
  </Grid>
  
  <Grid 
    item 
    xs={12} 
    sm={6}
    md={6}
    sx={{
      display: 'flex',
      minHeight: { xs: 'auto', sm: 450, md: 500 },
      paddingLeft: { xs: 0, sm: 1.5 }, 
    }}
  >
    <Paper
      elevation={2}
      sx={{
        p: 3,
        width: 550, 
        height: 470, 
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: theme.palette.secondary.main,
          opacity: 0.8,
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6],
          border: `1px solid ${theme.palette.secondary.main}20`,
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          color: theme.palette.text.primary,
          textAlign: 'center',
          fontSize: '1.3rem',
        }}
      >
        Devices by Category
      </Typography>
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: { xs: 250, sm: 300, md: 350 },
      }}>
        <Bar data={barChartData} options={barChartOptions} />
      </Box>
    </Paper>
  </Grid>
</Grid>

    </Box>
  );
};

export default ChartsSection;
