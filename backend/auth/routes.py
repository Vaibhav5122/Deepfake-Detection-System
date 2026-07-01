from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse

from config.db import get_db
from models.user import UserCreate, UserLogin, UserResponse
from auth.logic import get_password_hash, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["authentication"])

@router.post("/register")
async def register(user_in: UserCreate):
    db = get_db()
    
    # Clean email input
    email = user_in.email.strip().lower()
    
    # Check if user already exists
    existing_user = await db.users.find_one({"email": email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
        
    # Check if username already exists
    existing_username = await db.users.find_one({"username": user_in.username.strip()})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username is already taken"
        )

    # Hash the password and save
    hashed_password = get_password_hash(user_in.password)
    user_dict = {
        "email": email,
        "username": user_in.username.strip(),
        "hashed_password": hashed_password
    }
    
    result = await db.users.insert_one(user_dict)
    user_id = str(result.inserted_id)
    
    # Generate token
    token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": email,
            "username": user_in.username.strip()
        }
    }

@router.post("/login")
async def login(user_in: UserLogin):
    db = get_db()
    email = user_in.email.strip().lower()
    
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(user_in.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
        
    user_id = str(user["_id"])
    token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user["email"],
            "username": user["username"]
        }
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["_id"],
        "email": current_user["email"],
        "username": current_user["username"]
    }
