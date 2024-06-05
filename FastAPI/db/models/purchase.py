from db.session import Base
from sqlalchemy import Column, Integer, String, DateTime


# 購入情報のモデル
class DbPurchase(Base):
    __tablename__ = "purchase"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    store_id = Column(Integer)
    item_id = Column(Integer)
    item_name = Column(String)
    item_price = Column(Integer)
    purchase_timestamp = Column(DateTime)
    purchase_num = Column(Integer)
    total_price = Column(Integer)
