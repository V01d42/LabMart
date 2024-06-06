from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.models import purchase as purchase_models
from db.models import user as user_models
from db.session import engine
from api.routers import purchase, users

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(purchase.router)
app.include_router(users.router)

@app.get("/")
def hw():
    return "Go to /docs to see the API documentation."


purchase_models.Base.metadata.create_all(bind=engine)
user_models.Base.metadata.create_all(bind=engine)