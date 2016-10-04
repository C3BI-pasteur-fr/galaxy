__author__ = 'fmareuil'

def is_user_in_pasteur_group(user, tool):
    """
    test if a user is is in the required group and return the correct destination
    :param user: galaxy user object
    :param tool: galaxy tool object
    :return: galaxy destination object
    """
    if user:
        if user.groups:
            group = user.groups[0].group.name
        else:
            group = "default"
    else:
        group = "default"
    for jtc in tool.job_tool_configurations:
        if not jtc.params:
            required_group = jtc.get('required_group')
            current_dest = jtc.get('destination')
            final_dest = jtc.get('final_destination')
    if group == required_group:
        return final_dest
    else:
        return current_dest