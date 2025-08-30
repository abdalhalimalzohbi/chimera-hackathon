from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class Group(BaseModel):
    id: int = Field(..., description="Unique identifier for the group", example=1)
    name: str = Field(..., description="Display name of the group", example="Default Group")
    is_default: bool = Field(..., description="Whether this is the default group", example=True)
    
    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Default Group",
                "is_default": True
            }
        }


class Blocklist(BaseModel):
    ads_trackers: bool = Field(..., description="Block ads and trackers", example=True)
    gambling: bool = Field(..., description="Block gambling sites", example=True)
    social_media: bool = Field(..., description="Block social media sites", example=False)
    porn: bool = Field(..., description="Block adult content", example=True)
    gaming: bool = Field(..., description="Block gaming sites", example=False)
    streaming: bool = Field(..., description="Block streaming sites", example=False)
    facebook: bool = Field(..., description="Block Facebook", example=False)
    instagram: bool = Field(..., description="Block Instagram", example=False)
    tiktok: bool = Field(..., description="Block TikTok", example=False)
    netflix: bool = Field(..., description="Block Netflix", example=False)
    youtube: bool = Field(..., description="Block YouTube", example=False)
    ai: bool = Field(..., description="Block AI services", example=False)
    safesearch: bool = Field(..., description="Enable safe search", example=True)
    
    class Config:
        schema_extra = {
            "example": {
                "ads_trackers": True,
                "gambling": True,
                "social_media": False,
                "porn": True,
                "gaming": False,
                "streaming": False,
                "facebook": False,
                "instagram": False,
                "tiktok": False,
                "netflix": False,
                "youtube": False,
                "ai": False,
                "safesearch": True
            }
        }


class AIClassification(BaseModel):
    device_type: str = Field(..., description="Type of device as classified by AI", example="Gateway")
    device_category: str = Field(..., description="Category of device", example="Network Infrastructure")
    confidence: float = Field(..., description="Confidence score of the classification (0-1)", example=0.99)
    reasoning: str = Field(..., description="Reasoning behind the classification", example="Chimera services + router role on LAN .1")
    indicators: List[str] = Field(..., description="Key indicators used for classification", example=["Suricata", "Unbound", "LAN gateway IP"])
    last_classified: str = Field(..., description="Timestamp of last classification", example="2025-08-29T10:12:05.331001")
    
    class Config:
        schema_extra = {
            "example": {
                "device_type": "Gateway",
                "device_category": "Network Infrastructure",
                "confidence": 0.99,
                "reasoning": "Chimera services + router role on LAN .1",
                "indicators": ["Suricata", "Unbound", "LAN gateway IP"],
                "last_classified": "2025-08-29T10:12:05.331001"
            }
        }


class Device(BaseModel):
    id: int = Field(..., description="Unique identifier for the device", example=1)
    mac: str = Field(..., description="MAC address of the device", example="02:42:AC:11:00:01")
    hostname: str = Field(..., description="Hostname of the device", example="chimera-gw")
    vendor: str = Field(..., description="Hardware vendor", example="Raspberry Pi")
    given_name: str = Field(..., description="Custom name given to the device", example="Gateway")
    ip: str = Field(..., description="IP address of the device", example="192.168.69.1")
    user_agent: List[str] = Field(..., description="List of user agent strings", example=["Suricata/7.0", "unbound/1.19.0"])
    is_active: bool = Field(..., description="Whether the device is currently active", example=True)
    has_custom_blocklist: bool = Field(..., description="Whether device has custom blocklist settings", example=True)
    group: Group = Field(..., description="Group membership information")
    first_seen: str = Field(..., description="Timestamp when device was first seen", example="2025-08-12T09:15:03.102311")
    last_seen: str = Field(..., description="Timestamp when device was last seen", example="2025-08-30T01:22:45.902311")
    is_mac_universal: bool = Field(..., description="Whether MAC address is universal or randomized", example=False)
    os_name: str = Field(..., description="Operating system name", example="Linux 6.1")
    os_accuracy: int = Field(..., description="Accuracy of OS detection (0-100)", example=98)
    os_type: str = Field(..., description="Type of operating system", example="embedded")
    os_vendor: str = Field(..., description="Vendor of the operating system", example="Linux")
    os_family: str = Field(..., description="Family of the operating system", example="Linux")
    os_gen: str = Field(..., description="Generation of the operating system", example="6.X")
    os_cpe: List[str] = Field(..., description="CPE identifiers for the OS", example=["cpe:/o:linux:linux_kernel:6"])
    os_last_updated: str = Field(..., description="Timestamp when OS info was last updated", example="2025-08-29T10:11:22.101001")
    blocklist: Blocklist = Field(..., description="Content filtering settings")
    ai_classification: AIClassification = Field(..., description="AI-based device classification")
    
    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "mac": "02:42:AC:11:00:01",
                "hostname": "chimera-gw",
                "vendor": "Raspberry Pi",
                "given_name": "Gateway",
                "ip": "192.168.69.1",
                "user_agent": ["Suricata/7.0", "unbound/1.19.0"],
                "is_active": True,
                "has_custom_blocklist": True,
                "group": {
                    "id": 1,
                    "name": "Default Group",
                    "is_default": True
                },
                "first_seen": "2025-08-12T09:15:03.102311",
                "last_seen": "2025-08-30T01:22:45.902311",
                "is_mac_universal": False,
                "os_name": "Linux 6.1",
                "os_accuracy": 98,
                "os_type": "embedded",
                "os_vendor": "Linux",
                "os_family": "Linux",
                "os_gen": "6.X",
                "os_cpe": ["cpe:/o:linux:linux_kernel:6"],
                "os_last_updated": "2025-08-29T10:11:22.101001",
                "blocklist": {
                    "ads_trackers": True,
                    "gambling": True,
                    "social_media": False,
                    "porn": True,
                    "gaming": False,
                    "streaming": False,
                    "facebook": False,
                    "instagram": False,
                    "tiktok": False,
                    "netflix": False,
                    "youtube": False,
                    "ai": False,
                    "safesearch": True
                },
                "ai_classification": {
                    "device_type": "Gateway",
                    "device_category": "Network Infrastructure",
                    "confidence": 0.99,
                    "reasoning": "Chimera services + router role on LAN .1",
                    "indicators": ["Suricata", "Unbound", "LAN gateway IP"],
                    "last_classified": "2025-08-29T10:12:05.331001"
                }
            }
        }


class DeviceUpdate(BaseModel):
    given_name: Optional[str] = Field(None, description="Custom name for the device", example="CEO's MacBook")
    group_id: Optional[int] = Field(None, description="ID of the group to assign the device to", example=2)
    ads_trackers: Optional[bool] = Field(None, description="Block ads and trackers", example=True)
    gambling: Optional[bool] = Field(None, description="Block gambling sites", example=True)
    social_media: Optional[bool] = Field(None, description="Block social media sites", example=False)
    porn: Optional[bool] = Field(None, description="Block adult content", example=True)
    gaming: Optional[bool] = Field(None, description="Block gaming sites", example=False)
    streaming: Optional[bool] = Field(None, description="Block streaming sites", example=False)
    facebook: Optional[bool] = Field(None, description="Block Facebook", example=False)
    instagram: Optional[bool] = Field(None, description="Block Instagram", example=False)
    tiktok: Optional[bool] = Field(None, description="Block TikTok", example=False)
    netflix: Optional[bool] = Field(None, description="Block Netflix", example=False)
    youtube: Optional[bool] = Field(None, description="Block YouTube", example=False)
    ai: Optional[bool] = Field(None, description="Block AI services", example=False)
    safesearch: Optional[bool] = Field(None, description="Enable safe search", example=True)
    
    class Config:
        schema_extra = {
            "example": {
                "given_name": "CEO's MacBook",
                "group_id": 2,
                "social_media": True,
                "gaming": True
            }
        }


class DeviceAction(BaseModel):
    action: str = Field(..., description="Action to perform on the device", example="isolate")
    category: Optional[str] = Field(None, description="Category for toggle_block action", example="social_media")
    
    class Config:
        schema_extra = {
            "example": {
                "action": "isolate",
                "category": None
            }
        }


class Summary(BaseModel):
    total: int = Field(..., description="Total number of devices", example=10)
    active: int = Field(..., description="Number of active devices", example=8)
    by_group: dict[str, int] = Field(..., description="Device count by group", example={"Staff": 3, "IoT": 4, "Guests": 1, "Default Group": 2})
    by_category: dict[str, int] = Field(..., description="Device count by AI classification category", example={"Network Infrastructure": 5, "Workstation": 1, "Mobile": 1, "IoT": 2, "Printer": 1})
    
    class Config:
        schema_extra = {
            "example": {
                "total": 10,
                "active": 8,
                "by_group": {
                    "Staff": 3,
                    "IoT": 4,
                    "Guests": 1,
                    "Default Group": 2
                },
                "by_category": {
                    "Network Infrastructure": 5,
                    "Workstation": 1,
                    "Mobile": 1,
                    "IoT": 2,
                    "Printer": 1
                }
            }
        }
