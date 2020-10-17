from django.test import tag

from test import cases as case
from test import fixtures as data


@tag('agency')
class AgencyTest(case.APITestCase, metaclass = case.MetaAPISchema):
    
    fixtures = data.get_contract_fixtures()
    schema = {
        'object': {
            'tags': ('agency_object',),
            '&1448': ('id', 'exact', '1448'),
            '&2700': ('id', 'exact', '2700'),
            '#77777777': (),
            '#ABCDEFG': ()
        },
        'ordering': {
            'tags': ('agency_ordering',),
            'fields': ('id', 'name')
        },
        'pagination': {
            'tags': ('agency_pagination',),
            '@no_args': {},
            '!page': {'page': 25},
            '@count': {'count': 2},
            '@mixed': {'page': 2, 'count': 2}
        },
        'search': {
            'tags': ('agency_search',),
            '@search1': ('id', 'regex', '1448'),
            '*search2': ('name', 'exact', 'NATIONAL AERONAUTICS AND SPACE ADMINISTRATION'),
            '-search3': ('id', 'regex', '0000000000000')
        },
        'fields': {
            'id': {
                'tags': ('agency_field', 'token_text'),
                '*exact': '7001',
                # '*iexact': '97as',
                # '@in': ('8300', '97AS', '777')
            },
            'name': {
                'tags': ('agency_field', 'fuzzy_text'),
                '*exact': 'FEDERAL ELECTION COMMISSION',
                '*iexact': 'federal election commission',
                '@in': ("8(A)", "VETERANS AFFAIRS, DEPARTMENT OF", "PUBLIC BUILDINGS SERVICE"),
                '@contains': 'STANDARDS',
                '@icontains': 'standards',
                '@startswith': 'FEDERAL',
                '@istartswith': 'federal',
                '@endswith': 'COMMISSION',
                '@iendswith': 'commission',
                '@regex': '(COMMISSION|BUREAU)',
                '@iregex': '(community|MEDicaid)? SERVICE'
            }
        }
    }


    def initialize(self):
        self.router = 'agencies'
        
    def validate_object(self, resp, base_key = []):
        resp.is_not_empty(base_key + ['id'])
        resp.is_not_empty(base_key + ['name'])
