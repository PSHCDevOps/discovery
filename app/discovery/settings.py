"""
Django settings for the Discovery project.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""
from discovery.utils import config_value

import os
import dj_database_url

#-------------------------------------------------------------------------------
# Global settings

#
# Directories
#
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJ_DIR = os.path.dirname(BASE_DIR)

#
# API settings
#
API_CACHE_LIFETIME = 24 # in hours

API_HOST = config_value('API_HOST', '')

SAM_API_URL = "https://api.data.gov/sam/v1/registrations/"
SAM_API_KEY = config_value('SAM_API_KEY', '')

#
# Discovery related settings
#
VEHICLES = (
    'oasis_sb', 
    'oasis', 
    'hcats_sb', 
    'hcats',
    'bmo_sb',
    'bmo',
    'pss'
)

#
# Test configuration
#
TEST_URL = config_value('TEST_URL', 'http://localhost:8080')


#-------------------------------------------------------------------------------
# Core Django settings

#
# Debugging
#
DEBUG = False
TEMPLATE_DEBUG = False

#
# General configurations
#
SECRET_KEY = config_value('SECRET_KEY', '')
APPEND_SLASH = True

#
# Time configuration
#
TIME_ZONE = 'UTC'
USE_TZ = True

#
# Language configurations
#
LANGUAGE_CODE = 'en-us'
USE_I18N = True
USE_L10N = True

#
# Server configurations
#
WSGI_APPLICATION = 'discovery.wsgi.application'
ROOT_URLCONF = 'discovery.urls'

ALLOWED_HOSTS = [
    '*',
]

#
# Testing configurations
#
TEST_RUNNER = 'test.runner.DiscoveryTestRunner'

#
# Database configurations
#
DATABASES = {}
DATABASES['default'] = dj_database_url.config()

#
# Applications and libraries
#
INSTALLED_APPS = [
    'test',
    'acceptance',
    
    'discovery',
    'api',
    'categories',
    'vendors',
    'contracts',
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'db_mutex',
    
    'rest_framework',
    'django_filters',
    'rest_framework_filters',
    'crispy_forms',
    
    'django_celery_beat',
    'django_celery_results',
    
    'corsheaders'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'csp.middleware.CSPMiddleware',
    'django_referrer_policy.middleware.ReferrerPolicyMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'    
]

#
# Authentication configuration
#
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#
# Templating configuration
#
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'discovery.context_processors.api_host',
            ],
        },
    },
]

#
# Static file configurations
#
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

#
# File compression
#
COMPRESS_PRECOMPILERS = (
    ('text/x-scss', 'django_libsass.SassCompiler'),
)

#
# Caching configuration
#
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
        'LOCATION': 'django_cache_table',
    }
}

#
# Logging configuration
#
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'std': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'csv': {
            'format' : '"%(asctime)s","%(levelname)s",%(message)s',
            'datefmt' : "%Y-%m-%d %H:%M:%S"
        }
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'std',
        },
        'vendor_memory_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJ_DIR, 'logs/vendor_memory.csv'),
            'formatter': 'csv'
        },
        'vendor_data_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJ_DIR, 'logs/vendor_data.csv'),
            'formatter': 'csv'
        },
        'sam_data_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJ_DIR, 'logs/sam_data.csv'),
            'formatter': 'csv'
        },
        'fpds_memory_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJ_DIR, 'logs/fpds_memory.csv'),
            'formatter': 'csv'
        },
        'fpds_data_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJ_DIR, 'logs/fpds_data.csv'),
            'formatter': 'csv'
        }
    },
    'loggers': {
        'django': {
            'handlers':['console'],
            'propagate': True
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'django.template': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False
        },
        'vendor_memory': {
            'handlers': ['vendor_memory_file'],
            'level': 'INFO',
            'propagate': False
        },
        'vendor_data': {
            'handlers': ['vendor_data_file'],
            'level': 'INFO',
            'propagate': False
        },
        'sam_data': {
            'handlers': ['sam_data_file'],
            'level': 'INFO',
            'propagate': False
        },
        'fpds_memory': {
            'handlers': ['fpds_memory_file'],
            'level': 'INFO',
            'propagate': False
        },
        'fpds_data': {
            'handlers': ['fpds_data_file'],
            'level': 'INFO',
            'propagate': False
        }
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    }
}

#-------------------------------------------------------------------------------
# Django Addons

#
# Mutex locking configuration
#
DB_MUTEX_TTL_SECONDS = 86400 # 1 day (24 hours)

#
# Administrative session handling
#
SESSION_ENGINE = 'redis_sessions.session'

SESSION_REDIS = {
    'host': config_value('hostname', 'localhost', ['redis28', 'redis32'], 'discovery-auth'),
    'port': config_value('port', '6379', ['redis28', 'redis32'], 'discovery-auth'),
    'db': 0,
    'password': config_value('password', 'discovery', ['redis28', 'redis32'], 'discovery-auth'),
    'prefix': 'session',
    'socket_timeout': 1
}

#
# Celery processing and scheduling
#
CELERY_BROKER_URL = config_value('uri', 'redis://:discovery@localhost:6379', ['redis28', 'redis32'], 'discovery-tasks')
CELERY_RESULT_BACKEND = 'django-db'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'

#
# REST configuration 
#
REST_PAGE_COUNT = 50

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'api.schemas.DiscoverySchema',
    
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    
    'DEFAULT_FILTER_BACKENDS': [],
    'SEARCH_PARAM': 'q',
    
    'COERCE_DECIMAL_TO_STRING': False,
}

REST_API_TEST = False

#
# Cloud.gov UAA authentication
#
UAA_AUTH = False
UAA_CLIENT_ID = config_value('UAA_CLIENT_ID')
UAA_CLIENT_SECRET = config_value('UAA_CLIENT_SECRET')
UAA_AUTH_URL = config_value('UAA_AUTH_URL', 'https://login.fr.cloud.gov/oauth/authorize')
UAA_TOKEN_URL = config_value('UAA_TOKEN_URL', 'https://uaa.fr.cloud.gov/oauth/token')

#
# Site policies
#
REFERRER_POLICY = 'origin'

CORS_ORIGIN_ALLOW_ALL = True

CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", 'www.google-analytics.com', 'dap.digitalgov.gov')
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", "fonts.googleapis.com")
CSP_IMG_SRC = ("'self'", 'www.google-analytics.com')
CSP_FONT_SRC = ("'self'", 'fonts.gstatic.com')
CSP_OBJECT_SRC = ("'none'",)

SECURE_BROWSER_XSS_FILTER = True


#-------------------------------------------------------------------------------
#
# Local settings overrides
#
try:
    from discovery.local_settings import *
except:
    pass

#-------------------------------------------------------------------------------
#
# Blended overrides
#

#
# Authentication configuration
#
if UAA_AUTH:
    INSTALLED_APPS.append('uaa_client')
    MIDDLEWARE.append('uaa_client.middleware.UaaRefreshMiddleware')
    
    AUTHENTICATION_BACKENDS = ['uaa_client.authentication.UaaBackend']
    LOGIN_URL = 'uaa_client:login'
    
    # Ensuring HTTPS
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
