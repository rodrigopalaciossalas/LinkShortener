from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from database import get_db
from crud import get_link_by_short_code, increment_click_count

router = APIRouter(tags=["redirect"])

@router.get("/{short_code}")
def redirect_to_url(short_code: str, db: Session = Depends(get_db)):
    db_link = get_link_by_short_code(db, short_code=short_code)
    if db_link is None:
        raise HTTPException(status_code=404, detail="Link not found")
    
    increment_click_count(db, db_link)
    
    # Ensure URL has scheme
    url = db_link.original_url
    if not url.startswith(("http://", "https://")):
        url = "http://" + url
        
    return RedirectResponse(url=url) 
