from db.session import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship


# 購入情報のモデル
class DbPurchase(Base):
    __tablename__ = "purchase"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id", nullable=False))
    quantity = Column(Integer)
    total_price = Column(String)
    purchase_date = Column(DateTime)
    user = relationship("DbUser")
