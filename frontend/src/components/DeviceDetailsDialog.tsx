import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ExpandMore,
  Edit,
  Save,
  Cancel,
  Computer,
  NetworkCheck,
  Security,
  Info,
  Schedule,
  Category,
  Memory,
  Speed,
  Shield,
  Block,
  CheckCircle,
  Warning,
  Close,
} from '@mui/icons-material';
import type { Device, DeviceUpdate } from '../types/device';
import { useDeviceContext } from '../context/DeviceContext';

interface DeviceDetailsDialogProps {
  open: boolean;
  device: Device;
  onClose: () => void;
}

const DeviceDetailsDialog: React.FC<DeviceDetailsDialogProps> = ({
  open,
  device,
  onClose,
}) => {
  const theme = useTheme();
  const { updateDevice } = useDeviceContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<DeviceUpdate>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({});
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateDevice(device.id, editData);
      setIsEditing(false);
      setEditData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update device');
    } finally {
      onClose();
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
    setError(null);
  };

  const handleFieldChange = (field: keyof DeviceUpdate, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const getBlocklistStatus = (blocklist: Device['blocklist']) => {
    const blockedCount = Object.values(blocklist).filter(Boolean).length;
    const totalCount = Object.keys(blocklist).length;
    return `${blockedCount}/${totalCount} blocked`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircle /> : <Block />;
  };

  const InfoSection = ({ title, icon, children, color = 'primary' }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.02)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${alpha(theme.palette[color].main, 0.15)}`,
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            backgroundColor: alpha(theme.palette[color].main, 0.1),
            color: theme.palette[color].main,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color={color}>
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );

  const InfoField = ({ label, value, isEditing, field, onChange, type = 'text' }: {
    label: string;
    value: any;
    isEditing?: boolean;
    field?: keyof DeviceUpdate;
    onChange?: (value: any) => void;
    type?: 'text' | 'select' | 'chip';
  }) => (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontWeight: 500,
          mb: 1,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '0.75rem',
        }}
      >
        {label}
      </Typography>
      {isEditing && onChange ? (
        type === 'select' ? (
          <FormControl fullWidth size="small">
            <Select
              value={editData[field!] ?? value}
              onChange={(e) => onChange(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            >
              <MenuItem value={1}>Default Group</MenuItem>
              <MenuItem value={2}>Staff</MenuItem>
              <MenuItem value={3}>Guests</MenuItem>
              <MenuItem value={4}>IoT</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            size="small"
            value={editData[field!] ?? value}
            onChange={(e) => onChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
        )
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            p: 1.5,
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          {value || 'Not set'}
        </Typography>
      )}
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth

              PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
          },
        }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: '12px 12px 0 0',
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                mr: 2,
              }}
            >
              <Computer sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {device.given_name || device.hostname}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Device Details & Configuration
              </Typography>
            </Box>
          </Box>
          <Box>
            {!isEditing ? (
              <Tooltip title="Edit Device">
                <Button
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: alpha(theme.palette.common.white, 0.3),
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                    },
                  }}
                >
                  Edit
                </Button>
              </Tooltip>
            ) : (
              <Box>
                <Tooltip title="Save Changes">
                  <Button
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={loading}
                    variant="contained"
                    sx={{
                      mr: 1,
                      backgroundColor: theme.palette.success.main,
                      '&:hover': {
                        backgroundColor: theme.palette.success.dark,
                      },
                    }}
                  >
                    Save
                  </Button>
                </Tooltip>
                <Tooltip title="Cancel Changes">
                  <Button
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    disabled={loading}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: alpha(theme.palette.common.white, 0.3),
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {error && (
          <Fade in={!!error}>
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: 24,
                },
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}

        <Grid container spacing={4}>
          {/* Basic Information */}
          <Grid xs={12} md={6}>
            <InfoSection title="Basic Information" icon={<Info />} color="primary">
              <InfoField
                label="Device Name"
                value={device.given_name}
                isEditing={isEditing}
                field="given_name"
                onChange={(value) => handleFieldChange('given_name', value)}
              />
              <InfoField label="Hostname" value={device.hostname} />
              <InfoField label="Vendor" value={device.vendor} />
              <InfoField label="IP Address" value={device.ip} />
              <InfoField label="MAC Address" value={device.mac} />
            </InfoSection>
          </Grid>

          {/* Status & Group */}
          <Grid xs={12} md={6}>
            <InfoSection title="Status & Group" icon={<NetworkCheck />} color="success">
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontWeight: 500,
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem',
                  }}
                >
                  Status
                </Typography>
                <Chip
                  icon={getStatusIcon(device.is_active)}
                  label={device.is_active ? 'Active' : 'Inactive'}
                  color={getStatusColor(device.is_active)}
                  size="medium"
                  sx={{
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    '& .MuiChip-icon': {
                      fontSize: 20,
                    },
                  }}
                />
              </Box>
              
              <InfoField
                label="Group"
                value={device.group.name}
                isEditing={isEditing}
                field="group_id"
                onChange={(value) => handleFieldChange('group_id', value)}
                type="select"
              />
              
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontWeight: 500,
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem',
                  }}
                >
                  Custom Blocklist
                </Typography>
                <Chip
                  label={device.has_custom_blocklist ? 'Yes' : 'No'}
                  color={device.has_custom_blocklist ? 'warning' : 'default'}
                  size="medium"
                  sx={{ fontWeight: 600, px: 2, py: 1 }}
                />
              </Box>
              
              <InfoField label="First Seen" value={formatDate(device.first_seen)} />
              <InfoField label="Last Seen" value={formatDate(device.last_seen)} />
            </InfoSection>
          </Grid>

          {/* Operating System */}
          <Grid xs={12}>
            <Accordion
              sx={{
                borderRadius: 2,
                '&:before': { display: 'none' },
                boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  backgroundColor: alpha(theme.palette.info.main, 0.05),
                  borderRadius: '8px 8px 0 0',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.info.main, 0.08),
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Memory sx={{ mr: 2, color: 'info.main' }} />
                  <Typography variant="h6" color="info.main">
                    Operating System
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="OS Name" value={device.os_name} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Accuracy" value={`${device.os_accuracy}%`} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Type" value={device.os_type} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Vendor" value={device.os_vendor} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Family" value={device.os_family} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Generation" value={device.os_gen} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* AI Classification */}
          <Grid item xs={12}>
            <Accordion
              sx={{
                borderRadius: 2,
                '&:before': { display: 'none' },
                boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                  borderRadius: '8px 8px 0 0',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Speed sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6" color="secondary.main">
                    AI Classification
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Device Type" value={device.ai_classification.device_type} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Category" value={device.ai_classification.device_category} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <InfoField label="Confidence" value={`${(device.ai_classification.confidence * 100).toFixed(1)}%`} />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoField label="Reasoning" value={device.ai_classification.reasoning} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontWeight: 500,
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.75rem',
                      }}
                    >
                      Indicators
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {device.ai_classification.indicators.map((indicator, index) => (
                        <Chip
                          key={index}
                          label={indicator}
                          size="small"
                          sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Blocklist Settings */}
          <Grid item xs={12}>
            <Accordion
              sx={{
                borderRadius: 2,
                '&:before': { display: 'none' },
                boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  backgroundColor: alpha(theme.palette.warning.main, 0.05),
                  borderRadius: '8px 8px 0 0',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.warning.main, 0.08),
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Shield sx={{ mr: 2, color: 'warning.main' }} />
                  <Typography variant="h6" color="warning.main">
                    Blocklist Settings - {getBlocklistStatus(device.blocklist)}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {Object.entries(device.blocklist).map(([key, value]) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            fontWeight: 500,
                            mb: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontSize: '0.75rem',
                          }}
                        >
                          {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                        {isEditing ? (
                          <FormControl fullWidth size="small">
                            <Select
                              value={editData[key as keyof DeviceUpdate] ?? value}
                              onChange={(e) => handleFieldChange(key as keyof DeviceUpdate, e.target.value)}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  backgroundColor: theme.palette.background.paper,
                                },
                              }}
                            >
                              <MenuItem value={true}>Blocked</MenuItem>
                              <MenuItem value={false}>Allowed</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Chip
                            icon={value ? <Block /> : <CheckCircle />}
                            label={value ? 'Blocked' : 'Allowed'}
                            color={value ? 'error' : 'success'}
                            size="medium"
                            sx={{
                              fontWeight: 600,
                              px: 2,
                              py: 1,
                              '& .MuiChip-icon': {
                                fontSize: 20,
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<Close />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceDetailsDialog;
