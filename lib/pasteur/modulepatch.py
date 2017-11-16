import os
import logging
from xml.etree import ElementTree as ET

log = logging.getLogger( __name__ )

module_template = """if [ -f %(source_module)s ]; 
then
source %(source_module)s
module load %(modules)s
else
module load %(modules)s
fi
"""


def module_prepare(app, command_line, job, working_directory):
    if app.config.use_modules:
        path_module_conf_sample = os.path.dirname(command_line.split()[1]) + "/module_conf.xml.sample"
        log.debug('MODULE DEBUG : Path module_conf.xml.sample %s' % ( path_module_conf_sample ))
        dependency_module = module_dependency( job.tool_id, job.tool_version, path_module_conf_sample )
        if dependency_module:
            dict_module = {'source_module':app.config.use_modules, 'modules': dependency_module[0]}
            script = module_template % ( dict_module )
            module_path = os.path.join( working_directory, "module.sh" )
            modulefile = file( module_path, "w" )
            modulefile.write( script )
            modulefile.close()
            os.chmod( module_path, 0750 )
            dependency_module_commands = [". " + module_path]
        else:
            dependency_module_commands = None
    else:
        dependency_module_commands = None
    return dependency_module_commands


def module_dependency( job_tool_id, job_tool_version, module_sample_path ):
    if os.path.exists(module_sample_path):
        doc = ET.parse( module_sample_path )
    elif os.path.exists(os.path.join(os.getcwd(),"module_conf.xml")):
        doc = ET.parse(os.path.join(os.getcwd(),"module_conf.xml"))
    else:
        return
    root = doc.getroot()
    tooldict = {}
    for rootchild in root.getchildren():
        if ( rootchild.tag == "tool" ):
            tool_id = rootchild.attrib["id"]
            tool_version = rootchild.attrib["version"]
            module_name = rootchild.attrib["module"]
            tooldict[tool_id, tool_version] = [module_name]
    log.debug('MODULE DEBUG : Job id %s version %s' % (job_tool_id, job_tool_version))
    if tooldict.has_key((job_tool_id, job_tool_version)):
        return tooldict[job_tool_id, job_tool_version]


def __handle_dependency_module(commands_builder, job_wrapper):
    if job_wrapper.dependency_module_commands:
        commands_builder.prepend_commands(job_wrapper.dependency_module_commands)


def fix_default_version(modules):
    """
    This decorator is used to fix the issue from module returning x.x(default) for version:
      e.g. when looking for tool v.1.1, if this is the default one loaded by module
           it will return tool/1.1(default). Therefore comparison of version fails.

    :param has_module: function AvailModuleCheck.__modules from lib/galaxy/tools/deps/resolvers/modules.py
    :type has_module: FUNCTION
    """

    def new_modules(self):
        mod_gen = modules(self)
        for name, version in mod_gen:
            yield name, version.replace('(default)','')

    return new_modules