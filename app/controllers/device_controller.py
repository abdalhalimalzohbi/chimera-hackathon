import json
import os
from typing import List, Dict, Optional
from app.schemas.device import Device, DeviceUpdate, Group


class DeviceController:
    
    def __init__(self, data_file_path: str = "app/data/devices.sample.json"):
        self.data_file_path = data_file_path
        self.devices: List[Device] = []
        self.groups = {
            1: Group(id=1, name="Default Group", is_default=True),
            2: Group(id=2, name="Staff", is_default=False),
            3: Group(id=3, name="Guests", is_default=False),
            4: Group(id=4, name="IoT", is_default=False)
        }
        self.load_devices()
        
        
    
    def load_devices(self):
        try:
            if os.path.exists(self.data_file_path):
                with open(self.data_file_path, 'r') as f:
                    devices_data = json.load(f)
                    self.devices = [Device(**device) for device in devices_data]
            else:
                print(f"Warning: Data file {self.data_file_path} not found")
                self.devices = []
        except Exception as e:
            print(f"Error loading devices: {e}")
            self.devices = []
    
    
    
    def save_devices(self):
        try:
            os.makedirs(os.path.dirname(self.data_file_path), exist_ok=True)
            with open(self.data_file_path, 'w') as f:
                json.dump([device.model_dump() for device in self.devices], f, indent=2)
        except Exception as e:
            print(f"Error saving devices: {e}")
    
    def get_all_devices(self) -> List[Device]:
        return self.devices
    
    
    
    def get_device_by_id(self, device_id: int) -> Optional[Device]:
        for device in self.devices:
            if device.id == device_id:
                return device
        return None
    
    
    
    def update_device(self, device_id: int, update_data: DeviceUpdate) -> Optional[Device]:
        device = self.get_device_by_id(device_id)
        if not device:
            return None
        
        if update_data.given_name is not None:
            device.given_name = update_data.given_name
        
        if update_data.group_id is not None and update_data.group_id in self.groups:
            new_group = self.groups[update_data.group_id]
            device.group = new_group
            
        blocklist_fields = [
            'ads_trackers', 'gambling', 'social_media', 'porn', 'gaming',
            'streaming', 'facebook', 'instagram', 'tiktok', 'netflix',
            'youtube', 'ai', 'safesearch'
        ]
        
        for field in blocklist_fields:
            if getattr(update_data, field) is not None:
                setattr(device.blocklist, field, getattr(update_data, field))
        
        if any(getattr(update_data, field) is not None for field in blocklist_fields):
            device.has_custom_blocklist = True
        
        self.save_devices()
        return device
    
    
    
    def perform_device_action(self, device_id: int, action: str, category: Optional[str] = None) -> Optional[Device]:
        device = self.get_device_by_id(device_id)
        if not device:
            return None
        
        if action == "isolate":
            for field in device.blocklist.model_fields:
                if field != "safesearch":
                    setattr(device.blocklist, field, True)
            device.has_custom_blocklist = True
            
        elif action == "release":
            for field in device.blocklist.model_fields:
                if field != "safesearch":
                    setattr(device.blocklist, field, False)
            device.blocklist.safesearch = True
            device.has_custom_blocklist = True
            
        elif action == "toggle_block" and category:
            if hasattr(device.blocklist, category):
                current_value = getattr(device.blocklist, category)
                setattr(device.blocklist, category, not current_value)
                device.has_custom_blocklist = True
        
        self.save_devices()
        return device
    
    
    def get_summary(self) -> Dict:
        total = len(self.devices)
        active = sum(1 for device in self.devices if device.is_active)
        
        by_group = {}
        for device in self.devices:
            group_name = device.group.name
            by_group[group_name] = by_group.get(group_name, 0) + 1
        
        by_category = {}
        for device in self.devices:
            category = device.ai_classification.device_category
            by_category[category] = by_category.get(category, 0) + 1
        
        return {
            "total": total,
            "active": active,
            "by_group": by_group,
            "by_category": by_category
        }
