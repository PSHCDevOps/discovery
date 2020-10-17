from django.conf import settings
from django.core.management.base import BaseCommand

import pandas as pd

from categories.models import Pool

import os
import logging
import re


def vendor_logger():
    return logging.getLogger('vendor')


def vehicle_info(vehicle):
    field_map = {
        'oasis': {
            'field_types': ('core', 'zones')
        },
        'oasis_sb': {
            'field_types': ('core', 'setasides', 'zones')                  
        },
        'hcats': {
            'field_types': ('core', 'zones')                  
        },
        'hcats_sb': {
            'field_types': ('core', 'setasides', 'zones')                  
        },
        'bmo': {
            'field_types': ('core', 'zones')                  
        },
        'bmo_sb': {
            'field_types': ('core', 'setasides', 'zones')                  
        }
    }
    return field_map[vehicle]


def vendor_field_type_core():
    return [
        'ContractorName',
        'ContractNumber',
        'ContractEnd',
        'DUNS',
        'POC1',
        'Phone1',
        'Email1',
        'POC2',
        'Phone2',
        'Email2'
    ]
    
def vendor_field_type_setasides():
    return [
        'SB',
        '8(a)',
        '8(a)Date',
        'HubZ',
        'SDB',
        'WO',
        'VO',
        'SDVOSB',
        'VIP'
    ]
    
def vendor_field_type_zones():
    return [
        'Zone1',
        'Zone2',
        'Zone3',
        'Zone4',
        'Zone5',
        'Zone6'
    ]

class Command(BaseCommand):
    
    def check_pool(self, vehicle, pool, df):
        variables = globals()
        info = vehicle_info(vehicle)
        logger = vendor_logger()
        columns = list(df.columns)
        vendor_count = 0
        
        print("   > Data:")
        for field_group in info['field_types']:
            field_processor = "vendor_field_type_{}".format(field_group)
            missing = 0
            
            print("     - {}:".format(field_group))
            for column in variables[field_processor]():
                if column not in columns:
                    print("       - Missing: {}".format(column))
                    missing += 1
        
            if missing == 0:
                print("       - No missing fields")
               
        for index, record in df.iterrows():
            vendor_count += 1
            
        print("   > Vendors: {}".format(vendor_count))


    def check_vehicle(self, vehicle):
        vehicle_file = os.path.join(settings.BASE_DIR, 'data/pools/{}.xlsx'.format(vehicle))
        wb = pd.ExcelFile(vehicle_file)
        sheets = wb.sheet_names
        
        print("\nVehicle [ {} ]".format(vehicle))
        
        for name in sheets:
            try:
                pool = re.search(r'\(\s*([0-9a-zA-Z]+)\s*\)', name, re.IGNORECASE).group(1)
                pool_data = Pool.objects.get(number=pool, vehicle__id__iexact=vehicle)
                
                print("\n > Pool [ {} ]".format(pool))
                self.check_pool(vehicle, pool, wb.parse(name))

            except AttributeError as e:
                pass # Not a pool sheet, skip...
            
            except Pool.DoesNotExist as e:
                logger.debug(" > Pool {} not found".format(pool))
                raise(e)

            except Pool.MultipleObjectsReturned as e:
                logger.debug(" > More than one pool matched {}. Integrity error!".format(pool))
                raise(e)
        

    def handle(self, *args, **options):
        for vehicle in settings.VEHICLES:
            self.check_vehicle(vehicle)
