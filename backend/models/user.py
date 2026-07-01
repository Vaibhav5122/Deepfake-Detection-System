from pydantic import BaseModel, Field, EmailStr
from typing import Optional

# Using BaseModel since EmailStr requires 'email-validator' package which may not be installed.
# We'll use simple string field for email.
class UserCreate(BaseModel):
    email: str = Field(..., description="User email address")
    username: str = Field(..., min_length=3, max_length=50, description="User display name")
    password: str = Field(..., min_length=6, description="User password (min 6 characters)")

class UserLogin(BaseModel):
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")

class UserResponse(BaseModel):
    id: str = Field(..., alias="_id", description="MongoDB User ID")
    email: str
    username: str

    class Config:
        populate_by_name = True
        json_encoders = {
            # Convert ObjectId to string during serialization
            # but since mongo returns string for _id if we map it, we keep config flexible
        }
