from sqlalchemy.orm import Session
from models import User, Link
from schemas import UserCreate, LinkCreate
from auth import get_password_hash
import shortuuid
from datetime import datetime

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_links(db: Session, skip: int = 0, limit: int = 100, user_id: int = None):
    if user_id:
        return db.query(Link).filter(Link.owner_id == user_id).offset(skip).limit(limit).all()
    return db.query(Link).offset(skip).limit(limit).all()

def create_user_link(db: Session, link: LinkCreate, user_id: int):
    # Check if custom short code is provided
    if link.short_code:
        # Check availability
        existing = get_link_by_short_code(db, link.short_code)
        if existing:
            raise Exception("Short code already taken") # Simple exception, router should handle HTTPException
        short_code = link.short_code
    else:
        # Generate a random short code
        short_code = shortuuid.ShortUUID().random(length=6)
        # Ensure uniqueness (rare edge case)
        while get_link_by_short_code(db, short_code):
             short_code = shortuuid.ShortUUID().random(length=6)

    db_link = Link(
        original_url=link.original_url,
        title=link.title,
        short_code=short_code,
        owner_id=user_id
    )
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link

def get_link_by_short_code(db: Session, short_code: str):
    return db.query(Link).filter(Link.short_code == short_code).first()

def increment_click_count(db: Session, db_link: Link):
    db_link.click_count += 1
    db_link.last_accessed = datetime.utcnow()
    db.commit()
    db.refresh(db_link)
    return db_link
