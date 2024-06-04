from fastapi import FastAPI
from database import models
from database.database import engine
from routers import purchase

app = FastAPI()

app.include_router(purchase.router)


@app.get("/")
def hw():
    return "Hello World!"


models.Base.metadata.create_all(bind=engine)
