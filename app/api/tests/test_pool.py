from django.test import tag

from test import cases as case
from test import fixtures as data


@tag('pool')
class PoolTest(case.APITestCase, metaclass = case.MetaAPISchema):
  
    fixtures = data.get_category_fixtures()
    schema = {
        'object': {
            'tags': ('pool_object',),
            '&HCATS_1': ('name', 'iexact', 'HCATS Pool 1'),
            '&BMO_4': ('name', 'iexact', 'Electrical Maintenance'),
            '&OASIS_SB_4': ('name', 'iexact', 'Scientific Research and Development'),
            '#345': (),
            '#ABCDEFG': ()
        },
        'ordering': {
            'tags': ('pool_ordering',),
            'fields': ('id', 'name', 'number', 'threshold', 'vehicle__id', 'vehicle__name')
        },
        'pagination': {
            'tags': ('pool_pagination',),
            '@no_args': {},
            '!page': {'page': 15},
            '@count': {'count': 3},
            '@mixed': {'page': 2, 'count': 3}
        },
        'search': {
            'tags': ('pool_search',),
            '*search1': ('id', 'exact', 'BMO_SB_3'),
            '@search2': ('number', 'regex', '2')
        },
        'fields': {
            'id': {
                'tags': ('pool_field', 'token_text'),
                '*exact': 'BMO_SB_10',
                '*iexact': 'hcaTs_Sb_2',
                '@in': ("BMO_8", "OASIS_4", "HCATS_SB_1")
            },
            'name': {
                'tags': ('pool_field', 'fuzzy_text'),
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
            'number': {
                'tags': ('pool_field', 'token_text'),
                '@exact': '8',
                '@iexact': '9',
                '@in': ('1', '3', '5B', '16')
            },
            'threshold': {
                'tags': ('pool_field', 'fuzzy_text'),
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
            'vehicle__id': {
                'tags': ('pool_field', 'vehicle_field', 'token_text'),
                '@exact': 'BMO_SB',
                '@iexact': 'hcaTs_Sb',
                '@in': ("BMO", "OASIS", "HCATS_SB")
            },
            'vehicle__name': {
                'tags': ('pool_field', 'vehicle_field', 'fuzzy_text'),
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
            # 'vehicle__tier__number': {
            #     'tags': ('pool_field', 'vehicle_field', 'tier_field', 'number'),
            #     '@exact': 3,
            #     '@lt': 3,
            #     '@lte': 2, 
            #     '@gt': 2, 
            #     '@gte': 2,
            #     '@range': (2, 3),
            #     '@in': (1, 2, 3)
            # },
            # 'vehicle__tier__name': {
            #     'tags': ('pool_field', 'vehicle_field', 'tier_field', 'fuzzy_text'),
            #     '@exact': 'Multi-Agency Solutions',
            #     '@iexact': 'multi-agency solutions',
            #     '@in': ("Multi-Agency Solutions", "Best-in-Class (BIC)"),
            #     '@contains': 'Agency',
            #     '@icontains': 'agency',
            #     '@startswith': 'Multi',
            #     '@istartswith': 'multi',
            #     # '@endswith': 'Solutions',
            #     # '@iendswith': 'solutions',
            #     '@regex': 'Best-in-Class.*$',
            #     '@iregex': '(multi|class)'
            # },
            'vehicle__poc': {
                'tags': ('pool_field', 'vehicle_field', 'fuzzy_text'),
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
            'vehicle__ordering_guide': {
                'tags': ('pool_field', 'vehicle_field', 'fuzzy_text'),
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
            'vehicle__small_business': {
                'tags': ('pool_field', 'vehicle_field', 'boolean'),
                '[1]@exact': True,
                '[2]@exact': False,
            },
            'vehicle__numeric_pool': {
                'tags': ('pool_field', 'vehicle_field', 'boolean'),
                '[1]@exact': True,
                '[2]@exact': False,
            },
            'vehicle__display_number': {
                'tags': ('pool_field', 'vehicle_field', 'boolean'),
                '[1]@exact': True,
                '[2]@exact': False,
            },
            'naics__code': {
                'tags': ('pool_field', 'naics_field', 'fuzzy_text'),
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
            'naics__description': {
                'tags': ('pool_field', 'naics_field', 'fuzzy_text'),
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
            # 'naics__sin__code': {
            #     'tags': ('pool_field', 'naics_field', 'sin_field', 'fuzzy_text'),
            #     '@exact': '100-03',
            #     '@iexact': 'c871-202',
            #     '@in': ("100-03", "520-14", "541-4G", "51-B36-2A"),
            #     '@contains': '4B',
            #     '@icontains': '-4b',
            #     '@startswith': '51',
            #     '@istartswith': 'c132',
            #     '@endswith': '03',
            #     '@iendswith': '2a',
            #     '@regex': '[A-Z]\d+\-\d+$',
            #     '@iregex': '^(C87|51)'
            # },
            'psc__code': {
                'tags': ('pool_field', 'psc_field', 'fuzzy_text'),
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
            'psc__description': {
                'tags': ('pool_field', 'psc_field', 'fuzzy_text'),
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
            # 'psc__sin__code': {
            #     'tags': ('pool_field', 'psc_field', 'sin_field', 'fuzzy_text'),
            #     '@exact': '520-19', #pss
            #     '@iexact': 'c871-202',
            #     '@in': ("100-03", "520-14", "541-4G", "51-B36-2A"),
            #     '@contains': '1-5',
            #     '@icontains': 'c54',
            #     '@startswith': '51',
            #     '@istartswith': 'c5',
            #     '@endswith': 'C',
            #     '@iendswith': 'c',
            #     '@regex': '[A-Z]\d+\-\d+$',
            #     '@iregex': '^(C87|51)'
            # },
            'keywords__id': {
                'tags': ('pool_field', 'keyword_field', 'number'),
                '@exact': 54,
                '@lt': 500,
                '@lte': 500, 
                '@gt': 500, 
                '@gte': 500,
                '@range': (100, 300),
                '@in': (43, 3, 54)
            },
            # 'keywords__parent__id': {
            #     'tags': ('pool_field', 'keyword_field', 'number'),
            #     '@exact': 43,
            #     '@lt': 500,
            #     '@lte': 500, 
            #     '@gt': 500, 
            #     '@gte': 500,
            #     '@range': (100, 300),
            #     '@in': (43, 326, 568)
            # },
            'keywords__name': {
                'tags': ('pool_field', 'keyword_field', 'fuzzy_text'),
                '@exact': 'Disaster Management',
                '@iexact': 'disaster MANAGEMENT',
                '@in': ("Inventory Management", "Disaster Management"),
                '@contains': 'Processing',
                '@icontains': 'processing',
                '@startswith': 'Integrated',
                '@istartswith': 'INTEGRATED',
                '@endswith': 'Services',
                '@iendswith': 'services',
                # '@regex': '[/]+',
                # '@iregex': 'clearing(house)'
            },
            'keywords__calc': {
                'tags': ('pool_field', 'keyword_field', 'fuzzy_text'),
                '@exact': 'Logistician',
                '@iexact': 'logisticIAN',
                '@in': ("Clerk", "Logistician"),
                '@contains': 'Res',
                '@icontains': 'res',
                '@startswith': 'Consult',
                '@istartswith': 'consult',
                '@endswith': 'Analyst',
                '@iendswith': 'analyst',
                '@regex': '(Business|Data)\s+Analyst',
                '@iregex': '^(business|data)'
            }
        }
    }
        
    
    def initialize(self):
        self.router = 'pools'
        
    def validate_object(self, resp, base_key = []):
        resp.is_not_empty(base_key + ['id'])
        resp.is_not_empty(base_key + ['name'])
        resp.is_not_empty(base_key + ['number'])
        resp.is_not_empty(base_key + ['vehicle'])
        #resp.is_not_empty(base_key + ['threshold'])
        resp.is_not_empty(base_key + ['naics'])
        #resp.is_not_empty(base_key + ['psc'])
