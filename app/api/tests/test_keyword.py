from django.test import tag

from test import cases as case
from test import fixtures as data


@tag('keyword')
class KeywordTest(case.APITestCase, metaclass = case.MetaAPISchema):
    
    fixtures = data.get_category_fixtures()
    schema = {
        'object': {
            'tags': ('keyword_object',),
            '&118': ('id', 'exact', 118),
            '&420': ('id', 'exact', 420),
            '&842': ('id', 'exact', 842),
            '#77777777': (),
            '#ABCDEFG': ()
        },
        'ordering': {
            'tags': ('keyword_ordering',),
            'fields': ('id', 'name', 'calc', 'parent__id', 'sin__code', 'naics__code', 'psc__code')
        },
        'pagination': {
            'tags': ('keyword_pagination',),
            '@no_args': {},
            '!page': {'page': 1000},
            '@count': {'count': 2},
            '@mixed': {'page': 15, 'count': 3}
        },
        'search': {
            'tags': ('keyword_search',),
            '@search1': ('name', 'iregex', 'Services'),
            '@search2': ('name', 'iregex', 'Inspection'),
            '-search3': ('code', 'regex', '0000000000000')
        },
        'fields': {
            'id': {
                'tags': ('keyword_field', 'number'),
                '@exact': 54,
                '@lt': 500,
                '@lte': 500, 
                '@gt': 500, 
                '@gte': 500,
                '@range': (100, 300),
                '@in': (43, 3, 54)
            },
            # 'parent__id': {
            #     'tags': ('keyword_field', 'number'),
            #     '@exact': 43,
            #     '@lt': 500,
            #     '@lte': 500, 
            #     '@gt': 500, 
            #     '@gte': 500,
            #     '@range': (100, 300),
            #     '@in': (43, 326, 568)
            # },
            'name': {
                'tags': ('keyword_field', 'fuzzy_text'),
                '@exact': 'Disaster Management',
                '@iexact': 'disaster MANAGEMENT',
                '@in': ("Inventory Management", "Disaster Management"),
                '@contains': 'Processing',
                '@icontains': 'processing',
                '@startswith': 'Integrated',
                '@istartswith': 'INTEGRATED',
                '@endswith': 'Services',
                '@iendswith': 'services',
                '@regex': '[/]+',
                '@iregex': 'clearing(house)'
            },
            'calc': {
                'tags': ('keyword_field', 'fuzzy_text'),
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
            },
            # 'sin__code': {
            #     'tags': ('keyword_field', 'sin_field', 'fuzzy_text'),
            #     '@exact': '736-3',
            #     '@iexact': '595-10',
            #     '@in': ("736-3", "520-14", "541-4G", "595-11"),
            #     '@contains': '5-1',
            #     '@icontains': '6-3',
            #     '@startswith': '736',
            #     '@istartswith': '595',
            #     '@endswith': '11',
            #     '@iendswith': '-3',
            #     '@regex': '736\-\d+',
            #     '@iregex': '\d+\-10'
            # },
            'naics__code': {
                'tags': ('keyword_field', 'naics_field', 'fuzzy_text'),
                '@exact': '611430',
                '@iexact': '611430',
                '@in': ("611430", "238290"),
                '@contains': '1143',
                '@icontains': '1143',
                '@startswith': '611',
                '@istartswith': '61',
                '@endswith': '430',
                '@iendswith': '30',
                '@regex': '^6(11|12)430$',
                '@iregex': '^(611|615)'
            },
            'naics__description': {
                'tags': ('keyword_field', 'naics_field', 'fuzzy_text'),
                '@exact': 'Professional and Management Development Training',
                '@iexact': 'professional and management development training',
                '@in': ("Professional and Management Development Training", "Testing Laboratories"),
                '@contains': 'Management',
                '@icontains': 'development',
                '@startswith': 'Professional',
                '@istartswith': 'PROFESSIONAL',
                '@endswith': 'Training',
                '@iendswith': 'training',
                '@regex': '^Professional.*Training',
                '@iregex': '^professional.*training'
            },
            # 'psc__code': {
            #     'tags': ('keyword_field', 'psc_field', 'fuzzy_text'),
            #     '@exact': 'R699',
            #     '@iexact': 'r699',
            #     '@in': ("R699", "Z1DZ"),
            #     '@contains': '69',
            #     '@icontains': 'r69',
            #     '@startswith': 'R6',
            #     '@istartswith': 'r6',
            #     '@endswith': '99',
            #     '@iendswith': '699',
            #     '@regex': 'R\d+$',
            #     '@iregex': '^R(69|79)9'
            # },
            # 'psc__description': {
            #     'tags': ('keyword_field', 'psc_field', 'fuzzy_text'),
            #     '@exact': 'Other Administrative Support Services',
            #     '@iexact': 'other administrative support services',
            #     '@in': ("Other Administrative Support Services", "Aircraft Components / Accessories"),
            #     '@contains': 'Administrative',
            #     '@icontains': 'ADMINISTRATIVE',
            #     '@startswith': 'Other',
            #     '@istartswith': 'other',
            #     '@endswith': 'Services',
            #     '@iendswith': 'services',
            #     '@regex': 'Admin(istrative)?',
            #     '@iregex': 'admin(istrative)?'
            # }
        }
    }
    
    def initialize(self):
        self.router = 'keywords'
        
    def validate_object(self, resp, base_key = []):
        resp.is_not_empty(base_key + ['id'])
        resp.is_not_empty(base_key + ['name'])
        resp.is_not_empty(base_key + ['calc'])
