describe('Vendors Page', function() {
	
	var baseURL = browser.params.url;

	var advancedSearchLink = element(by.xpath('//span[text()="Advanced Search"]'));	
	var vendorsTab = element(by.xpath('//h3[text()="Vendors"]'));
	var vendorsPageTitle = element(by.css('.usa-fieldset-inputs>legend'));
	var vendorsPageSelectedVehicle = element(by.xpath('//*[@name="sort_by"]/../label'));
	var showSBDbutton = element(by.xpath('//button[text()=" Show Small Business Designation "]'));
	var downloadVendorDataLink = element(by.xpath('//a[text()=" Download vendor data(CSV)"]'));
	var vendorsTable = element(by.css('.usa-table-borderless>tbody'));
	var vendorsTableRows = element.all(by.css('.usa-table-borderless>tbody>tr'));
	var submitButton = element(by.xpath('(//button[text()=" Submit "])[1]'));
	var contractHistoryTab = element(by.xpath('//h3[text()="Contract History"]'));
	var vendorDetailsTab = element(by.xpath('//h3[text()="Vendor Details"]'));
	var contractHistoryPageTitle1 = element(by.xpath('//discovery-tbl-contract-history//h3'));
	var contractHistoryPageTitle2 = element(by.xpath('//discovery-tbl-contract-history//em'));
	var downloadContractsDataLink = element(by.xpath('//a[text()=" Download contracts data(CSV)"]'));
	var contractHistoryTable = element(by.css('#overflow-contract-history'));
	var leftIcon = element(by.css('a>.icon-arrow-left'));
	var backToSearchLink = element(by.css('.pad-all>a'));
	var SAMregistration = element(by.xpath('//h6[text()="SAM Registration Expires on:"]'));
	var CAGEcode = element(by.xpath('//h6[text()="CAGE Code:"]'));
	var address = element(by.xpath('//h6[text()="Address:"]'));
	var DUNs = element(by.xpath('//h6[text()="DUNS:"]'));
	var vendorWebsite = element(by.xpath('//h6[text()="Vendor website:"]'));
	var showContractDetailsButton = element(by.xpath('//button[text()=" Show contract details "]'));
	var showSBDbyContractButton = element(by.xpath('//button[text()=" Show SBD by contract numbers "]'));
	var vendorDetailsTable = element(by.xpath('(//tbody)[2]'));	
	
	var needHelpFooter = element(by.xpath('//h3[text()="Need Help?"]'));
	var discoveryFooter = element(by.xpath('//h3[text()="Discovery"]'));
	var GSAtoolsFooter = element(by.xpath('//h3[text()="Other GSA Tools"]'));
	var opinionMatterFooter = element(by.xpath('//h3[text()="Your Opinion Matters!"]'));

	selectContractVehicle = function(vehicle){
		 element(by.css('[aria-controls="filter-vehicles"]')).click();
		 element(by.css("[for='filter-vehicles-"+vehicle+"']")).click();
		 submitButton.click();
		 browser.sleep(3000);
	}
	
	describe('Discovery Vendors Page', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL);
			 browser.sleep(3000);
	     });
		 
		 it('should navigate to Discovery ERM Vendors Page', function(){
			 advancedSearchLink.click();
			 selectContractVehicle('ERM');
			 browser.ignoreSynchronization = true;					 
			 vendorsTab.click();
			 browser.sleep(5000);
		 });	
		 
		 it('should display headers on ERM Vendors Page', function(){
			 expect(vendorsPageTitle.isDisplayed()).toBe(true);
			 expect(vendorsPageTitle.getText()).toContain('Showing all vendors based on your criteria for the following eligible contract:');
			 expect(vendorsPageSelectedVehicle.isDisplayed()).toBe(true);
			 expect(vendorsPageSelectedVehicle.getText()).toContain('Electronic Records Management');
			 expect(showSBDbutton.isDisplayed()).toBe(true);
			 expect(downloadVendorDataLink.isDisplayed()).toBe(true);
			 expect(vendorsTable.isDisplayed()).toBe(true);
		 });
		 
		 it('should display vendors table on ERM Vendors Page', function(){
			 expect(vendorsTable.isDisplayed()).toBe(true);
			 expect(vendorsTableRows.count()).toEqual(50);
		 });
		 
		 it('should display footer on Vendors Page', function(){
			 expect(needHelpFooter.isDisplayed()).toBe(true);
			 expect(discoveryFooter.isDisplayed()).toBe(true);
			 expect(GSAtoolsFooter.isDisplayed()).toBe(true);
			 expect(opinionMatterFooter.isDisplayed()).toBe(true);
		 });
		 
		 it('should navigate to Contract History Page', function(){
			 element(by.xpath('(//tbody/tr//td[2]/a)[1]')).getText().then(function(vendor){
				 element(by.xpath('(//tbody/tr//td[2]/a)[1]')).click();
				 browser.sleep(5000);
				 expect(element(by.css('.pad-all>h2')).getText()).toEqual(vendor);
			 });
		 });
		 
		 it('should display headers on Contract History Page', function(){
			 expect(leftIcon.isDisplayed()).toBe(true);
			 expect(backToSearchLink.isDisplayed()).toBe(true);
			 expect(backToSearchLink.getText()).toContain('Back to search results');
			 expect(contractHistoryPageTitle1.isDisplayed()).toBe(true);
			 expect(contractHistoryPageTitle1.getText()).toContain('Show vendor’s 5 year contract history based on the following filters:');
			 expect(contractHistoryPageTitle2.isDisplayed()).toBe(true);
			 expect(contractHistoryPageTitle2.getText()).toContain('Work performed by a vendor is often reported under a different NAICS code due to FPDS restrictions. Results by NAICS include contracts based on related PSC codes.');
			 expect(downloadContractsDataLink.isDisplayed()).toBe(true);
			 expect(contractHistoryTable.isDisplayed()).toBe(true);
		 });
		 
		 it('should navigate to Vendors Details Page', function(){
			 browser.ignoreSynchronization = true;					 
			 vendorDetailsTab.click();
			 browser.sleep(3000);
		 });
		 
		 it('should display headers on Vendors Details Page', function(){
			 expect(SAMregistration.isDisplayed()).toBe(true);
			 expect(CAGEcode.isDisplayed()).toBe(true);			 
			 expect(address.isDisplayed()).toBe(true);			
			 expect(DUNs.isDisplayed()).toBe(true);
			 expect(vendorWebsite.isDisplayed()).toBe(true);
			 expect(showContractDetailsButton.isDisplayed()).toBe(true);
			 expect(showSBDbyContractButton.isDisplayed()).toBe(true);
			 expect(vendorDetailsTable.isDisplayed()).toBe(true);
			 expect(element(by.xpath("//td/strong[text()='Electronic Records Management']")).isDisplayed()).toBe(true);
		 });
		 		 

	});
	

});