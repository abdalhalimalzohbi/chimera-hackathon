import axios from 'axios';
import type { Device, DeviceUpdate, DeviceAction, Summary } from '../types/device';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deviceApi = {
  getDevices: async (): Promise<Device[]> => {
    const response = await api.get('/api/devices');
    return response.data;
  },

  getSummary: async (): Promise<Summary> => {
    const response = await api.get('/api/summary');
    return response.data;
  },
  updateDevice: async (deviceId: number, updateData: DeviceUpdate): Promise<Device> => {
    const response = await api.patch(`/api/devices/${deviceId}`, updateData);
    return response.data;
  },
  performAction: async (deviceId: number, actionData: DeviceAction): Promise<Device> => {
    const response = await api.post(`/api/devices/${deviceId}/actions`, actionData);
    return response.data;
  },
};

export default api;
