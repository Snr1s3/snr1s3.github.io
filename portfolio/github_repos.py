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
        "HTML": "devicon-html5-plain",
        "CSS": "devicon-css3-plain",
        "PLpgSQL": "devicon-postgresql-plain",
        "QML": "devicon-qt-original",
        "Nix": "devicon-nixos-original",
        "Lua": "devicon-lua-plain",
        "FastAPI": "devicon-fastapi-plain",
        "PostgreSQL": "devicon-postgresql-plain",
        "GitHub Actions": "devicon-github-plain",
        "C": "devicon-c-plain",
        "C#": "devicon-csharp-plain",
        "Perl": "devicon-perl-plain",
    }
    return mapping.get(lang)

def repo():
    username = "Snr1s3"
    url = f"https://api.github.com/users/{username}/repos?per_page=100"

    response = requests.get(url)
    repos = response.json()

    ignore_repos = ["snr1s3.github.io", "Snr1s3"]
    background_images = ["assets/project_1.jpg"]
    repo_list = []
    for r in repos:
        if r["name"] in ignore_repos:
            continue
        else:
            desc = r["description"] or ""
            lang_response = requests.get(r["languages_url"])
            languages = lang_response.json()
            techs = []
            for lang in languages.keys():
                icon = get_icon_for_language(lang)
                if icon:
                    techs.append({"icon": icon, "name": lang})
            background = random.choice(background_images)
            for extension in ("png", "jpg"):
                image = f"assets/{r['name']}.{extension}"
                image_path = os.path.join(os.path.dirname(__file__), "src", image)
                if os.path.isfile(image_path):
                    background = image
                    break
            entry = {
                "title": r["name"],
                "subtitle": "",
                "description": desc,
                "technologies": techs,
                "image": background,
                "github": r["html_url"]
            }
            if r.get("homepage"):
                entry["deploy_url"] = r["homepage"]
            repo_list.append(entry)
    
    json_proj = {
        "projects": repo_list
    }

    with open("./portfolio/projects.json", "w", encoding="utf-8") as f:
        json.dump(json_proj, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    repo()