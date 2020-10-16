"""
WSGI config for discovery project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

from django.conf import settings
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
import os

application = WhiteNoise(get_wsgi_application(), root=os.path.join(settings.BASE_DIR, 'static'))
application.index_file = True
