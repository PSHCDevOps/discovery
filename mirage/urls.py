from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

from api import urls as api_urls

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mirage.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/', include(api_urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^test/$', TemplateView.as_view(template_name='index2.html')),


) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

