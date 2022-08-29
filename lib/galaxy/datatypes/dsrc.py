__author__ = 'odoppelt'

import logging
from galaxy.datatypes.binary import Binary
from galaxy.datatypes.sequence import Sequence

log = logging.getLogger(__name__)


class FastqDsrc( Sequence ):
    """Class representing a dsrc compressed FASTQ sequence"""
    edam_format = "format_2333"
    file_ext = ["dsrc", "dsrc2"]

Binary.register_unsniffable_binary_ext("dsrc")
Binary.register_unsniffable_binary_ext("dsrc2")