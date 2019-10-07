from titlecase import titlecase

from django.conf import settings
from django.db.models import Q
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from discovery.csv import format_duns, BaseCSVView
from discovery.cache import track_page_load

from categories import models as categories
from vendors import models as vendors
from contracts import models as contracts

import csv
import time


# Filters:
# 
#     keywords={KEYWORD},...
#     naics={CODE},...
#     psc={CODE},...
#     vehicles={ID},...
#     pools={ID},...
#     setasides={CODE},...
#     zones={ID},...
#     agencies={ID},...
#     amount={LOW},{HIGH}
#     countries={CODE},...
#     states={CODE},...
#


class VendorCSV(BaseCSVView):
    
    def __init__(self, **kwargs):
        super(VendorCSV, self).__init__(**kwargs)
        
        # Filters
        self.keywords_param = 'keywords'
        self.keywords = []
        
        self.naics_param = 'naics'
        self.naics = []
        
        self.psc_param = 'pscs'
        self.psc = []
        
        self.vehicles_param = 'vehicles'
        self.vehicles = []
        
        self.pools_param = 'pools'
        self.pools = []
        
        self.setasides_param = 'setasides'
        self.setasides = []
        
        self.zones_param = 'zones'
        self.zones = []
        
        self.agencies_param = 'agencies'
        self.agencies = []
        
        self.amount_param = 'amount'
        self.amount_low = None
        self.amount_high = None
        
        self.countries_param = 'countries'
        self.countries = []
        
        self.states_param = 'states'
        self.states = []
        # Queries
        self.setaside_data = categories.SetAside.objects.all().order_by('far_order')
        self.pool_data = categories.Pool.objects.all().distinct()
        self.membership_data = vendors.PoolMembership.objects.all().distinct()
        self.vendor_data = vendors.Vendor.objects.all().distinct()


    def _render_keywords(self, writer):
        keyword_data = categories.Keyword.objects.filter(id__in=self.keywords)
        
        writer.writerow(('Service category keywords:', 'Name'))
        
        for keyword in keyword_data:
            writer.writerow(('', keyword.name))
        
        writer.writerow(('', ))       
    
    def _process_keywords(self, writer):
        self.keywords = self.get_params(self.keywords_param)
        
        if len(self.keywords) > 0:
            self.pool_data = self.pool_data.filter(keywords__id__in=self.keywords)
            self._render_keywords(writer)
    
    
    def _render_naics(self, writer):
        naics_data = categories.Naics.objects.filter(code__in=self.naics)
        
        writer.writerow(('Service category NAICS codes:', 'Code', 'Description'))
        
        for naics in naics_data:
            writer.writerow(('', naics.code, naics.description))
        
        writer.writerow(('', ))       
    
    def _process_naics(self, writer):
        self.naics = self.get_params(self.naics_param)
        
        if len(self.naics) > 0:
            self.pool_data = self.pool_data.filter(naics__in=self.naics)
            self._render_naics(writer)

   
    def _render_psc(self, writer):
        psc_data = categories.PSC.objects.filter(code__in=self.psc)
        
        writer.writerow(('Service category PSC codes:', 'Code', 'Description'))
        
        for psc in psc_data:
            writer.writerow(('', psc.code, psc.description))
        
        writer.writerow(('', ))       
    
    def _process_psc(self, writer):
        self.psc = self.get_params(self.psc_param)
        
        if len(self.psc) > 0:
            self.pool_data = self.pool_data.filter(psc__in=self.psc)
            self._render_psc(writer)

   
    def _render_vehicles(self, writer):
        vehicle_data = categories.Vehicle.objects.filter(id__in=self.vehicles)
        
        writer.writerow(('Service category vehicles:', 'Id', 'Name', 'Point of Contact', 'Ordering Guide'))
        
        for vehicle in vehicle_data:
            writer.writerow(('', vehicle.id, vehicle.name, vehicle.poc, vehicle.ordering_guide))
        
        writer.writerow(('', ))       
    
    def _process_vehicles(self, writer):
        self.vehicles = self.get_params(self.vehicles_param)
        
        if len(self.vehicles) > 0:
            self.pool_data = self.pool_data.filter(vehicle__in=self.vehicles)
            self._render_vehicles(writer)

   
    def _render_pools(self, writer):
        pool_data = categories.Pool.objects.filter(id__in=self.pools)
        
        writer.writerow(('Service category pools:', 'Id', 'Name', 'Threshold'))
        
        for pool in pool_data:
            writer.writerow(('', pool.id, pool.name, pool.threshold))
        
        writer.writerow(('', ))       
    
    def _process_pools(self, writer):
        self.pools = self.get_params(self.pools_param)
        
        if len(self.pools) > 0:
            self.pool_data = self.pool_data.filter(id__in=self.pools)
            self._render_pools(writer)
            
        self.membership_data = self.membership_data.filter(pool__id__in=list(self.pool_data.values_list('id', flat=True)))

  
    def _render_setasides(self, writer):
        setaside_data = categories.SetAside.objects.filter(code__in=self.setasides)
        
        writer.writerow(('Vendor setasides:', 'Code', 'Name', 'Description'))
        
        for setaside in setaside_data:
            writer.writerow(('', setaside.code, setaside.name, setaside.description))
        
        writer.writerow(('', ))       
    
    def _process_setasides(self, writer):
        self.setasides = self.get_params(self.setasides_param)
        
        if len(self.setasides) > 0:
            for setaside_code in self.setasides:
                self.membership_data = self.membership_data.filter(setasides__code=setaside_code)
            
            self._render_setasides(writer)

  
    def _render_zones(self, writer):
        zone_data = categories.Zone.objects.filter(id__in=self.zones)
        
        writer.writerow(('Vendor zones:', 'Id', 'States'))
        
        for zone in zone_data:
            writer.writerow(('', zone.id, ", ".join(zone.states.all().values_list('code', flat=True))))
        
        writer.writerow(('', ))       
    
    def _process_zones(self, writer):
        self.zones = self.get_params(self.zones_param)
        
        if len(self.zones) > 0:
            for zone_id in self.zones:
                self.membership_data = self.membership_data.filter(zones__id=zone_id)
            
            self._render_zones(writer)

        
    def _process_memberships(self, writer):
        self.vendor_data = self.vendor_data.filter(pools__id__in=list(self.membership_data.values_list('id', flat=True)))


    def _render_amount(self, writer):
        writer.writerow(('Vendor contract obligated amounts:', 'Low', 'High'))
        writer.writerow(('', self.amount_low, self.amount_high))
        writer.writerow(('', ))       
    
    def _process_amount(self, writer):
        range = self.get_params(self.amount_param)
        
        if len(range) > 0:
            self.amount_low = range[0]
            self.amount_high = range[1] if len(range) > 1 else None
        
            if self.amount_low and self.amount_high:
                self.vendor_data = self.vendor_data.filter(contract__obligated_amount_range=[self.amount_low, self.amount_high])
            elif self.amount_low:
                self.vendor_data = self.vendor_data.filter(contract__obligated_amount_gte=self.amount_low)
            else:
                self.vendor_data = self.vendor_data.filter(contract__obligated_amount_lte=self.amount_high)
            
            self._render_amount(writer)

  
    def _render_agencies(self, writer):
        agency_data = contracts.Agency.objects.filter(id__in=self.agencies)
        
        writer.writerow(('Vendor agencies contracted with:', 'Id', 'Name'))
        
        for agency in agency_data:
            writer.writerow(('', agency.id, agency.name))
        
        writer.writerow(('', ))       
    
    def _process_agencies(self, writer):
        self.agencies = self.get_params(self.agencies_param)
        
        if len(self.agencies) > 0:
            self.vendor_data = self.vendor_data.filter(contract__agency__id__in=self.agencies)
            self._render_agencies(writer)

  
    def _render_countries(self, writer):
        writer.writerow(('Vendor contract place of performance countries:', 'Code'))
        
        for country in self.countries:
            writer.writerow(('', country))
        
        writer.writerow(('', ))       
    
    def _process_countries(self, writer):
        self.countries = self.get_params(self.countries_param)
        
        if len(self.countries) > 0:
            self.vendor_data = self.vendor_data.filter(contract__place_of_performance__country_code__in=self.countries)
            self._render_countries(writer)

  
    def _render_states(self, writer):
        writer.writerow(('Vendor contract place of performance states:', 'Code'))
        
        for state in self.states:
            writer.writerow(('', state))
        
        writer.writerow(('', ))       
    
    def _process_states(self, writer):
        self.states = self.get_params(self.states_param)
        
        if len(self.states) > 0:
            self.vendor_data = self.vendor_data.filter(contract__place_of_performance__state__in=self.states)
            self._render_states(writer)

 
    def _render_vendors(self, writer):
        labels = ['Vendor DUNS', 'Vendor Name', 'Location', 'No. of Contracts', 'Vehicles']
        labels.extend([sa_obj.name for sa_obj in self.setaside_data])
        labels.append("Selected Vehicle")
        writer.writerow(labels)
        
        for vendor in self.vendor_data.iterator():
            setaside_list = []
            v_pools_all = vendor.pools.all()
            v_pools = vendor.pools.filter(pool__vehicle__id__in=self.vehicles)

            for sa in self.setaside_data:
                if sa.id in v_pools.values_list('setasides', flat=True):
                    setaside_list.append('X')
                else:
                    setaside_list.append('')
                    
            if vendor.sam_location:
                location = "{}, {} {}".format(vendor.sam_location.city, vendor.sam_location.state, vendor.sam_location.zipcode)
            else:
                location = 'NA'
            
            if len(self.naics) > 0:
                naics_data = categories.Naics.objects.filter(code__in=self.naics)
                sin_codes = {}
                
                for naics in naics_data:
                    for sin_code in list(naics.sin.all().values_list('code', flat=True)):
                        sin_codes[sin_code] = True
                
                psc_codes = list(categories.PSC.objects.filter(sin__code__in=sin_codes.keys()).distinct().values_list('code', flat=True))
                contract_list = contracts.Contract.objects.filter(Q(PSC__in=psc_codes) | Q(NAICS__in=self.naics), vendor=vendor)
            else:
                contract_list = contracts.Contract.objects.filter(vendor=vendor)
            
            vehicle_map = {}
            vendor_vehicles = []  
            selected_vehicles = []
            for v_pool in v_pools_all:
                if v_pool.pool.vehicle.id not in vehicle_map:
                    vendor_vehicles.append(" ".join(v_pool.pool.vehicle.id.split('_')))
                    vehicle_map[v_pool.pool.vehicle.id] = True      
            if len(vendor_vehicles) > 1:
                selected_vehicles = str(self.vehicles).replace('[', '').replace(']', '').strip("'")
            v_row = [format_duns(vendor.duns), vendor.name, location, contract_list.count(), ", ".join(vendor_vehicles)]
            v_row.extend(setaside_list)
            if selected_vehicles:
                v_row.append(selected_vehicles)
            writer.writerow(v_row)


    @method_decorator(cache_page(settings.PAGE_CACHE_LIFETIME, cache='page_cache'))   
    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="vendors.csv"'
        
        writer = csv.writer(response)    
        writer.writerow(('GSA Discovery vendor research results',))
        writer.writerow(('URL: ' + self.request.build_absolute_uri(),))
        writer.writerow(('Time: ' + time.strftime('%b %d, %Y %l:%M%p %Z'),))
        writer.writerow(('', ))
        
        self._process_keywords(writer)
        self._process_naics(writer)
        self._process_psc(writer)
        self._process_vehicles(writer)
        self._process_pools(writer)
         
        self._process_setasides(writer)
        self._process_zones(writer)
        self._process_memberships(writer)
               
        self._process_agencies(writer)
        self._process_amount(writer)
        self._process_countries(writer)
        self._process_states(writer)
        self._render_vendors(writer)
        
        track_page_load(request)
        return response
