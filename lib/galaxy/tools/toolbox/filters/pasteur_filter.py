import logging
log = logging.getLogger( __name__)

RESTRICT_TOOLS = []

TEST_USERS = ["fmareuil@pasteur.fr", "odoppelt@pasteur.fr", "mvalade@pasteur.fr"]
TEST_SECTIONS = ["tests"]
TEST_TOOLS = []


def restrict_tool_to_pasteuruser( context, tool ):
    user = context.trans.user
    if user is not None:
        email = user.email
        domaine = email.split('@')[1]
    else:
        domaine = "default"
    if domaine == "pasteur.fr":
        return True
    else:
        return tool.id not in RESTRICT_TOOLS


def restrict_section_to_notestusers( context, section ):
    user = context.trans.user
    if user is not None:
        login = user.email
    if section.id in TEST_SECTIONS:
        if login in TEST_USERS:
            return True
        else:
            return False
    else:
        return True
        

def restrict_tool_to_notestusers( context, tool ):
    user = context.trans.user
    if user is not None:
        login = user.email
    print tool.id
    if tool.id in TEST_TOOLS:
        if login in TEST_USERS:
            return True
        else:
            return False
    else:
        return True 
