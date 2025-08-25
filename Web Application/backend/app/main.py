from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.barangays import router as barangay_router
from app.api.v1.routes.wallet import router as wallet_router

app = FastAPI(title="BPI Datawave API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(barangay_router)
app.include_router(wallet_router)


@app.get("/_debug/routes")
def list_routes():
    return [{"path": r.path, "methods": getattr(r, "methods", [])} for r in app.routes]
