from fastapi import APIRouter, HTTPException
from app.schemas.device import Device, DeviceUpdate, DeviceAction, Summary
from app.controllers.device_controller import DeviceController
from typing import List

router = APIRouter(prefix="/api", tags=["devices"])

device_controller = DeviceController()


@router.get("/devices", response_model=List[Device], summary="Get All Devices")
async def get_devices():
    """
    Retrieve all devices in the system.
    
    Returns a list of all network devices with their complete information including:
    - Device identity and network details
    - Operating system information
    - Blocklist settings
    - AI classification data
    - Group membership
    """
    return device_controller.get_all_devices()


@router.get("/summary", response_model=Summary, summary="Get Summary Statistics")
async def get_summary():
    """
    Get summary statistics about devices in the system.
    
    Returns aggregated data including:
    - Total device count
    - Active device count
    - Device distribution by group
    - Device distribution by AI classification category
    """
    return device_controller.get_summary()


@router.patch("/devices/{device_id}", response_model=Device, summary="Update Device")
async def update_device(
    device_id: int, 
    update_data: DeviceUpdate
):
    """
    Update device properties with partial data.
    
    **Allowed updates:**
    - `given_name`: Custom name for the device
    - `group_id`: Change device group (server fills group.name and is_default)
    - Any `blocklist.*` boolean field
    
    **Note:** Updating any blocklist field automatically sets `has_custom_blocklist = true`
    """
    device = device_controller.update_device(device_id, update_data)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@router.post("/devices/{device_id}/actions", response_model=Device, summary="Perform Device Action")
async def perform_device_action(
    device_id: int, 
    action_data: DeviceAction
):
    """
    Perform actions on devices to manage their blocklist settings.
    
    **Available Actions:**
    
    - **isolate**: Block all content categories (except safesearch)
      - Sets all `blocklist.* = true`
      - Keeps `safesearch = true`
      - Sets `has_custom_blocklist = true`
    
    - **release**: Unblock all content categories
      - Sets all `blocklist.* = false`
      - Keeps `safesearch = true`
      - Sets `has_custom_blocklist = true`
    
    - **toggle_block**: Toggle specific blocklist category
      - Requires `category` parameter
      - Flips the boolean value of the specified category
      - Sets `has_custom_blocklist = true`
    
    **Note:** All actions automatically set `has_custom_blocklist = true`
    """
    if action_data.action not in ["isolate", "release", "toggle_block"]:
        raise HTTPException(status_code=400, detail="Invalid action")
    if action_data.action == "toggle_block" and not action_data.category:
        raise HTTPException(status_code=400, detail="Category is required for toggle_block action")
    device = device_controller.perform_device_action(device_id, action_data.action, action_data.category)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    
    return device
