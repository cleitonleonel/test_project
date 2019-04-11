#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
from otma.apps.core.management.api import ManagementController

from apps.project.management.actions.api import register_backend
import sys
import os


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test_project.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    #register_backend()
    ManagementController().register_backend()
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
