"""
CLC datatype
"""

from galaxy.datatypes.binary import Binary
import binascii
import data
import logging

log = logging.getLogger(__name__)
class Cas( Binary ):
    """Class describing an cas file"""
    file_ext = "cas"

    def set_peek( self, dataset, is_multi_byte=False ):
        if not dataset.dataset.purged:
            dataset.peek  = "Binary cas sequence file"
            dataset.blurb = data.nice_size( dataset.get_size() )
        else:
            dataset.peek = 'file does not exist'
            dataset.blurb = 'file purged from disk'

    def display_peek( self, dataset ):
        try:
            return dataset.peek
        except:
            return "Binary cas sequence file (%s)" % ( data.nice_size( dataset.get_size() ) )

    def sniff(self, filename):
        try:
            with open(filename).read(3) as header:
                if binascii.b2a_hex( header ) == binascii.hexlify( 'CLC' ):
                    return True
                return False
        except:
            return False

Binary.register_sniffable_binary_format("cas", "cas", Cas)
