import os
import sqlite3

import log
from config import *
from errors import *


def connect() -> sqlite3.Connection:
    """
    Connect to the database from config file.
    If the database doesn't exist, it will call `init()` to create it.
    :return: sqlite3.Connection
    """
    if not os.path.isfile(DATABASE):
        connection = init()
    else:
        connection = sqlite3.connect(DATABASE, check_same_thread=False)
    return connection


def init() -> sqlite3.Connection:
    """
    Initialize the sqlite database by the sql file from config file.
    :rtype: sqlite3.Connection
    """
    try:
        with open(DATABASE_INIT) as reader:
            sql = reader.read()
            connection = sqlite3.connect(DATABASE, check_same_thread=False)
            connection.executescript(sql)
            return connection
    except FileNotFoundError:
        log.error(DatabaseInitializeError())
        exit(1)


conn = connect()


class Records:
    def __init__(self, number, start=None):
        cur = conn.cursor()
        if start:
            cur.execute("SELECT * FROM Records WHERE timestamp < ? LIMIT ?",
                        (start, number))
        else:
            cur.execute("SELECT * FROM Records LIMIT ?",
                        (number, ))
        self.records = cur.fetchall()
        self.__length = len(self.records)

    def __len__(self):
        return self.__length
