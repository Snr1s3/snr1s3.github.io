import json
import random

json_file = 'portfolio/data.json'
projects_file = 'portfolio/projects.json'
index_md = 'portfolio/src/index.md'
projects_md = 'portfolio/src/projects.md'
IMG_STYLE = "display:block; width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin:10px 0; border:1px solid #bb86fc;"

def readJson(json_file):
    with open(json_file, 'r') as f:
        content = json.load(f)
    return content

def cleanMdFile(index_md, projects_md):
    with open(projects_md, 'w'):
        pass
    with open(index_md, 'w'):
        pass
def writeHeader(index_md, data):
    
    list = []
    list.append(f"# {data['title']}  \n\n")
    list.append(f"{data['about']}  \n\n")
    list.append(f"**Location:** {data['location']}  \n")
    list.append(f"**Email:** <a href=\"mailto:{data['media']['email']}\" style=\"color:#bb86fc;\">{data['media']['email']}</a>  \n\n")
    list.append(
        "<strong>\n"
        f'    <a href="{data["media"]["cv"]}" style="color:#bb86fc;" download>Download CV</a>\n'
        "  </strong>\n      |\n"
        "<strong>\n"
        f'    <a href="{data["media"]["github"]}" style="color:#bb86fc;">GitHub</a>\n'
        "  </strong>  | <strong>\n"
        f'    <a href="{data["media"]["linkedin"]}" style="color:#bb86fc;">LinkedIn</a>\n'
        "  </strong>\n"
    )
    writeToMd(index_md, list)

def writeAbout(index_md, data):
    
    list = []
    list.append(f"## About Me  \n\n")
    list.append(f"{data['about']}  \n\n")
    writeToMd(index_md, list)

def writeSkill(index_md, data):
    lines = []
    technologies = {technology["name"]: technology["icon"] for technology in data["technologies"]}
    technologies.update({
        "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    })

    groups = [
        ("Programming Languages", ["Python", "Java", "Kotlin", "Go", "Bash"]),
        ("Databases", ["MongoDB", "MySQL", "PostgreSQL"]),
        ("Tools, Environments & Platforms", ["Docker", "Git", "GitHub", "Android Studio", "VS Code"]),
        ("Operating Systems", ["Linux", "Windows", "Debian"]),
    ]
    lines.append("## Languages & Tools\n\n")
    for title, names in groups:
        lines.append(f"### {title}\n\n")
        lines.append('<div style="display:flex; gap:10px; flex-wrap:wrap;">\n')
        for name in names:
            lines.append(
                f'<img src="{technologies[name]}" alt="{name}" title="{name}" width="50" height="50" '
                'style="background:#fff; border-radius:6px; padding:4px;">'
            )
        lines.append("</div>\n\n")
    lines.append("## Currently Learning\n\n")
    lines.extend(f"- {topic}\n" for topic in data["learningTopics"])
    lines.append("\n")
    writeToMd(index_md, lines)
def writeToMd(index_md, content, mode='a'):
    with open(index_md, mode) as f:
        for line in content:
            f.write(line)
        f.write("\n---\n")

def writeRandomProjects(index_md, data):
    
    lines = []
    lines.append("## Some Projects\n\n")
    lines.append('<div style="display: flex; flex-wrap: wrap; gap: 1em;">\n')
    projects = data
    if len(projects) > 2:
        projects = random.sample(projects, 2)
    for project in projects:
        tech_icons = ''
        if "technologies" in project:
            tech_icons = '<div style="display:flex; gap:6px; margin:6px 0 0 0;">'
            for tech in project["technologies"]:
                tech_icons += f'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech["icon"].split("-")[1]}/{tech["icon"].split("-")[1]}-original.svg" alt="{tech["name"]}" title="{tech["name"]}" width="24" style="background:#fff; border-radius:4px; padding:2px;">'
            tech_icons += '</div>'
        deploy_link = f'<br><a href="{project["deploy_url"]}" style="color:#bb86fc;">Docs</a>' if "deploy_url" in project else ""
        lines.append(
            '<div style="border:1px solid #bb86fc; border-radius:8px; padding:1em; width:300px; background:#23272f; color:#e0e0e0;">\n'
            f'  <strong>\n'
            f'    <a href="{project["github"]}" style="color:#bb86fc;">{project["title"]}</a>\n'
            f'  </strong>\n'
            f'  <img src="{project["image"]}" alt="{project["title"]}" style="{IMG_STYLE}">\n'
            f'  <br>\n'
            f'{project["description"]}\n'
            f'{tech_icons}\n'
            f'{deploy_link}\n'
            '</div>\n'
        )
    lines.append('</div>\n')
    writeToMd(index_md, lines)

def writeLearning(index_md, data):
    
    lines = []
    lines.append("## Learning\n\n")
    for learning in data["learning"]:
        lines.append(f'- **{learning["title"]}**  \n')
        lines.append(f'  _{learning["subtitle"]} ({learning["date"]})_  \n')
        lines.append(f'  {learning["description"]}\n\n')
    
    writeToMd(index_md, lines)

def writeCertifications(index_md, data):
    
    lines = []
    lines.append("## Certifications\n\n")
    for cert in data["certifications"]:
        lines.append(f'- **{cert["title"]}**  \n')
        lines.append(f'  <a href="{cert["url"]}" style="color:#bb86fc;">{cert["description"]}</a>\n\n')
    writeToMd(index_md, lines)

def writeProjects(projects_md, data):
    
    lines = []
    lines.append("# Projects\n\n")
    lines.append('<div style="display: flex; flex-wrap: wrap; gap: 1em;">\n')
    projects = data
    for project in projects:
        tech_icons = ''
        if "technologies" in project:
            tech_icons = '<div style="display:flex; gap:6px; margin:6px 0 0 0;">'
            for tech in project["technologies"]:
                tech_icons += f'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech["icon"].split("-")[1]}/{tech["icon"].split("-")[1]}-original.svg" alt="{tech["name"]}" title="{tech["name"]}" width="24" style="background:#fff; border-radius:4px; padding:2px;">'
            tech_icons += '</div>'
        deploy_link = f'<br><a href="{project["deploy_url"]}" style="color:#bb86fc;">Docs</a>' if "deploy_url" in project else ""
        lines.append(
            '<div style="border:1px solid #bb86fc; border-radius:8px; padding:1em; width:300px; background:#23272f; color:#e0e0e0;">\n'
            f'  <strong>\n'
            f'    <a href="{project["github"]}" style="color:#bb86fc;">{project["title"]}</a>\n'
            f'  </strong>\n'
            f'  <img src="{project["image"]}" alt="{project["title"]}" style="{IMG_STYLE}">\n'
            f'  <br>\n'
            f'{project["description"]}\n'
            f'{tech_icons}\n'
            f'{deploy_link}\n'
            '</div>\n'
        )
    lines.append('</div>\n')
    writeToMd(projects_md, lines)

def index(data, proj, index_md):
    proj = proj["projects"]
    writeHeader(index_md, data)
    writeSkill(index_md, data)
    writeRandomProjects(index_md, proj)
    writeLearning(index_md, data)
    writeCertifications(index_md, data)

def projects(proj, projects_md):
    proj = proj["projects"]
    writeProjects(projects_md, proj)


data = readJson(json_file)
proj = readJson(projects_file)
cleanMdFile(index_md,projects_md)
index(data,proj,index_md)
projects(proj,projects_md)


