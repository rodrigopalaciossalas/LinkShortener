from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import pytest
import os
import sys

# Add parent directory to path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import Base, get_db
from main import app

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_register_user():
    response = client.post(
        "/auth/register",
        json={"email": "test@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
    assert "id" in response.json()

def test_login_user():
    response = client.post(
        "/auth/token",
        data={"username": "test@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
    return response.json()["access_token"]

def test_create_link():
    token = test_login_user()
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post(
        "/links/",
        json={"original_url": "https://www.google.com", "title": "Google"},
        headers=headers
    )
    assert response.status_code == 200
    assert response.json()["original_url"] == "https://www.google.com"
    assert "short_code" in response.json()
    return response.json()["short_code"]

def test_get_links():
    token = test_login_user()
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/links/", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_redirect():
    short_code = test_create_link()
    response = client.get(f"/redirect/{short_code}", follow_redirects=False)
    # Note: Our router is at root for redirect: /{short_code}
    # But wait, in main.py we included router without prefix.
    # The router path is /{short_code}.
    # So client.get(f"/{short_code}")
    
    response = client.get(f"/{short_code}", follow_redirects=False)
    assert response.status_code == 307
    assert response.headers["location"] == "https://www.google.com"

def test_qr_code():
    short_code = test_create_link()
    response = client.get(f"/qr/{short_code}")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"
