import logging
log = logging.getLogger( __name__)

RESTRICT_TOOLS = []


def restrict_tool_to_pasteuruser( context, tool):
    user = context.trans.user
    if user is not None:
        email = user.email
        domaine = email.split('@')[1]
    else:
        domaine = "default"
    if domaine == "pasteur.fr":
        return True
    else:
        return tool.name not in RESTRICT_TOOLS
