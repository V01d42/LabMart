from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import models
from database.database import engine
from routers import purchase

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
