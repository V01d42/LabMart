from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.models import purchase as models
from db.session import engine
from api.routers import purchase

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


@app.get("/")
def hw():
    return "Go to /docs to see the API documentation."


models.Base.metadata.create_all(bind=engine)
