from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.device_routes import router as device_router

app = FastAPI(
    title="Chimera Device Management API",
    description="""
    ## Chimera Device Management API
    
    A comprehensive API for managing network devices and their content filtering settings.
    
    ### Features
    - **Device Management**: View and update device information
    - **Blocklist Control**: Manage content filtering for different categories
    - **Device Actions**: Isolate, release, and toggle blocklist settings
    - **Statistics**: Get summary data about devices and their distribution
    
    ### Authentication
    Currently no authentication required (development mode)
    
    ### Rate Limiting
    No rate limiting implemented (development mode)
    """,

    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(device_router)

@app.get("/")
async def root():
    return {
        "message": "Chimera Device Management API Hackathon",
        "version": "1.0.0",
        "endpoints": {
            "GET /api/devices": "Get all devices",
            "GET /api/summary": "Get summary statistics",
            "PATCH /api/devices/{id}": "Update device",
            "POST /api/devices/{id}/actions": "Perform device action"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
