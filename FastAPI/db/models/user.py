from db.session import Base
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship


class DbUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role_id = Column(Integer)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    is_active = Column(Boolean, default=True)
    purchases = relationship("DbPurchase", back_populates="user")
    products = relationship("DbProduct", back_populates="admin")