# pylint: disable=W0614
from .dev import *  # pylint: disable=wildcard-import

FILE_UPLOAD_HANDLERS = (
    'contentstore.debug_file_uploader.DebugFileUploader',
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
)
