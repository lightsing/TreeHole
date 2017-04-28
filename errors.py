class DatabaseInitializeError(Exception):
    def __init__(self):
        message = 'Database Initializing File Not Found'
        super(DatabaseInitializeError, self).__init__(message)
