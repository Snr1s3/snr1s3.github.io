import requests
import json
from googletrans import Translator

username = "Snr1s3"
url = f"https://api.github.com/users/{username}/repos?per_page=100"

response = requests.get(url)
repos = response.json()

translator = Translator()

repo_list = []
for repo in repos:
    print(f"Processing repository: {repo['name']}")
    desc = repo["description"] or ""
    desc_cat = translator.translate(desc, dest='ca').text if desc else ""
    desc_esp = translator.translate(desc, dest='es').text if desc else ""
    desc = translator.translate(desc, dest='en').text if desc else ""
    repo_list.append({
        "name": repo["name"],
        "desc_en": desc,
        "desc_cat": desc_cat,
        "desc_esp": desc_esp,
        "url": repo["html_url"],
        "photo": f"https://via.placeholder.com/300x200?text={repo['name']}"
    })

with open("../json/projects.json", "w") as f:
    json.dump(repo_list, f, indent=2, ensure_ascii=False)