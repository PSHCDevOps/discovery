from django.conf.urls import url

from api import routers, views


router = routers.DiscoveryAPIRouter()

router.register('naics', views.NaicsViewSet)
router.register('psc', views.PscViewSet)
router.register('keywords', views.KeywordViewSet)
router.register('setasides', views.SetAsideViewSet)
router.register('vehicles', views.VehicleViewSet)
router.register('pools', views.PoolViewSet)
router.register('zones', views.ZoneViewSet)

router.register('vendors', views.VendorViewSet)
router.register('memberships', views.MembershipViewSet)

router.register('agencies', views.AgencyViewSet)
router.register('pricing', views.PricingViewSet)
router.register('statuses', views.StatusViewSet)
router.register('placesofperformance', views.PlaceOfPerformanceViewSet)
router.register('contracts', views.ContractViewSet)

urlpatterns = [
    url(r'^metadata/$', views.ListMetadataView.as_view()),
    url(r'^metadata', views.ListMetadataView.as_view())
]
urlpatterns += router.urls
