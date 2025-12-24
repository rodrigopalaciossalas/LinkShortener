from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from database import get_db
from crud import get_link_by_short_code
from utils import generate_qr_code

router = APIRouter(tags=["qr"])

@router.get("/qr/{short_code}")
def get_qr_code(short_code: str, db: Session = Depends(get_db)):
    db_link = get_link_by_short_code(db, short_code=short_code)
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    # Generate QR for the short URL (assuming hosted on localhost for now, needs full URL in prod)
    # Since we redirected /short_code, the QR can point to that.
    # In a real app we'd construct the full domain. 
    # For now let's assume we want to encode the original URL or the short link (usually short link).
    # Let's construct a dummy base URL and append short_code
    
    # We should really return the full short URL.
    # For dev: http://localhost:8000/{short_code}
    
    full_short_url = f"http://localhost:8000/{short_code}" 
    
    img_io = generate_qr_code(full_short_url)
    return StreamingResponse(img_io, media_type="image/png")
