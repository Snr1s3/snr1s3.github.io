import requests
import json
import random
import os

def get_icon_for_language(lang):
    mapping = {
        "Python": "devicon-python-plain",
        "Docker": "devicon-docker-plain",
        "Dockerfile": "devicon-docker-plain",
        "Go": "devicon-go-plain",
        "JavaScript": "devicon-javascript-plain",
        "Java": "devicon-java-plain",
        "Shell": "devicon-bash-plain",
        "Markdown": "devicon-markdown-plain",
        "FastAPI": "devicon-fastapi-plain",
        "PostgreSQL": "devicon-postgresql-plain",
        "GitHub Actions": "devicon-github-plain",
        "Telegram": "devicon-telegram-plain",
        "C": "devicon-c-plain",
        "C#": "devicon-csharp-plain",
        "Perl": "devicon-perl-plain",
    }
    return mapping.get(lang, "devicon-github-plain")

def repo():
    username = "Snr1s3"
    url = f"https://api.github.com/users/{username}/repos?per_page=100"

    response = requests.get(url, verify=False)
    repos = response.json()

    ignore_repos = ["snr1s3.github.io", "Snr1s3","Github-Examples","GestioDeMoneders"]
    background_images = ["assets/project_1.jpg", "assets/project_2.jpg"]
    repo_list = []
    for r in repos:
        if r["name"] in ignore_repos:
            continue
        else:
            desc = r["description"] or ""
            lang_response = requests.get(r["languages_url"], verify=False)
            languages = lang_response.json()
            techs = []
            for lang in languages.keys():
                techs.append({"icon": get_icon_for_language(lang), "name": lang})
            entry = {
                "title": r["name"],
                "subtitle": "",
                "description": desc,
                "technologies": techs,
                "image": random.choice(background_images),
                "github": r["html_url"]
            }
            if r.get("homepage"):
                entry["deploy_url"] = r["homepage"]
            repo_list.append(entry)

    with open("./portfolio/projects.json", "w") as f:
        json.dump(repo_list, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    repo()