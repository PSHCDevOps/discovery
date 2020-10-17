from django.test import tag

from test import cases as case
from test import fixtures as data

## 

@tag('membership')
class MembershipTest(case.APITestCase, metaclass = case.MetaAPISchema):
    
    fixtures = data.get_vendor_fixtures()
    schema = {
            'object': {
                'tags': ('membership_object',),
                '&97': ('piid', 'exact', 'GS00Q14OADU307'),
                '&97': ('piid', 'exact', 'GS00Q14OADU307'),
                '#ABCDEFG': ()
            },
            'ordering': {
                'tags': ('membership_ordering',),
                'fields': (
                    'id', 'piid', 
                    'vendor__duns', 'vendor__name', 
                    'pool__id', 'pool__name', 'pool__number', 'pool__threshold', 
                    'pool__vehicle__id', 'pool__vehicle__name'
                )
            },
            'pagination': {
                'tags': ('membership_pagination',),
                '@no_args': {},
                '@page': {'page': 5},
                '@count': {'count': 10},
                '@mixed': {'page': 3, 'count': 10}
            },
            'search': {
                'tags': ('membership_search',),
                '*search1': ('piid', 'exact', 'GS00Q14OADU305'),
                '@search2': ('vendor__name', 'exact', 'BALL AEROSPACE & TECHNOLOGIES CORPORATION')
            },
            'fields': {
                'id': {
                    'tags': ('membership_field', 'number'),
                    '@exact': 100,
                    '@lt': 250,
                    '@lte': 250, 
                    '@gt': 250, 
                    '@gte': 250,
                    '@range': (100, 200),
                    '@in': (100, 200, 300)
                },
                'piid': {
                    'tags': ('membership_field', 'fuzzy_text'),
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
                # 'expiration_8a_date': {
                #     'tags': ('membership_field', 'date_time'),
                #     '@date': '2022-07-19',
                #     '@year': '2017',
                #     '@month': '7',
                #     '@day': '19',
                #     '@week': '32',
                #     '@week_day': '3',
                #     '@quarter': '1'
                # },
                'pool__id': {
                    'tags': ('membership_field', 'token_text'),
                    '@exact': 'BMO_SB_10',
                    '@iexact': 'hcaTs_Sb_2',
                    '@in': ("BMO_8", "OASIS_4", "HCATS_SB_1")
                },
                'pool__name': {
                    'tags': ('membership_field', 'pool_field', 'fuzzy_text'),
                    '@exact': 'Elevator Maintenance',
                    '@iexact': 'janitoRial',
                    '@in': ("Roofing Services", "Plumbing and Pipefitting"),
                    '@contains': 'Waste',
                    '@icontains': 'energy engineering',
                    '@startswith': 'HVAC',
                    '@istartswith': 'hvac',
                    '@endswith': 'Maintenance',
                    '@iendswith': 'dEVelopment',
                    '@regex': '\d+$',
                    '@iregex': 'air.*development$'
                },
                'pool__number': {
                    'tags': ('membership_field', 'pool_field', 'token_text'),
                    '@exact': '8',
                    '@iexact': '9',
                    '@in': ('1', '3', '5B', '16')
                },
                'pool__threshold': {
                    'tags': ('membership_field', 'pool_field', 'fuzzy_text'),
                    '@exact': '$15 million',
                    '@iexact': '$7.5 MILLION',
                    '@in': ("1000 employee", "$18 million", "500 employee"),
                    '@contains': 'employee',
                    '@icontains': 'EmplOYeE',
                    '@startswith': '$38.5',
                    '@istartswith': '$38.5',
                    '@endswith': 'million',
                    '@iendswith': 'MillIon',
                    '@regex': '^\d+\s+',
                    '@iregex': '(500 EMPLOYEE|MILLION)'
                },
                'pool__vehicle__id': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'token_text'),
                    '@exact': 'BMO_SB',
                    '@iexact': 'hcaTs_Sb',
                    '@in': ("BMO", "OASIS", "HCATS_SB")
                },
                'pool__vehicle__name': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'fuzzy_text'),
                    '@exact': 'HCATS Small Business',
                    '@iexact': 'hcats small business',
                    '@in': ("BMO Small Business", "OASIS Unrestricted"),
                    '@contains': 'OASIS',
                    '@icontains': 'bmo',
                    '@startswith': 'HCATS',
                    '@istartswith': 'hcats',
                    '@endswith': 'Business',
                    '@iendswith': 'unrestricted',
                    # '@regex': 'Prof.*$',
                    # '@iregex': 'prof.*$'
                },
                'pool__vehicle__poc': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'fuzzy_text'),
                    '@exact': 'oasis@gsa.gov',
                    '@iexact': 'OASIS@GSA.GOV',
                    '@in': ("oasis@gsa.gov", "sbhcats@gsa.gov", "fssi.bmo@gsa.gov"),
                    # '@contains': 'professionalservices',
                    # '@icontains': 'ProfessionalServices',
                    '@startswith': 'oasis',
                    '@istartswith': 'OASIS',
                    '@endswith': 'gsa.gov',
                    '@iendswith': 'GSA.GOV',
                    '@regex': '\.gov$',
                    '@iregex': '(OASIS|HCATS)'
                },
                'pool__vehicle__ordering_guide': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'fuzzy_text'),
                    '@exact': 'https://www.gsa.gov/buying-selling/products-services/professional-services/buy-services/oasis/how-to-use-oasis',
                    '@iexact': 'https://www.gsa.gov/buying-selling/products-services/professional-services/buy-services/oasis/how-to-use-oasis',
                    '@in': ("https://www.gsa.gov/buying-selling/products-services/professional-services/buy-services/oasis/how-to-use-oasis",
                        "https%3A%2F%2Fwww.gsa.gov%2Fbuying-selling%2Fproducts-services%2Fprofessional-services%2Fbuy-services%2Foasis%2Fhow-to-use-oasis"),
                    '@contains': 'oasis',
                    '@icontains': 'oasis',
                    '@startswith': 'https',
                    '@istartswith': 'https',
                    '@endswith': 'how-to-use-oasis',
                    '@iendswith': 'how-to-use-oasis',
                    '@regex': '(oasis|HCaTS)',
                    '@iregex': '(oasis|hcats)'
                },
                'pool__vehicle__small_business': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'boolean'),
                    '[1]@exact': True,
                    '[2]@exact': False,
                },
                'pool__vehicle__numeric_pool': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'boolean'),
                    '[1]@exact': True,
                    '[2]@exact': False,
                },
                'pool__vehicle__display_number': {
                    'tags': ('membership_field', 'pool_field', 'vehicle_field', 'boolean'),
                    '[1]@exact': True,
                    '[2]@exact': False,
                },
                'pool__naics__code': {
                    'tags': ('membership_field', 'pool_field', 'naics_field', 'fuzzy_text'),
                    '@exact': '541330',
                    '@iexact': '561710',
                    '@in': ("541711", "238290", "561730"),
                    '@contains': '622',
                    '@icontains': '622',
                    '@startswith': '54',
                    '@istartswith': '2382',
                    '@endswith': '30',
                    '@iendswith': '30',
                    '@regex': '^54\d+0$',
                    '@iregex': '^(23|56)'
                },
                'pool__naics__description': {
                    'tags': ('membership_field', 'pool_field', 'naics_field', 'fuzzy_text'),
                    '@exact': 'Outdoor Advertising',
                    '@iexact': 'meDIA representatives',
                    '@in': ("Payroll Services", "Commissioning Services", "Testing Laboratories"),
                    '@contains': 'Accounting',
                    '@icontains': 'heating',
                    '@startswith': 'Engineering',
                    '@istartswith': 'r',
                    '@endswith': 'Services',
                    '@iendswith': 'advertIsing',
                    '@regex': 'Services$',
                    '@iregex': 'environment(al)?'
                },
                'pool__psc__code': {
                    'tags': ('membership_field', 'pool_field', 'psc_field', 'fuzzy_text'),
                    '@exact': 'R413',
                    '@iexact': 'r413',
                    '@in': ("S202", "Z1DZ", "R413"),
                    '@contains': 'R4',
                    '@icontains': 'r4',
                    '@startswith': 'R',
                    '@istartswith': 'r',
                    '@endswith': '06',
                    '@iendswith': '06',
                    '@regex': '[^\d]+$',
                    '@iregex': '^(r|s)'
                },
                'pool__psc__description': {
                    'tags': ('membership_field', 'pool_field', 'psc_field', 'fuzzy_text'),
                    '@exact': 'Advertising Services',
                    '@iexact': 'advertising services',
                    '@in': ("Advertising Services", "Aircraft Components / Accessories"),
                    '@contains': 'Services',
                    '@icontains': 'services',
                    '@startswith': 'Logistics',
                    '@istartswith': 'logisticS',
                    '@endswith': 'Services',
                    '@iendswith': 'SERVICES',
                    '@regex': '[/]+',
                    '@iregex': '^air(craft)?'
                },
                'setasides__code': {
                    'tags': ('membership_field', 'setaside_field', 'token_text'),
                    '@exact': 'QF',
                    '@iexact': 'a2',
                    '@in': ('XX', 'A5', '27')
                },
                'setasides__name': {
                    'tags': ('membership_field', 'setaside_field', 'token_text'),
                    '@exact': 'WO',
                    '@iexact': 'hubz',
                    '@in': ('8(A)', 'SDVO', 'HubZ')
                },
                'setasides__description': {
                    'tags': ('membership_field', 'setaside_field', 'fuzzy_text'),
                    '@exact': 'Veteran Owned',
                    '@iexact': 'hubzone',
                    '@in': ("8(A)", "Woman Owned", "Small Disadvantaged Business"),
                    '@contains': 'Disadvantaged',
                    '@icontains': 'woman',
                    '@startswith': '8',
                    '@istartswith': 'hu',
                    '@endswith': 'Owned',
                    '@iendswith': 'owned',
                    '@regex': '^\d+',
                    '@iregex': 'Vet(eran)?'
                },
                'setasides__far_order': {
                    'tags': ('membership_field', 'setaside_field', 'number'),
                    '@exact': 3,
                    '@lt': 4,
                    '@lte': 4, 
                    '@gt': 3, 
                    '@gte': 3,
                    '@range': (2, 5),
                    '@in': (2, 3, 5)
                },
                'zones__id': {
                    'tags': ('membership_field', 'zone_field', 'number'),
                    '@exact': 2,
                    '@lt': 4,
                    '@lte': 4, 
                    '@gt': 3, 
                    '@gte': 3,
                    '@range': (2, 5),
                    '@in': (2, 3, 5)
                },
                'zones__states__code': {
                    'tags': ('membership_field', 'zone_field', 'token_text'),
                    '@exact': 'PA',
                    '@iexact': 'mE',
                    '@in': ('PA', 'NC', 'TX', 'NY')
                },
                'contacts__name': {
                    'tags': ('membership_field', 'contact_field', 'fuzzy_text'),
                    '@exact': 'Ken Scott',
                    '@iexact': 'Ken Scott',
                    '@in': ("Ken Scott", "Ken Scott"),
                    '@contains': 'Taylor',
                    '@icontains': 'taylor',
                    # '@startswith': 'Ben',
                    # '@istartswith': 'ben',
                    '@endswith': 'Scott',
                    '@iendswith': 'scott',
                    '@regex': '^[A-Za-z]{4}\s+',
                    '@iregex': '^da(n|na)'
                },
                'contacts__order': {
                    'tags': ('membership_field', 'contact_field', 'number'),
                    '@exact': 1,
                    '@lt': 2,
                    '@lte': 2, 
                    '@gt': 1, 
                    '@gte': 1,
                    '@range': (1, 2),
                    '@in': (1, 2)
                },
                'contacts__phones__number': {
                    'tags': ('membership_field', 'contact_field', 'fuzzy_text'),
                    '@exact': '703-821-0678',
                    '@iexact': '703-821-0678',
                    '@in': ("703-821-0678", "571-262-3144", "937-912-6102"),
                    '@contains': '-882-',
                    '@icontains': '-882-',
                    '@startswith': '757',
                    '@istartswith': '757',
                    '@endswith': '6551',
                    '@iendswith': '6551',
                    '@regex': 'x\s*\d+$',
                    '@iregex': '(304|703)-\d{3}'
                },
                'contacts__emails__address': {
                    'tags': ('membership_field', 'contact_field', 'fuzzy_text'),
                    '@exact': 'OASIS@act-i.com',
                    '@iexact': 'oasis@act-i.com',
                    '@in': ("OASIS@act-i.com", "hcats_sb@deepmile.com", "Finance@exemplarent.com"),
                    '@contains': 'ibm',
                    '@icontains': 'IbM',
                    '@startswith': 'hcats',
                    '@istartswith': 'HcAtS',
                    '@endswith': 'com',
                    '@iendswith': 'cOM',
                    '@regex': '\d+',
                    '@iregex': '\.(com|net)$'
                },
                'vendor__name': {
                    'tags': ('membership_field', 'vendor_field', 'fuzzy_text'),
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
                    'tags': ('membership_field', 'vendor_field', 'number'),
                    '@exact': '097967608',
                    '@lt': '193460839',
                    '@lte': '193460839', 
                    '@gt': '193460839', 
                    '@gte': '193460839',
                    '@range': '074108176,196004394',
                    '@in': ('055124077', '838295400', '003184462')
                },
                # 'vendor__cage': {
                #     'tags': ('membership_field', 'vendor_field', 'token_text'),
                #     '@exact': '3A3Q8',
                #     '@iexact': '3A3Q8',
                #     '@in': ('4L767', '4SJK4', '4U825')
                # },
                'vendor__sam_status': {
                    'tags': ('membership_field', 'vendor_field', 'token_text'),
                    '@exact': 'ACTIVE',
                    '@iexact': 'active',
                    '@in': "ACTIVE"
                },
                # 'vendor__sam_activation_date': {
                #     'tags': ('membership_field', 'vendor_field', 'date_time'),
                #     '@date': '2018-02-08',
                #     '@year': '2018',
                #     '@month': '2',
                #     '@day': '9',
                #     '@week': '5',
                #     '@week_day': '2',
                #     '@quarter': '1'
                # },
                # 'vendor__sam_expiration_date': {
                #     'tags': ('membership_field', 'vendor_field', 'date_time'),
                #     '@date': '2019-02-08',
                #     '@year': '2019',
                #     '@month': '2',
                #     '@day': '9',
                #     '@week': '5',
                #     '@week_day': '3',
                #     '@quarter': '1'
                # },
                'vendor__sam_exclusion': {
                    'tags': ('membership_field', 'vendor_field', 'boolean'),
                    '-exact': True,
                    '@exact': False,
                },
                # 'vendor__sam_url': {
                #     'tags': ('membership_field', 'vendor_field', 'fuzzy_text'),
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
                #     'tags': ('membership_field', 'vendor_field', 'location_field', 'fuzzy_text'),
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
                    'tags': ('membership_field', 'vendor_field', 'location_field', 'fuzzy_text'),
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
                    'tags': ('membership_field', 'vendor_field', 'location_field', 'token_text'),
                    '@exact': 'DC',
                    '@iexact': 'dc',
                    '@in': ("DC","CA","TX","VA")
                },
                'vendor__sam_location__zipcode': {
                    'tags': ('membership_field', 'vendor_field', 'location_field', 'fuzzy_text'),
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
                    'tags': ('membership_field', 'vendor_field', 'location_field', 'token_text'),
                    '@exact': '07',
                    '@iexact': '07',
                    '@in': ("07", "04", "08", "01")
                }
            }
        }


    def initialize(self):
        self.router = 'memberships'
        
    def validate_object(self, resp, base_key = []):
        resp.is_not_empty(base_key + ['piid'])
        resp.is_not_empty(base_key + ['vendor', 'duns'])
        resp.is_not_empty(base_key + ['pool', 'id'])

