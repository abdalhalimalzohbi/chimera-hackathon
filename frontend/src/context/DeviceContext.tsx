import  React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Device, Summary, DeviceUpdate, DeviceAction } from '../types/device';
import { deviceApi } from '../services/api';

interface DeviceContextType {
  devices: Device[];
  summary: Summary | null;
  loading: boolean;
  error: string | null;
  refreshDevices: () => Promise<void>;
  refreshSummary: () => Promise<void>;
  updateDevice: (deviceId: number, updateData: DeviceUpdate) => Promise<void>;
  performAction: (deviceId: number, actionData: DeviceAction) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  return context;
};

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await deviceApi.getDevices();
      setDevices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  const refreshSummary = async () => {
    try {
      setError(null);
      const data = await deviceApi.getSummary();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch summary');
    }
  };

  const updateDevice = async (deviceId: number, updateData: DeviceUpdate) => {
    try {
      setError(null);
      const updatedDevice = await deviceApi.updateDevice(deviceId, updateData);
      setDevices(prev => prev.map(device => 
        device.id === deviceId ? updatedDevice : device
      ));
      await refreshSummary();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update device');
      throw err;
    }
  };

  const performAction = async (deviceId: number, actionData: DeviceAction) => {
    try {
      setError(null);
      const updatedDevice = await deviceApi.performAction(deviceId, actionData);
      setDevices(prev => prev.map(device => 
        device.id === deviceId ? updatedDevice : device
      ));
      await refreshSummary();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform action');
      throw err;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([refreshDevices(), refreshSummary()]);
    };
    initializeData();
  }, []);

  const value: DeviceContextType = {
    devices,
    summary,
    loading,
    error,
    refreshDevices,
    refreshSummary,
    updateDevice,
    performAction,
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};
