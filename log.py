import logging

import config

logging.basicConfig(format=config.LOG_FORMAT,
                    level=config.LOG_LEVEL)


def error(exception):
    logging.error(str(exception))
