import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import type { Device, DeviceAction } from '../types/device';
import { useDeviceContext } from '../context/DeviceContext';

interface DeviceActionDialogProps {
  open: boolean;
  device: Device;
  onClose: () => void;
}

const DeviceActionDialog: React.FC<DeviceActionDialogProps> = ({
  open,
  device,
  onClose,
}) => {
  const { performAction } = useDeviceContext();
  const [action, setAction] = useState<'isolate' | 'release' | 'toggle_block'>('isolate');
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (action === 'toggle_block' && !category) {
      setError('Category is required for toggle_block action');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const actionData: DeviceAction = {
        action,
        category: action === 'toggle_block' ? category : undefined,
      };
      await performAction(device.id, actionData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform action');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAction('isolate');
    setCategory('');
    setError(null);
    onClose();
  };

  const getActionDescription = () => {
    switch (action) {
      case 'isolate':
        return 'Block all content categories (except safesearch)';
      case 'release':
        return 'Unblock all content categories (keep safesearch enabled)';
      case 'toggle_block':
        return 'Toggle specific blocklist category';
      default:
        return '';
    }
  };

  const blocklistCategories = [
    'ads_trackers',
    'gambling',
    'social_media',
    'porn',
    'gaming',
    'streaming',
    'facebook',
    'instagram',
    'tiktok',
    'netflix',
    'youtube',
    'ai',
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Device Actions - {device.given_name || device.hostname}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            IP: {device.ip} • Group: {device.group.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Current Status: {device.is_active ? 'Active' : 'Inactive'}
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Action</InputLabel>
          <Select
            value={action}
            label="Action"
            onChange={(e) => setAction(e.target.value as any)}
          >
            <MenuItem value="isolate">Isolate Device</MenuItem>
            <MenuItem value="release">Release Device</MenuItem>
            <MenuItem value="toggle_block">Toggle Blocklist Category</MenuItem>
          </Select>
        </FormControl>

        {action === 'toggle_block' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {blocklistCategories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            {getActionDescription()}
          </Typography>
        </Alert>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || (action === 'toggle_block' && !category)}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Performing Action...' : 'Perform Action'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceActionDialog;
