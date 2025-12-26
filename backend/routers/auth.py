from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from database import get_db
from schemas import UserCreate, User, Token
from crud import get_user_by_email, create_user
from auth import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=User)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

from pydantic import BaseModel
class GoogleLoginRequest(BaseModel):
    token: str

from google.oauth2 import id_token
from google.auth.transport import requests
import secrets
import string

GOOGLE_CLIENT_ID = "205278337514-318tfelg7c7anvukbrt2mqd5irap17tm.apps.googleusercontent.com"

@router.post("/google", response_model=Token)
def google_login(login_data: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        # Strategy: Use Access Token to get User Info directly (Works with useGoogleLogin hook)
        import requests as req
        user_info_response = req.get(
            "https://www.googleapis.com/oauth2/v3/userinfo", 
            headers={"Authorization": f"Bearer {login_data.token}"}
        )
        
        if user_info_response.status_code != 200:
             raise ValueError("Invalid Google Access Token")
             
        id_info = user_info_response.json()
        email = id_info['email']

        # Check if user exists
        user = get_user_by_email(db, email=email)
        if not user:
            # Create user with random password
            alphabet = string.ascii_letters + string.digits
            random_password = ''.join(secrets.choice(alphabet) for i in range(20))
            
            user_create = UserCreate(email=email, password=random_password)
            user = create_user(db=db, user=user_create)

        # Generate Token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid Google Token")
    except Exception as e:
        print(f"Google Login Error: {str(e)}")
        raise HTTPException(status_code=400, detail="Google Login Failed")
