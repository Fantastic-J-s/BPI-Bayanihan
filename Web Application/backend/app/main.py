from fastapi import FastAPI
from app.api.v1.routes.auth import router as auth_router

app = FastAPI(title="BPI Datawave API")

# ⛔ Do NOT mount a base /v1 here since the child router already has /v1
app.include_router(auth_router)


# (Optional) quick debug to verify paths at runtime
@app.get("/_debug/routes")
def list_routes():
    return [{"path": r.path, "methods": getattr(r, "methods", [])} for r in app.routes]
