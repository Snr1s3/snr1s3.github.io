import json


class Media:
    def __init__(self, email, cv, github, likedin):
        self.email = email
        self.cv = cv
        self.github = github
        self.likedin = likedin


class Technology:
    def __init__(self, icon, name):
        self.icon = icon
        self.name = name
    def to_dict(self):
        return {"icon": self.icon, "name": self.name}
        
class LearningT:
    def __init__(self, icon, name):
        self.icon = icon
        self.name = name
    def to_dict(self):
        return {"icon": self.icon, "name": self.name}


class Info:
    def __init__(self, icon, title, subtitle, description, date="", certificate="", technologies=[], image="", url="", github=""):
        self.icon = icon
        self.title = title
        self.subtitle = subtitle
        self.description = description
        self.date = date
        self.certificate = certificate
        self.technologies = [tech.to_dict() if hasattr(tech, 'to_dict') else tech for tech in technologies]
        self.image = image
        self.url = url
        self.github = github


class Extra:
    def __init__(self, image, title, description, url):
        self.image = image
        self.title = title
        self.description = description
        self.url = url
    def to_dict(self):
        return {"image": self.image, "title": self.title, "description": self.description, "url": self.url}


class Data:
    def __init__(
        self,
            title,
            description,
            image,
            avatar,
            name,
            skill,
            location,
            media,
            about,
            technologies,
            learningt,
            experience,
            projects,
            training,
            extras
    ):
        self.title = title
        self.description = description
        self.image = image
        self.avatar = avatar
        self.name = name
        self.skill = skill
        self.location = location
        self.media = Media(**media)
        self.about = about
        self.technologies = [Technology(**tech).to_dict() if isinstance(tech, dict) else tech.to_dict() for tech in technologies]
        self.learningt = [LearningT(**tech).to_dict() if isinstance(tech, dict) else tech.to_dict() for tech in learningt]
        self.experience = [Info(**info).__dict__ if isinstance(info, dict) else info.__dict__ for info in experience]
        self.projects = [Info(**info).__dict__ if isinstance(info, dict) else info.__dict__ for info in projects]
        self.training = [Info(**info).__dict__ if isinstance(info, dict) else info.__dict__ for info in training]
        self.extras = [Extra(**info).to_dict() if isinstance(info, dict) else info.to_dict() for info in extras]


with open("assets/data/data.json") as file:
    json_data = json.load(file)

data = Data(**json_data)
