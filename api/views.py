from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.views import APIView

from vendor.models import Vendor, Naics, SetAside
from api.serializers import VendorSerializer, NaicsSerializer


class ListVendors(APIView):
    
    def get(self, request, format=None):
        serializer = VendorSerializer(self.get_queryset(), many=True)
        return  Response(serializer.data)

    def get_queryset(self):
        
        vendors = Vendor.objects.all()
        naics = self.request.QUERY_PARAMS.get('naics', None)
        setasides = self.request.QUERY_PARAMS.get('setasides', None)
        
        if naics:
            naics_obj = Naics.objects.get(short_code=naics)
            vendors = vendors.filter(pools__naics=naics_obj)
       
        if setasides:
            setasides = setasides.split(',')
            for sa in SetAside.objects.filter(code__in=setasides):
                vendors = vendors.filter(setasides=sa)                


        return vendors


class ListNaics(APIView):

    def get(self, request, format=None):
        serializer = NaicsSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def get_queryset(self):
        codes = Naics.objects.all()

        #filters
        q = self.request.QUERY_PARAMS.get('q', None)

        if q:
            codes = Naics.objects.filter(description__icontains=q)
        else:
            codes = Naics.objects.all()

        return codes
