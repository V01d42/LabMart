from db.session import Base
from sqlalchemy import Column, Integer, String, DateTime


class DbUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role_id = Column(Integer)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)