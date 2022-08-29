"""
Created on Mars. 29, 2016

@authors: Olivia Doppelt-Azeroual, Institut Pasteur, Paris
@contacts: fabien.mareuil@pasteur.fr
@project: galaxy
@githuborganization: C3BI
macsyview datatype sniffer
"""

from galaxy.datatypes.text import Json
from galaxy.datatypes.metadata import MetadataElement
import json
import os

class MacsyView( Json ):
    """
        MacsyView json format

    """
    file_ext = "macsyview"

    def sniff(self, filename):
        """
        Try to guess the macsyview.
        It's usually contain 6 keys : occurrence_number, name, replicon, genes,
        summary, id.
        """
        if self._looks_like_json( filename ):
            keys_list = ['occurrence_number', 'name', 'replicon', 'genes',
            'summary', 'id']
            with open(filename, "r") as fh:
                data = json.load(fh)
                dict_keys = data[0].keys()
                dict_keys = map(str, dict_keys)
                if keys_list == list(dict_keys):
                    return True
                else:
                    return False
            return False
