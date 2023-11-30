# For Login

URL = http://localhost:8080/auth/login
METHOD = POST
BODY = {
"username": <username>,
"email": <email>,
"password": <password>
}

# For Project

GET ALL PROJECT:->
URL = http://localhost:8080/project/get
METHOD = GET
QUERY : {
limit = 1,
page = 1
}
HEADERS = {
token : <token>
}

ADD PROJECT:->
URL = http://localhost:8080/project/add
METHOD = POST
HEADERS = {
token : <token>
}
BODY = {
name : <name>
}

# For Podcast

GET PODCAST:->
URL = http://localhost:8080/podcast/get
METHOD = GET
QUERY : {
limit = 1,
page = 1
projectId = <project id>
}
HEADERS = {
token : <token>
}

ADD PODCAST:->
URL = http://localhost:8080/podcast/add
METHOD = POST
HEADERS = {
token : <token>
}
BODY = {
"name" : <name>,
"description" : <description>,
"projectId" : "656798fdb6fbdb3e9ee7dd57"
}

UPDATE PODCAST:->
URL = http://localhost:8080/podcast/update/:id
METHOD = PATCH
HEADERS = {
token : <token>
}
BODY = {
any thing you wan't to update
}
