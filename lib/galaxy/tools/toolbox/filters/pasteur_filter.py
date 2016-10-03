import logging
log = logging.getLogger( __name__)

RESTRICT_TOOLS = ["liftOver1"]

TEST_USERS = ["fmareuil@pasteur.fr", "odoppelt@pasteur.fr"]
TEST_SECTIONS = ["tests"]
TEST_TOOLS = []


def restrict_tool_to_pasteuruser( context, tool ):
    user = context.trans.user
    if user:
        if user.groups:
            group = user.groups[0].group.name
        else:
            group = "default"
    else:
        group = "default"
    if group == "pasteur_users":
        return True
    else:
        return tool.id not in RESTRICT_TOOLS


def restrict_section_to_notestusers( context, section ):
    user = context.trans.user
    if user is not None:
        login = user.email
    else:
        login = "anonyme"
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
    else:
        login = "anonyme"
    if tool.id in TEST_TOOLS:
        if login in TEST_USERS:
            return True
        else:
            return False
    else:
        return True 
