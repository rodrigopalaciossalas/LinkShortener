from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from schemas import LinkCreate, Link
from crud import create_user_link, get_links, get_link_by_short_code
from dependencies import get_current_user
from models import User

router = APIRouter(prefix="/links", tags=["links"])

@router.post("/", response_model=Link)
def create_link(link: LinkCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        return create_user_link(db=db, link=link, user_id=current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[Link])
def read_links(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_links(db, skip=skip, limit=limit, user_id=current_user.id)
