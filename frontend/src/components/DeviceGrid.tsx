import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Security,
  Warning,
  CheckCircle,
  Cancel,
  Computer,
  Phone,
  Router,
  Storage,
  Search,
} from '@mui/icons-material';
import type { Device } from '../types/device';
import DeviceActionDialog from './DeviceActionDialog';
import DeviceDetailsDialog from './DeviceDetailsDialog';
import logoImage from '../assets/image.png';

interface DeviceGridProps {
  devices: Device[];
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices }) => {
  const theme = useTheme();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = useMemo(() => {
    if (!searchQuery.trim()) return devices;
    
    const query = searchQuery.toLowerCase();
    return devices.filter(device => 
      device.given_name?.toLowerCase().includes(query) ||
      device.hostname.toLowerCase().includes(query) ||
      device.ip.toLowerCase().includes(query) ||
      device.vendor.toLowerCase().includes(query) ||
      device.os_name.toLowerCase().includes(query) ||
      device.group.name.toLowerCase().includes(query) ||
      device.ai_classification.device_category.toLowerCase().includes(query)
    );
  }, [devices, searchQuery]);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setDetailsDialogOpen(true);
  };

  const handleActionClick = (device: Device) => {
    setSelectedDevice(device);
    setActionDialogOpen(true);
  };

  const getDeviceIcon = (device: Device) => {
    const category = device.ai_classification.device_category.toLowerCase();
    if (category.includes('workstation') || category.includes('desktop')) return <Computer />;
    if (category.includes('mobile') || category.includes('phone')) return <Phone />;
    if (category.includes('network') || category.includes('gateway')) return <Router />;
    return <Storage />;
  };

  const getBlocklistStatus = (device: Device) => {
    const blockedCount = Object.values(device.blocklist).filter(Boolean).length;
    const totalCount = Object.keys(device.blocklist).length;
    return `${blockedCount}/${totalCount} blocked`;
  };

  const getDevicePriority = (device: Device) => {
    if (!device.is_active) return 'error';
    if (device.has_custom_blocklist) return 'warning';
    return 'success';
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            component="img"
            src={logoImage}
            alt="Chimera Logo"
            sx={{
              width: 32,
              height: 32,
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
            Device Overview
          </Typography>
        </Box>
        
        {/* Search Bar */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search devices by name, IP, vendor, OS, group, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 ,marginTop: 1}}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredDevices.length} of {devices.length} devices
          </Typography>
          {searchQuery && (
            <Chip 
              label={`"${searchQuery}"`}
              size="small"
              color="primary"
              variant="outlined"
              onDelete={() => setSearchQuery('')}
            />
          )}
        </Box>
        <Grid container spacing={3}>
        {filteredDevices.map((device) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={device.id}
            sx={{
              display: 'flex',
              minHeight: { xs: 'auto', sm: 280, md: 300, lg: 320 },
            }}
          >
            <Card
              elevation={2}
              sx={{
                cursor: 'pointer',
                width: 266, 
                height: 470, 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
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
                  backgroundColor: getDevicePriority(device) === 'success' 
                    ? theme.palette.success.main 
                    : getDevicePriority(device) === 'warning' 
                    ? theme.palette.warning.main 
                    : theme.palette.error.main,
                  opacity: 0.8,
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  border: `1px solid ${getDevicePriority(device) === 'success' 
                    ? theme.palette.success.main 
                    : getDevicePriority(device) === 'warning' 
                    ? theme.palette.warning.main 
                    : theme.palette.error.main}20`,
                  '& .device-icon': {
                    transform: 'scale(1.1)',
                    backgroundColor: `${getDevicePriority(device) === 'success' 
                      ? theme.palette.success.main 
                      : getDevicePriority(device) === 'warning' 
                      ? theme.palette.warning.main 
                      : theme.palette.error.main}15`,
                  },
                },
              }}
              onClick={() => handleDeviceClick(device)}
            >
              <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Device Header */}
                <Box sx={{ mb: 2.5, textAlign: 'center' }}>
                  <Box
                    className="device-icon"
                    sx={{
                      width: { xs: 44, sm: 48, md: 52, lg: 56 },
                      height: { xs: 44, sm: 48, md: 52, lg: 56 },
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: theme.palette.grey[100],
                      color: theme.palette.grey[600],
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {getDeviceIcon(device)}
                  </Box>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1,
                      lineHeight: 1.2,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    }}
                    noWrap
                  >
                    {device.given_name || device.hostname}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1.5,
                      fontWeight: 500,
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      lineHeight: 1.4,
                    }}
                  >
                    {device.vendor} • {device.os_name}
                  </Typography>
                </Box>

                {/* Device Info */}
                <Box sx={{ mb: 2.5, flex: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 2,
                    p: 1.5,
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                  }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {device.ip}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1, 
                    justifyContent: 'center',
                    mb: 2,
                  }}>
                    <Chip
                      label={device.group.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: { xs: 24, sm: 28 },
                      }}
                    />
                    
                    <Chip
                      label={device.ai_classification.device_category}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: { xs: 24, sm: 28 },
                      }}
                    />
                  </Box>
                </Box>

                {/* Blocklist Status */}
                <Box sx={{ mb: 2.5, textAlign: 'center' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      display: 'block',
                      mb: 1.5,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {getBlocklistStatus(device)}
                  </Typography>
                  
                  <Chip
                    label={device.is_active ? 'Active' : 'Inactive'}
                    size="small"
                    color={getDevicePriority(device) as any}
                    variant="filled"
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      height: { xs: 24, sm: 28 },
                      px: 1.5,
                    }}
                  />
                </Box>

                {/* Action Button */}
                <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                  <Tooltip title="Quick Actions">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(device);
                      }}
                      sx={{
                        backgroundColor: theme.palette.grey[100],
                        color: theme.palette.grey[700],
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          backgroundColor: theme.palette.grey[200],
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <Security sx={{ fontSize: { xs: 18, sm: 20 } }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredDevices.length === 0 && searchQuery && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No devices found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms or clear the search to see all devices.
          </Typography>
        </Box>
      )}
        </Paper>
        
        {/* Results Count */}

      </Box>
      


      {/* Dialogs */}
      {selectedDevice && (
        <>
          <DeviceDetailsDialog
            open={detailsDialogOpen}
            device={selectedDevice}
            onClose={() => setDetailsDialogOpen(false)}
          />
          <DeviceActionDialog
            open={actionDialogOpen}
            device={selectedDevice}
            onClose={() => setActionDialogOpen(false)}
          />
        </>
      )}
    </Box>
  );
};

export default DeviceGrid;
