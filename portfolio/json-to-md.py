import json
import random

json_file = 'portfolio/data.json'
index_md = 'portfolio/src/index.md'
projects_md = 'portfolio/src/projects.md'

def readJson(json_file):
    with open(json_file, 'r') as f:
        content = json.load(f)
    return content

def cleanMdFile(index_md):
    with open(index_md, 'w'):
        pass
def writeHeader(index_md, data):
    list = []
    list.append(f"# {data['title']}  \n\n")
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
    lines.append(f"## Skills  \n\n")
    lines.append(f"**Main Technologies:**  \n\n")
    lines.append(f'<div style="display:flex; gap:10px; flex-wrap:wrap;">')
    for tec in data["technologies"]:
        lines.append(
            '<div style="display:flex; flex-direction:column; align-items:center; width:60px; text-align:center;">'
                f'<span style="background:#fff; padding:4px; border-radius:6px; display:inline-block;"><img src="{tec["icon"]}" alt="{tec["name"]}" width="50"/></span>'
                f'<span style="font-size:12px; color:#bb86fc; margin-top:2px;">{tec["name"]}</span>'
            '</div>'
        )
    lines.append(f'</div>  \n\n')
    lines.append(f"**Currently Learning:**  \n\n")
    lines.append(f'<div style="display:flex; gap:10px; flex-wrap:wrap;">')
    for tec in data["currentlylearning"]:
        lines.append(
            '<div style="display:flex; flex-direction:column; align-items:center; width:60px; text-align:center;">'
                f'<span style="background:#fff; padding:4px; border-radius:6px; display:inline-block;"><img src="{tec["icon"]}" alt="{tec["name"]}" width="50"/></span>'
                f'<span style="font-size:12px; color:#bb86fc; margin-top:2px;">{tec["name"]}</span>'
            '</div>'
        )
    lines.append(f'</div>  \n\n')
    writeToMd(index_md, lines)
def writeToMd(index_md, content, mode='a'):
    with open(index_md, mode) as f:
        for line in content:
            f.write(line)
        f.write("\n---  \n")

def writeRandomProjects(index_md, data):
    lines = []
    lines.append("## Some Projects\n\n")
    lines.append('<div style="display: flex; flex-wrap: wrap; gap: 1em;">\n')
    projects = data["projects"]
    if len(projects) > 2:
        projects = random.sample(projects, 2)
    for project in projects:
        tech_icons = ''
        if "technologies" in project:
            tech_icons = '<div style="display:flex; gap:6px; margin:6px 0 0 0;">'
            for tech in project["technologies"]:
                tech_icons += f'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech["icon"].split("-")[1]}/{tech["icon"].split("-")[1]}-original.svg" alt="{tech["name"]}" title="{tech["name"]}" width="24" style="background:#fff; border-radius:4px; padding:2px;">'
            tech_icons += '</div>'
        lines.append(
            '<div style="border:1px solid #bb86fc; border-radius:8px; padding:1em; width:300px; background:#23272f; color:#e0e0e0;">\n'
            f'  <strong>\n'
            f'    <a href="{project["github"]}" style="color:#bb86fc;">{project["title"]}</a>\n'
            f'  </strong>\n'
            f'  <img src="assets/project_1.jpg" alt="{project["title"]}" style="width:100%; border-radius:8px; margin:10px 0; border:1px solid #bb86fc;">\n'
            f'  <br>\n'
            f'  {project["description"]}\n'
            f'  {tech_icons}\n'
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
    for project in data["projects"]:
        tech_icons = ''
        if "technologies" in project:
            tech_icons = '<div style="display:flex; gap:6px; margin:6px 0 0 0;">'
            for tech in project["technologies"]:
                tech_icons += f'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech["icon"].split("-")[1]}/{tech["icon"].split("-")[1]}-original.svg" alt="{tech["name"]}" title="{tech["name"]}" width="24" style="background:#fff; border-radius:4px; padding:2px;">'
            tech_icons += '</div>'
        lines.append(
            '<div style="border:1px solid #bb86fc; border-radius:8px; padding:1em; width:300px; background:#23272f; color:#e0e0e0;">\n'
            f'  <strong>\n'
            f'    <a href="{project["github"]}" style="color:#bb86fc;">{project["title"]}</a>\n'
            f'  </strong>\n'
            f'  <img src="assets/project_1.jpg" alt="{project["title"]}" style="width:100%; border-radius:8px; margin:10px 0; border:1px solid #bb86fc;">\n'
            f'  <br>\n'
            f'  {project["description"]}\n'
            f'  {tech_icons}\n'
            '</div>\n'
        )
    lines.append('</div>\n')
    writeToMd(projects_md, lines)

def index():
    data = readJson(json_file)
    cleanMdFile(index_md)
    writeHeader(index_md, data)
    writeSkill(index_md, data)
    writeRandomProjects(index_md, data)
    writeLearning(index_md, data)
    writeCertifications(index_md, data)

def projects():
    data = readJson(json_file)
    writeProjects(projects_md, data)


index()
projects()


