from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.models import purchase as purchase_models
from db.models import user as user_models
from db.models import product as product_models
from db.session import engine
from api.routers import users, auth, purchase, products

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(purchase.router)
app.include_router(products.router)

@app.get("/")
def hw():
    return "Go to /docs to see the API documentation."


purchase_models.Base.metadata.create_all(bind=engine)
user_models.Base.metadata.create_all(bind=engine)
product_models.Base.metadata.create_all(bind=engine)