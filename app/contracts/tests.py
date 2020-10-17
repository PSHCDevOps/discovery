from test import cases as case
from test import fixtures as data

from django.core.management import call_command


class ContractsTest(case.RequestTestCase):

    fixtures = data.get_vendor_fixtures()


    def test_load(self):
        #call_command('load_fpds', id=89, period=52, load=52, pause=0, max=1)
        pass

    #PSS related (5-D SYSTEMS, INC) both mentioned below.
    def test_csv_found_1(self):
        # self.validated_path('/csv/contracts/090213369') 
        pass
            
    def test_csv_found_2(self):
        # self.validated_path('/csv/contracts/090213369', **{
        #     'naics': '541330',
        #     'memberships': 'GS23F0322N',
        #     'countries': 'USA',
        #     'states': 'DC'
        # })
        pass
