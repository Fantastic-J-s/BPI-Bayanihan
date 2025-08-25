# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from .api.router import api_router
# from .db.engine import engine
# from .db.base import Base
# from .db.models.user import Users  # import so table is created
# # from .db.models


# def create_app() -> FastAPI:
#     app = FastAPI(title="BPI Datawave API")
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=["http://localhost:5173"],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )
#     Base.metadata.create_all(bind=engine)
#     app.include_router(api_router)
#     return app
