import datetime
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    username: str
    role_id: int


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    hashed_password: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True