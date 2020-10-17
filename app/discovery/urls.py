from django.conf import settings
from django.conf.urls import include, url, static
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from django.urls import path, include

from rest_framework.documentation import include_docs_urls
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from vendors import views as vendors
from contracts import views as contracts
from drf_yasg.generators import OpenAPISchemaGenerator
from discovery.utils import getHostName, getBaseUrl

class CustomOpenAPISchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, *args, **kwargs):
        schema = super().get_schema(*args, **kwargs)
        schema.basePath = getBaseUrl()
        return schema

schema_view = get_schema_view(
    openapi.Info(
        title="Discovery API",
        default_version='v2',
        description="Discovery API Documentation",
        contact=openapi.Contact(email="fasdigitalsupport@gsa.gov"),
    ),
    url=getHostName(),
    public=True,
    generator_class=CustomOpenAPISchemaGenerator,
)

urlpatterns = [
    # API related endpoints        
    url(r'^api/', include('api.urls')),
    #url(r'^api/', include_docs_urls(title="Discovery API", public=True)),
    url(r'^swagger(?P<format>.json|.yaml)$', schema_view.without_ui(cache_timeout=None), name='schema-json'),
    url(r'^api/$', schema_view.with_ui('swagger', cache_timeout=None), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=None), name='schema-redoc'),
    url(r'^api$', RedirectView.as_view(url='/api/', permanent=False)),
    url(r'^developers?/?', RedirectView.as_view(url='/api/', permanent=False)),

    # Data export endpoints
    url(r'^csv/vendors', vendors.VendorCSV.as_view(), name="vendor-csv"),
    url(r'^csv/contracts/(?P<vendor_duns>\w+)', contracts.ContractCSV.as_view(), name="contract-csv"),

    # Frontend routes
    url(r'^404$', TemplateView.as_view(template_name='index.html')),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^search.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^about.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^contracts.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^oasis.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^hcats.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^bmo.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^erm.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^accounts.*$', TemplateView.as_view(template_name='index.html')),
    url(r'^docs', include('docs.urls')),
    url(r'^.*$', RedirectView.as_view(url='/404', permanent=False))
]