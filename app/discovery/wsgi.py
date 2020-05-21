"""
WSGI config for discovery project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""
<<<<<<< HEAD
import os
import time
import traceback
import signal
import sys
=======

>>>>>>> origin/master
from django.conf import settings
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
import os

<<<<<<< HEAD
try:
    application = WhiteNoise(get_wsgi_application(), root="{}/{}".format(settings.BASE_DIR, 'static'))
    print('WSGI without exception')
except Exception:
    print('handling WSGI exception')
    # Error loading applications
    if 'mod_wsgi' in sys.modules:
        traceback.print_exc()
        os.kill(os.getpid(), signal.SIGINT)
        time.sleep(2.5)
=======
application = WhiteNoise(get_wsgi_application(), root=os.path.join(settings.BASE_DIR, 'static'))
application.index_file = True
>>>>>>> origin/master
