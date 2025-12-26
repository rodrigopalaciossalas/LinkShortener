from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Link Schemas
class LinkBase(BaseModel):
    original_url: str
    title: Optional[str] = None

class LinkCreate(LinkBase):
    short_code: Optional[str] = None

class Link(LinkBase):
    id: int
    short_code: str
    click_count: int
    last_accessed: Optional[datetime] = None
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
