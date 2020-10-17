from django.test import tag

from test import cases as case
from test import fixtures as data


@tag('contract')
class ContractTest(case.APITestCase, metaclass = case.MetaAPISchema): 
    
    fixtures = data.get_contract_fixtures()
    schema = {
        'object': {
            'tags': ('contract_object',),
            '&828': ('name', 'exact', 'USZA2202D0015_0194'),
            '&828': ('name', 'exact', 'USZA2202D0015_0194'),
            '&828': ('name', 'exact', 'USZA2202D0015_0194'),
            '#345C': (),
            '#ABCDEFG': ()
        },
        'ordering': {
            'tags': ('contract_ordering',),
            'fields': (
                'id', 'piid', 'base_piid',
                'agency__id', 'agency__name', 
                'NAICS', 'PSC',
                'date_signed', 'completion_date', 'obligated_amount',
                'vendor__duns', 'vendor__cage', 'vendor__name',
                'point_of_contact', 'vendor_phone',
                'vendor_location__address', 
                'vendor_location__city', 
                'vendor_location__state', 
                'vendor_location__zipcode', 
                'vendor_location__congressional_district', 
                'status__name', 'pricing_type__name',
                'place_of_performance__country_code', 'place_of_performance__country_name',
                'place_of_performance__state',
                'annual_revenue', 'number_of_employees'
            )
        },
        'pagination': {
            'tags': ('contract_pagination',),
            '@no_args': {},
            '@page': {'page': 3},
            '@count': {'count': 10},
            '@mixed': {'page': 2, 'count': 10}
        },
        'search': {
            'tags': ('contract_search',),
            '*search1': ('piid', 'iexact', 'DAAE0703CL525'),
            '@search2': ('agency__name', 'iregex', 'NUCLEAR REGULATORY COMMISSION')
        },
        'fields': {
            # 'id': {
            #     'tags': ('contract_field', 'number'),
            #     '*exact': 256,
            #     '@lt': 500,
            #     '@lte': 500, 
            #     '@gt': 250, 
            #     '@gte': 250,
            #     # '@range': (50, 100),
            #     '@in': (2, 3, 5)
            # },
            # 'piid': {
            #     'tags': ('contract_field', 'fuzzy_text'),
            #     '*exact': 'FA700014D0006_0002',
            #     '*iexact': 'fa700014d0006_0002',
            #     '@in': ('W9128F11A0021_0001', 'W912DY10A0005_0002', 'EPW13024_0009'),
            #     '@contains': 'D0002',
            #     '@icontains': 'd0002',
            #     '@startswith': 'FA',
            #     '@istartswith': 'fa',
            #     '@endswith': '_0002',
            #     '@iendswith': '03c00003',
            #     '@regex': '\d+_\d+',
            #     '@iregex': '[0-9]{3}cl001'
            # },
            # 'base_piid': {
            #     'tags': ('contract_field', 'fuzzy_text'),
            #     '@exact': 'INP16PC00395',
            #     '@iexact': 'inP16pc00395',
            #     '@in': ('N0001412C0203', 'W912DY10A0005', 'EPW13024'),
            #     '@contains': 'A016',
            #     '@icontains': 'a016',
            #     '@startswith': 'GS',
            #     '@istartswith': 'gs',
            #     '@endswith': 'PC00395',
            #     '@iendswith': 'pc00395',
            #     '@regex': '[A-Z]+\d+',
            #     '@iregex': '[a-z]{4}[0-9]{4}cl001'
            # },
            'agency__id': {
                'tags': ('contract_field', 'agency_field', 'token_text'),
                '@exact': '8000',
                '@iexact': '8000',
                '@in': ('8000', '6800', '2050')
            },
            'agency__name': {
                'tags': ('contract_field', 'agency_field', 'fuzzy_text'),
                '@exact': 'INTERNAL REVENUE SERVICE',
                '@iexact': 'Internal Revenue Service',
                '@in': ('INTERNAL REVENUE SERVICE', 'CONSUMER FINANCIAL PROTECTION BUREAU', 'FEDERAL ACQUISITION SERVICE'),
                '@contains': 'ACQUISITION',
                '@icontains': 'acquisition',
                '@startswith': 'DEPT',
                '@istartswith': 'dept',
                '@endswith': 'GUARD',
                '@iendswith': 'guard',
                '@regex': '^[A-Z]{4}',
                '@iregex': 'office\s+'
            },
            'NAICS': {
                'tags': ('contract_field', 'fuzzy_text'),
                '@exact': '541330',
                '@iexact': '541712',
                '@in': ("541711", "238290", "561730"),
                '@contains': '622',
                '@icontains': '622',
                '@startswith': '54',
                '@istartswith': '2382',
                '@endswith': '611',
                '@iendswith': '611',
                '@regex': '^\d+622',
                '@iregex': '^(23|56)'
            },
            # 'PSC': {
            #     'tags': ('contract_field', 'fuzzy_text'),
            #     '@exact': 'U099',
            #     '@iexact': 'ad26',
            #     '@in': ("U099", "AD260", "R425"),
            #     '@contains': '707',
            #     '@icontains': 'ad',
            #     # '@startswith': 'R',
            #     # '@istartswith': 'r',
            #     '@endswith': '2',
            #     '@iendswith': 'z',
            #     '@regex': '[^\d]+$',
            #     '@iregex': '^(u0|ad)'
            # },
            'date_signed': {
                'tags': ('contract_field', 'date_time'),
                '@date': '2016-05-17',
                '@year': '2007',
                '@month': '7',
                '@day': '9',
                '@week': '5',
                '@week_day': '2',
                '@quarter': '2'
            },
            # 'completion_date': {
            #     'tags': ('contract_field', 'date_time'),
            #     '@date': '2010-10-08',
            #     '@year': '2012',
            #     '@month': '5',
            #     '@day': '10',
            #     '@week': '23',
            #     '@week_day': '4',
            #     '@quarter': '3'
            # },
            'obligated_amount': {
                'tags': ('contract_field', 'number'),
                '@exact': 150000,
                '@lt': 0,
                '@lte': 10000, 
                '@gt': 100000, 
                '@gte': 200000,
                '@range': (50000, 500000),
                # '@in': (162340, -43000, 416700)
            },
            'point_of_contact': {
                'tags': ('contract_field', 'fuzzy_text'),
                '@exact': 'PADDS.W31P4Q@KO.ARMY.MIL',
                '@iexact': 'padds.w31P4Q@KO.army.mil',
                '@in': ("PADDS.W31P4Q@KO.ARMY.MIL", "USERCW@SA5700.FA8604", "MARASHULTZ@GSA.GOV"),
                '@contains': 'GSA',
                '@icontains': 'gsa',
                '@startswith': 'USER',
                '@istartswith': 'user',
                '@endswith': 'FA8602',
                '@iendswith': 'mil',
                '@regex': '\d+$',
                '@iregex': '\.[a-z]+\d+$'
            },
            # 'vendor_phone': {
            #     'tags': ('contract_field', 'fuzzy_text'),
            #     '@exact': '702-816-5088',
            #     '@iexact': '702-816-5088',
            #     '@in': ("702-816-5088", "571-482-2501", "404-315-1940"),
            #     '@contains': '-262-',
            #     '@icontains': '-262-',
            #     '@startswith': '505',
            #     '@istartswith': '703',
            #     '@endswith': '7637',
            #     '@iendswith': '6767',
            #     '@regex': '^\d{3}-255-\d{4}$',
            #     '@iregex': '(571|202)-\d{3}'
            # },
            'status__code': {
                'tags': ('contract_field', 'status_field', 'token_text'),
                '@exact': 'C1',
                '@iexact': 'c1',
                '@in': ('A', 'C2', 'X', 'F')
            },
            'status__name': {
                'tags': ('contract_field', 'status_field', 'fuzzy_text'),
                '@exact': 'Completed',
                '@iexact': 'currEnt',
                '@in': ("Current", "Completed", "Close out"),
                '@contains': 'plete',
                '@icontains': 'PLETE',
                '@startswith': 'C',
                '@istartswith': 'c',
                '@endswith': 'ent',
                '@iendswith': 'ED',
                '@regex': '(Current|Completed)',
                '@iregex': '(current|completed)'
            },
            'pricing_type__code': {
                'tags': ('contract_field', 'pricing_field', 'token_text'),
                '@exact': 'Y',
                '@iexact': 'u',
                '@in': ('M', '3', 'K', 'Z')
            },
            'pricing_type__name': {
                'tags': ('contract_field', 'pricing_field', 'fuzzy_text'),
                '@exact': 'Firm Fixed Price',
                '@iexact': 'firm fixed price',
                '@in': ("Firm Fixed Price", "Time and Materials"),
                '@contains': 'Price',
                '@icontains': 'price',
                '@startswith': 'Cost',
                '@istartswith': 'cost',
                '@endswith': 'Fee',
                '@iendswith': 'fee',
                '@regex': '^Fixed\s+',
                '@iregex': '^fixed\s+'
            },
            'place_of_performance__country_code': {
                'tags': ('contract_field', 'placeofperformance_field', 'location_field', 'token_text'),
                '@exact': 'USA',
                '@iexact': 'usa',
                '@in': ("USA","JPN","MDA","GBR")
            },
            'place_of_performance__country_name': {
                'tags': ('contract_field', 'placeofperformance_field', 'location_field', 'fuzzy_text'),
                '@exact': 'United States',
                '@iexact': 'united states',
                '@in': ("United States","United Kingdom"),
                '@contains': 'United',
                '@icontains': 'united',
                '@startswith': 'G',
                '@istartswith': 'g',
                '@endswith': 'ia',
                '@iendswith': 'IA',
                '@regex': '^United (States|Kingdom)$',
                '@iregex': '^united (states|kingdom)$'
            },
            'place_of_performance__state': {
                'tags': ('contract_field', 'placeofperformance_field', 'location_field', 'token_text'),
                '@exact': 'DC',
                '@iexact': 'dc',
                '@in': ("DC","CA","TX","VA")
            },
            'place_of_performance__zipcode': {
                'tags': ('contract_field', 'placeofperformance_field', 'location_field', 'fuzzy_text'),
                '@exact': '20190',
                '@iexact': '20190',
                '@in': ("20190", "93033", "22102"),
                '@contains': '210',
                '@icontains': '210',
                '@startswith': '35',
                '@istartswith': '35',
                '@endswith': '710',
                '@iendswith': '710',
                '@regex': '^[13579]+',
                '@iregex': '^[13579]+'
            },
            # 'vendor_location__address': {
            #     'tags': ('contract_field', 'location_field', 'fuzzy_text'),
            #     '@exact': '7000 Muirkirk Meadows Dr',
            #     '@iexact': '7000 muirkirk meadows dr',
            #     '@in': ("1002 Explorer Blvd", "8600 Boeing Dr"),
            #     '@contains': 'South',
            #     '@icontains': 'dEErfield pOnd',
            #     '@startswith': '6710',
            #     '@istartswith': '6710 ro',
            #     '@endswith': 'Ave',
            #     '@iendswith': 'ave',
            #     '@regex': 'Ste \d+$',
            #     '@iregex': 'ste \d+$'
            # },
            'vendor_location__city': {
                'tags': ('contract_field', 'location_field', 'fuzzy_text'),
                '@exact': 'Carlisle',
                '@iexact': 'arlington',
                '@in': ("Atlanta", "Reston", "Northville"),
                '@contains': 'vill',
                '@icontains': 'on',
                '@startswith': 'Mc',
                '@istartswith': 'mc',
                '@endswith': 'ville',
                '@iendswith': 'DA',
                '@regex': 'Springs',
                '@iregex': 'TOWN'
            },
            'vendor_location__state': {
                'tags': ('contract_field', 'location_field', 'token_text'),
                '@exact': 'DC',
                '@iexact': 'dc',
                '@in': ("DC","CA","TX","VA")
            },
            # 'vendor_location__zipcode': {
            #     'tags': ('contract_field', 'location_field', 'fuzzy_text'),
            #     '@exact': '20190',
            #     '@iexact': '20190',
            #     '@in': ("20190", "93033", "22102"),
            #     '@contains': '210',
            #     '@icontains': '210',
            #     '@startswith': '35',
            #     '@istartswith': '35',
            #     '@endswith': '710',
            #     '@iendswith': '710',
            #     '@regex': '^[13579]+',
            #     '@iregex': '^[13579]+'
            # },
            'vendor_location__congressional_district': {
                'tags': ('contract_field', 'location_field', 'token_text'),
                '@exact': '07',
                '@iexact': '07',
                '@in': ("07", "04", "08", "01")
            },      
            'vendor__name': {
                'tags': ('contract_field', 'vendor_field', 'fuzzy_text'),
                '@exact': 'DYNAMICS RESEARCH CORPORATION',
                '@iexact': 'native energy & technology, inc.',
                '@in': ('ENGILITY CORPORATION', 'CBRE', 'POWERTRAIN'),
                '@contains': 'RESEARCH',
                '@icontains': 'technologies',
                '@startswith': 'M',
                '@istartswith': 'applied',
                '@endswith': 'LLC',
                '@iendswith': 'llc',
                '@regex': '\d+',
                '@iregex': 'inc\.?$'
            },
            'vendor__duns': {
                'tags': ('contract_field', 'vendor_field', 'number'),
                '@exact': '097967608',
                '@lt': '193460839',
                '@lte': '193460839', 
                '@gt': '193460839', 
                '@gte': '193460839',
                '@range': '074108176,196004394',
                '@in': ('055124077', '838295400', '003184462')
            },
            # 'vendor__cage': {
            #     'tags': ('contract_field', 'vendor_field', 'token_text'),
            #     '@exact': '3A3Q8',
            #     '@iexact': '3A3Q8',
            #     '@in': ('4L767', '4SJK4', '4U825')
            # },
            'vendor__sam_status': {
                'tags': ('contract_field', 'vendor_field', 'token_text'),
                '@exact': 'ACTIVE',
                '@iexact': 'active',
                '@in': "ACTIVE"
            },
            # 'vendor__sam_activation_date': {
            #     'tags': ('contract_field', 'vendor_field', 'date_time'),
            #     '@date': '2018-02-08',
            #     '@year': '2018',
            #     '@month': '2',
            #     '@day': '9',
            #     '@week': '5',
            #     '@week_day': '2',
            #     '@quarter': '1'
            # },
            # 'vendor__sam_expiration_date': {
            #     'tags': ('contract_field', 'vendor_field', 'date_time'),
            #     '@date': '2019-02-08',
            #     '@year': '2019',
            #     '@month': '2',
            #     '@day': '9',
            #     '@week': '5',
            #     '@week_day': '3',
            #     '@quarter': '1'
            # },
            'vendor__sam_exclusion': {
                'tags': ('contract_field', 'vendor_field', 'boolean'),
                '-exact': True,
                '@exact': False,
            },
            # 'vendor__sam_url': {
            #     'tags': ('contract_field', 'vendor_field', 'fuzzy_text'),
            #     '@exact': 'http://www.act-corp.com',
            #     '@iexact': 'http://WWW.ACT-CORP.COM',
            #     '@in': ("http://www.sainc.com", "https://www.atlasresearch.us"),
            #     '@contains': 'sys',
            #     '@icontains': 'SYS',
            #     '@startswith': 'http://www.',
            #     '@istartswith': 'HTTP://WWW.',
            #     '@endswith': '.com',
            #     '@iendswith': '.COM',
            #     '@regex': '\d+',
            #     '@iregex': 'www\.[^\.]+\.com'
            # },
            # 'vendor__sam_location__address': {
            #     'tags': ('contract_field', 'vendor_field', 'location_field', 'fuzzy_text'),
            #     '@exact': '7000 Muirkirk Meadows Dr',
            #     '@iexact': '7000 muirkirk meadows dr',
            #     '@in': ("1002 Explorer Blvd", "8600 Boeing Dr"),
            #     '@contains': 'South',
            #     '@icontains': 'dEErfield pOnd',
            #     '@startswith': '7500',
            #     '@istartswith': '6710 ro',
            #     '@endswith': 'Ave',
            #     '@iendswith': 'ave',
            #     '@regex': 'Ste \d+$',
            #     '@iregex': 'ste \d+$'
            # },
            'vendor__sam_location__city': {
                'tags': ('contract_field', 'vendor_field', 'location_field', 'fuzzy_text'),
                '@exact': 'Carlisle',
                '@iexact': 'arlington',
                '@in': ("Atlanta", "Reston", "Northville"),
                '@contains': 'vill',
                '@icontains': 'on',
                '@startswith': 'Mc',
                '@istartswith': 'mc',
                '@endswith': 'ville',
                '@iendswith': 'DA',
                '@regex': 'Springs',
                '@iregex': 'TOWN'
            },
            'vendor__sam_location__state': {
                'tags': ('contract_field', 'vendor_field', 'location_field', 'token_text'),
                '@exact': 'DC',
                '@iexact': 'dc',
                '@in': ("DC","CA","TX","VA")
            },
            'vendor__sam_location__zipcode': {
                'tags': ('contract_field', 'vendor_field', 'location_field', 'fuzzy_text'),
                '@exact': '20190',
                '@iexact': '20190',
                '@in': ("20190", "93033", "22102"),
                '@contains': '210',
                '@icontains': '210',
                '@startswith': '35',
                '@istartswith': '35',
                '@endswith': '710',
                '@iendswith': '710',
                '@regex': '^[13579]+',
                '@iregex': '^[13579]+'
            },
            'vendor__sam_location__congressional_district': {
                'tags': ('contract_field', 'vendor_field', 'location_field', 'token_text'),
                '@exact': '07',
                '@iexact': '07',
                '@in': ("07", "04", "08", "01")
            },
            'vendor__pools__piid': {
                'tags': ('contract_field', 'vendor_field', 'membership_field', 'fuzzy_text'),
                '@exact': 'GS00Q14OADU208',
                '@iexact': 'gs00Q14Oadu208',
                '@in': ("GS00Q14OADU343", "GS02Q16DCR0086"),
                '@contains': 'OAD',
                '@icontains': 'Oad',
                '@startswith': 'GS02',
                '@istartswith': 'gs02',
                '@endswith': '102',
                '@iendswith': 's102',
                '@regex': '^GS\d+',
                '@iregex': '^(gs06|gs00)'
            },
            # 'vendor__pools__expiration_8a_date': {
            #     'tags': ('contract_field', 'vendor_field', 'membership_field', 'date_time'),
            #     '@date': '2022-07-19',
            #     '@year': '2017',
            #     '@month': '7',
            #     '@day': '19',
            #     '@week': '32',
            #     '@week_day': '3',
            #     '@quarter': '1'
            # }
        }
    }
        
    def initialize(self):
        self.router = 'contracts'
        
    def validate_object(self, resp, base_key = []):
        resp.is_int(base_key + ['id'])
        resp.is_not_empty(base_key + ['piid'])
        resp.is_not_empty(base_key + ['agency_id'])
        resp.is_not_empty(base_key + ['agency_name'])
        resp.is_not_empty(base_key + ['date_signed'])
        resp.is_float(base_key + ['obligated_amount'])
        
        resp.is_not_empty(base_key + ['vendor', 'name'])
        resp.is_int(base_key + ['vendor', 'duns'])
