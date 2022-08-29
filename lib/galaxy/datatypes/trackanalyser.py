"""
Created on April. 21, 2022

@authors: Fabien Mareuil, Institut Pasteur, Paris
@contacts: fabien.mareuil@pasteur.fr
@project: galaxy
@githuborganization: Hub bioinformatics biostatistics
trackanalyser and trackmate datatype sniffer
"""
import csv
from galaxy.datatypes.metadata import MetadataElement

from galaxy.datatypes.tabular import CSV


class Trackanalyser( CSV ):
    """
        Trackanalyser csv format

    """
    file_ext = "trackanalyser.csv"
    expected_headers = ["track", "x", "y", "frame"]
    
    def sniff(self, filename):
        """ Return True if if recognizes dialect and header. """
        try:
            # check the dialect works
            reader = csv.reader(open(filename, 'r'), self.dialect)
            # Check we can read header and get columns
            header_row = next(reader)
            if len(header_row) < 2:
                # No columns so not separated by this dialect.
                return False
            if False in [h in header_row for h in self.expected_headers]:
                return False


            # Check that there is a second row as it is used by set_meta and
            # that all rows can be read
            if self.strict_width:
                num_columns = len(header_row)
                found_second_line = False
                for data_row in reader:
                    found_second_line = True
                    # All columns must be the same length
                    if num_columns != len(data_row):
                        return False
                if not found_second_line:
                    return False
            else:
                data_row = next(reader)
                if len(data_row) < 2:
                    # No columns so not separated by this dialect.
                    return False
                # ignore the length in the rest
                for data_row in reader:
                    pass

            # Optional: Check Python's csv comes up with a similar dialect
            auto_dialect = csv.Sniffer().sniff(open(filename, 'r').read(self.big_peek_size))
            if (auto_dialect.delimiter != self.dialect.delimiter):
                return False
            if (auto_dialect.quotechar != self.dialect.quotechar):
                return False
            """
            Not checking for other dialect options
            They may be mis detected from just the sample.
            Or not effect the read such as doublequote

            Optional: Check for headers as in the past.
            Note No way around Python's csv calling Sniffer.sniff again.
            Note Without checking the dialect returned by sniff
                  this test may be checking the wrong dialect.
            """
            return True
        except Exception:
            # Not readable by Python's csv using this dialect
            return False
    

class Trackmate( Trackanalyser ):
    """
        Trackmate csv format

    """
    file_ext = "trackmate.csv"
    expected_headers = ["TRACK_ID", "POSITION_X", "POSITION_Y", "FRAME"]
    version = "7"
