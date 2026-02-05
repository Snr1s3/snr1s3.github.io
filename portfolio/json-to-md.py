import json






json_file = 'portfolio/data.json'
md_file = 'portfolio/src/index.md'

def readJson(json_file):
    with open(json_file, 'r') as f:
        content = json.load(f)
    return content

def cleanMdFile(md_file):
    with open(md_file, 'w'):
        pass
def writeHeader(md_file, data):
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
    writeToMd(md_file, list)

def writeAbout(md_file, data):
    list = []
    list.append(f"## About Me  \n\n")
    list.append(f"{data['about']}  \n\n")
    writeToMd(md_file, list)

def writeSkill(md_file, data):
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
    writeToMd(md_file, lines)
def writeToMd(md_file, content, mode='a'):
    with open(md_file, mode) as f:
        for line in content:
            f.write(line)
        f.write("\n---  \n")

def writeProjects(md_file, data):
    lines = []
    lines.append("## Projects\n\n")
    lines.append('<div style="display: flex; flex-wrap: wrap; gap: 1em;">\n')
    for project in data["projects"]:
        lines.append(
            '<div style="border:1px solid #bb86fc; border-radius:8px; padding:1em; width:300px; background:#23272f; color:#e0e0e0;">\n'
            f'  <strong>\n'
            f'    <a href="{project["github"]}" style="color:#bb86fc;">{project["title"]}</a>\n'
            f'  </strong>\n'
            f'  <img src="assets/project_1.jpg" alt="{project["title"]}" style="width:100%; border-radius:8px; margin:10px 0; border:1px solid #bb86fc;">\n'
            f'  <br>\n'
            f'  {project["description"]}\n'
            '</div>\n'
        )
    writeToMd(md_file, lines)

def writeLearning(md_file, data):
    lines = []
    lines.append("## Learning\n\n")
    for learning in data["learning"]:
        lines.append(f'- **{learning["title"]}**  \n')
        lines.append(f'  _{learning["subtitle"]} ({learning["date"]})_  \n')
        lines.append(f'  {learning["description"]}\n\n')
    
    writeToMd(md_file, lines)

def writeCertifications(md_file, data):
    lines = []
    lines.append("## Certifications\n\n")
    for cert in data["certifications"]:
        lines.append(f'- **{cert["title"]}**  \n')
        lines.append(f'  <a href="{cert["url"]}" style="color:#bb86fc;">{cert["description"]}</a>\n\n')
    writeToMd(md_file, lines)

data = readJson(json_file)
cleanMdFile(md_file)
writeHeader(md_file, data)
writeSkill(md_file, data)
writeProjects(md_file, data)
writeLearning(md_file, data)
writeCertifications(md_file, data)


