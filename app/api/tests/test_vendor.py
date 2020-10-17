from django.test import tag

from test import cases as case
from test import fixtures as data


@tag('vendor')
class VendorTest(case.APITestCase, metaclass = case.MetaAPISchema):
    
    fixtures = data.get_vendor_fixtures()
    schema = {
            'object': {
                'tags': ('vendor_object',),
                '&007901598': ('name', 'exact', 'BATTELLE MEMORIAL INSTITUTE'),
                '&001014182': ('name', 'exact', 'DYNAMICS RESEARCH CORPORATION'),
                '&001014182': ('name', 'exact', 'DYNAMICS RESEARCH CORPORATION'),
                '#345': (),
                '#ABCDEFG': ()
            },
            'ordering': {
                'tags': ('vendor_ordering',),
                'fields': (
                    'name', 'duns', 'cage', 
                    'sam_status', 'sam_exclusion', 'sam_url',
                    'sam_location__address', 'sam_location__city', 'sam_location__state', 
                    'sam_location__zipcode', 'sam_location__congressional_district',
                    'annual_revenue', 'number_of_employees', 'number_of_contracts'
                )
            },
            'pagination': {
                'tags': ('vendor_pagination',),
                '@no_args': {},
                '@page': {'page': 3},
                '@count': {'count': 10},
                '@mixed': {'page': 2, 'count': 10}
            },
            'search': {
                'tags': ('vendor_search',),
                '@search1': ('name', 'regex', 'SERVICES'),
                '*search2': ('duns', 'exact', '830333824'),
                '*search3': ('cage', 'exact', '3K773')
            },
            'fields': {
                'name': {
                    'tags': ('vendor_field', 'fuzzy_text'),
                    '*exact': 'DYNAMICS RESEARCH CORPORATION',
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
                'duns': {
                    'tags': ('vendor_field', 'number'),
                    '*exact': '097967608',
                    '@lt': '193460839',
                    '@lte': '193460839', 
                    '@gt': '193460839', 
                    '@gte': '193460839',
                    '@range': '074108176,196004394',
                    '@in': ('055124077', '838295400', '003184462')
                },
                # 'cage': {
                #     'tags': ('vendor_field', 'token_text'),
                #     '*exact': '3A3Q8',
                #     '*iexact': '3A3Q8',
                #     '@in': ('4L767', '4SJK4', '4U825')
                # },
                'sam_status': {
                    'tags': ('vendor_field', 'token_text'),
                    '@exact': 'ACTIVE',
                    '@iexact': 'active',
                    '@in': "ACTIVE"
                },
                # 'sam_activation_date': {
                #     'tags': ('vendor_field', 'date_time'),
                #     '@date': '2018-02-08',
                #     '@year': '2018',
                #     '@month': '2',
                #     '@day': '9',
                #     '@week': '5',
                #     '@week_day': '2',
                #     '@quarter': '1'
                # },
                # 'sam_expiration_date': {
                #     'tags': ('vendor_field', 'date_time'),
                #     '@date': '2019-02-08',
                #     '@year': '2019',
                #     '@month': '2',
                #     '@day': '9',
                #     '@week': '5',
                #     '@week_day': '3',
                #     '@quarter': '1'
                # },
                'sam_exclusion': {
                    'tags': ('vendor_field', 'boolean'),
                    '-exact': True,
                    '@exact': False,
                },
                'sam_url': {
                    'tags': ('vendor_field', 'fuzzy_text'),
                    # '@exact': 'http://www.act-corp.com',
                    # '@iexact': 'http://WWW.ACT-CORP.COM',
                    '@in': ("http://www.sainc.com", "https://www.atlasresearch.us"),
                    '@contains': 'sys',
                    '@icontains': 'SYS',
                    '@startswith': 'http://www.',
                    '@istartswith': 'HTTP://WWW.',
                    '@endswith': '.com',
                    '@iendswith': '.COM',
                    '@regex': '\d+',
                    '@iregex': 'www\.[^\.]+\.com'
                },
                # 'sam_location__address': {
                #     'tags': ('vendor_field', 'location_field', 'fuzzy_text'),
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
                'sam_location__city': {
                    'tags': ('vendor_field', 'location_field', 'fuzzy_text'),
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
                'sam_location__state': {
                    'tags': ('vendor_field', 'location_field', 'token_text'),
                    '@exact': 'DC',
                    '@iexact': 'dc',
                    '@in': ("DC","CA","TX","VA")
                },
                'sam_location__zipcode': {
                    'tags': ('vendor_field', 'location_field', 'fuzzy_text'),
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
                'sam_location__congressional_district': {
                    'tags': ('vendor_field', 'location_field', 'token_text'),
                    '@exact': '07',
                    '@iexact': '07',
                    '@in': ("07", "04", "08", "01")
                },
                'pools__pool__id': {
                    'tags': ('vendor_field', 'membership_field', 'token_text'),
                    '@exact': 'BMO_SB_10',
                    '@iexact': 'hcaTs_Sb_2',
                    '@in': ("BMO_8", "OASIS_4", "HCATS_SB_1")
                },
                'pools__piid': {
                    'tags': ('vendor_field', 'membership_field', 'fuzzy_text'),
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
                # 'pools__expiration_8a_date': {
                #     'tags': ('vendor_field', 'membership_field', 'date_time'),
                #     '@date': '2022-07-19',
                #     '@year': '2017',
                #     '@month': '7',
                #     '@day': '19',
                #     '@week': '32',
                #     '@week_day': '3',
                #     '@quarter': '1'
                # },
                'pools__pool__name': {
                    'tags': ('vendor_field', 'membership_field', 'pool_field', 'fuzzy_text'),
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
                'pools__pool__number': {
                    'tags': ('vendor_field', 'membership_field', 'pool_field', 'token_text'),
                    '@exact': '8',
                    '@iexact': '9',
                    '@in': ('1', '3', '5B', '16')
                },
                'pools__pool__threshold': {
                    'tags': ('vendor_field', 'membership_field', 'pool_field', 'fuzzy_text'),
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
                'pools__setasides__code': {
                    'tags': ('vendor_field', 'membership_field', 'setaside_field', 'token_text'),
                    '@exact': 'QF',
                    '@iexact': 'a2',
                    '@in': ('XX', 'A5', '27')
                },
                'pools__setasides__name': {
                    'tags': ('vendor_field', 'membership_field', 'setaside_field', 'token_text'),
                    '@exact': 'WO',
                    '@iexact': 'hubz',
                    '@in': ('8(A)', 'SDVO', 'HubZ')
                },
                'pools__setasides__description': {
                    'tags': ('vendor_field', 'membership_field', 'setaside_field', 'fuzzy_text'),
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
                'pools__setasides__far_order': {
                    'tags': ('vendor_field', 'membership_field', 'setaside_field', 'number'),
                    '@exact': 3,
                    '@lt': 4,
                    '@lte': 4, 
                    '@gt': 3, 
                    '@gte': 3,
                    '@range': (2, 5),
                    '@in': (2, 3, 5)
                },
                'pools__zones__id': {
                    'tags': ('vendor_field', 'membership_field', 'zone_field', 'number'),
                    '@exact': 2,
                    '@lt': 4,
                    '@lte': 4, 
                    '@gt': 3, 
                    '@gte': 3,
                    '@range': (2, 5),
                    '@in': (2, 3, 5)
                },
                # 'pools__contacts__name': {
                #     'tags': ('vendor_field', 'membership_field', 'contact_field', 'fuzzy_text'),
                #     '@exact': 'Ken Scott',
                #     '@iexact': 'daniel eke', #pss contractor name
                #     '@in': ("Ken Scott", "Daniel Eke"),
                #     '@contains': 'Taylor',
                #     '@icontains': 'taylor',
                #     '@startswith': 'Ben',
                #     '@istartswith': 'ben',
                #     '@endswith': 'Scott',
                #     '@iendswith': 'scott',
                #     '@regex': '^[A-Za-z]{4}\s+',
                #     '@iregex': '^da(n|na)'
                # },
                'pools__contacts__order': {
                    'tags': ('vendor_field', 'membership_field', 'contact_field', 'number'),
                    '@exact': 1,
                    '@lt': 2,
                    '@lte': 2, 
                    '@gt': 1, 
                    '@gte': 1,
                    '@range': (1, 2),
                    '@in': (1, 2)
                }
            }
            # 'requests': {
            #     '@membership1': {
            #         'tags': ('vendor_request',),
            #         'params': {'membership': '(pool__vehicle__id=BMO)&(setasides__code=A6)&(setasides__code=XX)'},
            #         'tests': (
            #             ('pools__pool__vehicle__id', 'exact', 'BMO'),
            #             ('pools__setasides__code', 'in', ('A6', 'XX')),
            #         )
            #     }  
            # }
        }


    def initialize(self):
        self.router = 'vendors'
        
    def validate_object(self, resp, base_key = []):
        resp.is_not_empty(base_key + ['name'])
        resp.is_int(base_key + ['duns'])
        resp.is_int(base_key + ['duns_4'])
                
        if resp.check('is_not_in', base_key + ['duns'], ('614155380', '614155380', '614155380', '614155380')):
            resp.is_not_empty(base_key + ['cage'])
            resp.is_not_empty(base_key + ['sam_status'])
            resp.is_not_none(base_key + ['sam_exclusion'])
            resp.is_not_empty(base_key + ['sam_activation_date'])
            resp.is_not_empty(base_key + ['sam_expiration_date'])
