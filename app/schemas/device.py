from pydantic import BaseModel, Field, field_validator
from typing import List, Optional


class Group(BaseModel):
    id: int = Field(default=..., description="Unique identifier for the group", examples=[1])
    name: str = Field(default=..., description="Display name of the group", examples=["Default Group"])
    is_default: bool = Field(default=..., description="Whether this is the default group", examples=[True])

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 1,
                "name": "Default Group",
                "is_default": True
            }
        }
    }


class Blocklist(BaseModel):
    ads_trackers: bool = Field(default=..., description="Block ads and trackers", examples=[True])
    gambling: bool = Field(default=..., description="Block gambling sites", examples=[True])
    social_media: bool = Field(default=..., description="Block social media sites", examples=[False])
    porn: bool = Field(default=..., description="Block adult content", examples=[True])
    gaming: bool = Field(default=..., description="Block gaming sites", examples=[False])
    streaming: bool = Field(default=..., description="Block streaming sites", examples=[False])
    facebook: bool = Field(default=..., description="Block Facebook", examples=[False])
    instagram: bool = Field(default=..., description="Block Instagram", examples=[False])
    tiktok: bool = Field(default=..., description="Block TikTok", examples=[False])
    netflix: bool = Field(default=..., description="Block Netflix", examples=[False])
    youtube: bool = Field(default=..., description="Block YouTube", examples=[False])
    ai: bool = Field(default=..., description="Block AI services", examples=[False])
    safesearch: bool = Field(default=..., description="Enable safe search", examples=[True])

    model_config = {
        "json_schema_extra": {
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
    }


class AIClassification(BaseModel):
    device_type: str = Field(default=..., description="Type of device as classified by AI", examples=["Gateway"])
    device_category: str = Field(default=..., description="Category of device", examples=["Network Infrastructure"])
    confidence: float = Field(default=..., description="Confidence score of the classification (0-1)", examples=[0.99])
    reasoning: str = Field(default=..., description="Reasoning behind the classification", examples=["Chimera services + router role on LAN .1"])
    indicators: List[str] = Field(default=..., description="Key indicators used for classification", examples=[["Suricata", "Unbound", "LAN gateway IP"]])
    last_classified: str = Field(default=..., description="Timestamp of last classification", examples=["2025-08-29T10:12:05.331001"])

    model_config = {
        "json_schema_extra": {
            "example": {
                "device_type": "Gateway",
                "device_category": "Network Infrastructure",
                "confidence": 0.99,
                "reasoning": "Chimera services + router role on LAN .1",
                "indicators": ["Suricata", "Unbound", "LAN gateway IP"],
                "last_classified": "2025-08-29T10:12:05.331001"
            }
        }
    }


class Device(BaseModel):
    id: int = Field(default=..., description="Unique identifier for the device", examples=[1])
    mac: str = Field(default=..., description="MAC address of the device", examples=["02:42:AC:11:00:01"])
    hostname: str = Field(default=..., description="Hostname of the device", examples=["chimera-gw"])
    vendor: str = Field(default=..., description="Hardware vendor", examples=["Raspberry Pi"])
    given_name: str = Field(default=..., description="Custom name given to the device", examples=["Gateway"])
    ip: str = Field(default=..., description="IP address of the device", examples=["192.168.69.1"])
    user_agent: List[str] = Field(default=..., description="List of user agent strings", examples=[["Suricata/7.0", "unbound/1.19.0"]])
    is_active: bool = Field(default=..., description="Whether the device is currently active", examples=[True])
    has_custom_blocklist: bool = Field(default=..., description="Whether device has custom blocklist settings", examples=[True])
    group: Group = Field(default=..., description="Group membership information")
    first_seen: str = Field(default=..., description="Timestamp when device was first seen", examples=["2025-08-12T09:15:03.102311"])
    last_seen: str = Field(default=..., description="Timestamp when device was last seen", examples=["2025-08-30T01:22:45.902311"])
    is_mac_universal: bool = Field(default=..., description="Whether MAC address is universal or randomized", examples=[False])
    os_name: str = Field(default=..., description="Operating system name", examples=["Linux 6.1"])
    os_accuracy: int = Field(default=..., description="Accuracy of OS detection (0-100)", examples=[98])
    os_type: str = Field(default=..., description="Type of operating system", examples=["embedded"])
    os_vendor: str = Field(default=..., description="Vendor of the operating system", examples=["Linux"])
    os_family: str = Field(default=..., description="Family of the operating system", examples=["Linux"])
    os_gen: str = Field(default=..., description="Generation of the operating system", examples=["6.X"])
    os_cpe: List[str] = Field(default=..., description="CPE identifiers for the OS", examples=[["cpe:/o:linux:linux_kernel:6"]])
    os_last_updated: str = Field(default=..., description="Timestamp when OS info was last updated", examples=["2025-08-29T10:11:22.101001"])
    blocklist: Blocklist = Field(default=..., description="Content filtering settings")
    ai_classification: AIClassification = Field(default=..., description="AI-based device classification")

    model_config = {
        "json_schema_extra": {
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
                "group": {"id": 1, "name": "Default Group", "is_default": True},
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
    }


class DeviceUpdate(BaseModel):
    given_name: Optional[str] = Field(
        default=None,
        description="Custom name for the device",
        examples=["CEO's MacBook"],
        min_length=1,
        max_length=100
    )
    group_id: Optional[int] = Field(
        default=None,
        description="ID of the group to assign the device to (1-4)",
        examples=[2],
        ge=1,
        le=4
    )
    ads_trackers: Optional[bool] = Field(default=None, description="Block ads and trackers", examples=[True])
    gambling: Optional[bool] = Field(default=None, description="Block gambling sites", examples=[True])
    social_media: Optional[bool] = Field(default=None, description="Block social media sites", examples=[False])
    porn: Optional[bool] = Field(default=None, description="Block adult content", examples=[True])
    gaming: Optional[bool] = Field(default=None, description="Block gaming sites", examples=[False])
    streaming: Optional[bool] = Field(default=None, description="Block streaming sites", examples=[False])
    facebook: Optional[bool] = Field(default=None, description="Block Facebook", examples=[False])
    instagram: Optional[bool] = Field(default=None, description="Block Instagram", examples=[False])
    tiktok: Optional[bool] = Field(default=None, description="Block TikTok", examples=[False])
    netflix: Optional[bool] = Field(default=None, description="Block Netflix", examples=[False])
    youtube: Optional[bool] = Field(default=None, description="Block YouTube", examples=[False])
    ai: Optional[bool] = Field(default=None, description="Block AI services", examples=[False])
    safesearch: Optional[bool] = Field(default=None, description="Enable safe search", examples=[True])

    @field_validator('given_name')
    def validate_given_name(cls, v):
        if v is not None and v.strip() == "":
            raise ValueError('given_name cannot be empty or whitespace only')
        return v

    model_config = {
        "json_schema_extra": {
            "example": {
                "given_name": "CEO's MacBook",
                "group_id": 2,
                "social_media": True,
                "gaming": True
            }
        }
    }


class DeviceAction(BaseModel):
    action: str = Field(
        default=...,
        description="Action to perform on the device",
        examples=["isolate"],
        pattern="^(isolate|release|toggle_block)$"
    )
    category: Optional[str] = Field(
        default=None,
        description="Category for toggle_block action (required when action is toggle_block)",
        examples=["social_media"]
    )

    @field_validator('category')
    def validate_category(cls, v, values):
        if values.get('action') == 'toggle_block' and not v:
            raise ValueError('category is required when action is toggle_block')
        return v

    model_config = {
        "json_schema_extra": {
            "example": {
                "action": "isolate",
                "category": None
            }
        }
    }


class Summary(BaseModel):
    total: int = Field(default=..., description="Total number of devices", examples=[10])
    active: int = Field(default=..., description="Number of active devices", examples=[8])
    by_group: dict[str, int] = Field(default=..., description="Device count by group", examples=[{"Staff": 3, "IoT": 4, "Guests": 1, "Default Group": 2}])
    by_category: dict[str, int] = Field(default=..., description="Device count by AI classification category", examples=[{"Network Infrastructure": 5, "Workstation": 1, "Mobile": 1, "IoT": 2, "Printer": 1}])

    model_config = {
        "json_schema_extra": {
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
    }
