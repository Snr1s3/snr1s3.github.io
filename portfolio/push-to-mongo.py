
from datetime import datetime, timezone
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import json
from dotenv import load_dotenv

load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise SystemExit("ERROR: MONGO_URI is not set in the environment. Add it as a GitHub Actions secret and map it in your workflow.")

client = MongoClient(MONGO_URI, server_api=ServerApi("1"), serverSelectionTimeoutMS=10000)

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
    proj.insert_one(proj_data)
    data.insert_one(data_data)
except Exception as e:
    print(e)