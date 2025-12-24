from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, links, redirect, qr

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Link Shortener API")

# CORS (Allow Frontend)
origins = [
    "http://localhost:5173", # Vite Default
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(links.router)
app.include_router(redirect.router)
app.include_router(qr.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Link Shortener API"}
