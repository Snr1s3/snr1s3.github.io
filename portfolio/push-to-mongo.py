from datetime import datetime, timezone
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import json
import certifi  # <-- nuevo

load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise SystemExit("ERROR: MONGO_URI is not set in the environment. Add it as a GitHub Actions secret and map it in your workflow.")


client = MongoClient(
    MONGO_URI,
    server_api=ServerApi("1"),
    serverSelectionTimeoutMS=20000,   # un poco más de margen
    tls=True,
    tlsCAFile=certifi.where(),        # <-- clave
)

data_file = 'portfolio/data.json'
projects_file = 'portfolio/projects.json'


def readJson(json_file):
    with open(json_file, 'r') as f:
        content = json.load(f)
    return content
def dumpTimestamp(json_file, data):
    data["timestamp"] = datetime.now(timezone.utc).isoformat()
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
    return data

proj_data = dumpTimestamp(projects_file, readJson(projects_file))
data_data = dumpTimestamp(data_file, readJson(data_file))


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = client["portfolio"]
    data = db["data"]
    proj = db["projects"]
    # Remove _id field if present
    proj_data.pop('_id', None)
    data_data.pop('_id', None)
    proj_result = proj.insert_one(proj_data)
    data_result = data.insert_one(data_data)
    print(f"Inserted project _id: {proj_result.inserted_id}")
    print(f"Inserted data _id: {data_result.inserted_id}")
    # Show a sample document from each collection
    print("Sample project document:", proj.find_one({'_id': proj_result.inserted_id}))
    print("Sample data document:", data.find_one({'_id': data_result.inserted_id}))
except Exception as e:
    print(e)
