from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    role_id: int


class TokenData(BaseModel):
    username: str | None = None