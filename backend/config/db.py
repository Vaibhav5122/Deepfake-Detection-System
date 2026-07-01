import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/deepsight")

print(f"Connecting to MongoDB at: {MONGO_URI.split('@')[-1] if '@' in MONGO_URI else MONGO_URI}")

client = AsyncIOMotorClient(MONGO_URI)

# If database name is specified in URI, it returns that database, else defaults to 'deepsight'
db = client.get_database("deepsight")

def get_db():
    return db
