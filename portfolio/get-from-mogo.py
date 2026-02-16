
from datetime import datetime, timezone
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import json
from dotenv import load_dotenv
from bson.json_util import dumps as bson_dumps
        

load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise SystemExit("ERROR: MONGO_URI is not set in the environment. Add it as a GitHub Actions secret and map it in your workflow.")

client = MongoClient(MONGO_URI, server_api=ServerApi("1"), serverSelectionTimeoutMS=10000)

data_file = 'portfolio/data.json'
projects_file = 'portfolio/projects.json'


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = client["portfolio"]
    data = db["data"]
    proj = db["projects"]
    last_proj = proj.find_one(sort=[('timestamp', -1)])
    with open(projects_file, "w", encoding="utf-8") as f:
        f.write(bson_dumps(last_proj, indent=2, ensure_ascii=False))
    last_data = data.find_one(sort=[('timestamp', -1)])
    with open(data_file, "w", encoding="utf-8") as f:
        f.write(bson_dumps(last_data, indent=2, ensure_ascii=False))
except Exception as e:
    print(e)