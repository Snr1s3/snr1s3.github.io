import requests
import json
import random
import os
from googletrans import Translator

def translate_repos():
    username = "Snr1s3"
    url = f"https://api.github.com/users/{username}/repos?per_page=100"

    response = requests.get(url)
    repos = response.json()

    translator = Translator()
    ignore_repos = ["snr1s3.github.io", "Snr1s3"]
    
    background_images = ["/img/bg.jpg", "/img/image.png"]
    repo_list = []
    for repo in repos:
        if repo["name"] in ignore_repos:
            print(f"Skipping repository: {repo['name']}")
            continue
        print(f"Processing repository: {repo['name']}")
        desc = repo["description"] or ""
        
        if desc:
            try:
                desc_en = translator.translate(desc, dest='en')
                desc_cat = translator.translate(desc, dest='ca')
                desc_esp = translator.translate(desc, dest='es')
                desc_en_text = desc_en.text
                desc_cat_text = desc_cat.text
                desc_esp_text = desc_esp.text
            except Exception as e:
                print(f"Translation error for {repo['name']}: {e}")
                desc_en_text = desc
                desc_cat_text = desc
                desc_esp_text = desc
        else:
            desc_en_text = ""
            desc_cat_text = ""
            desc_esp_text = ""
        
        # Randomly select a background image
        random_image = random.choice(background_images)
        response = requests.get(repo["languages_url"])
        repo_list.append({
            "name": repo["name"],
            "desc_en": desc_en_text,
            "desc_cat": desc_cat_text,
            "desc_esp": desc_esp_text,
            "languages": response.json(),
            "topics": repo["topics"],
            "url": repo["html_url"],
            "image": random_image
        })

    # Ensure output directory exists
    os.makedirs("./public/json", exist_ok=True)
    with open("./public/json/projects.json", "w") as f:
        json.dump(repo_list, f, indent=2, ensure_ascii=False)

    print(f"Generated projects.json with {len(repo_list)} repositories")

if __name__ == "__main__":
    translate_repos()