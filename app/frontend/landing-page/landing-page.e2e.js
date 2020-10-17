describe('Landing Page', function() {
	//var landing_page = require('../landing-page/landing-page-object.js');	
	var baseURL = browser.params.url;

	var discoveryLogo = element(by.css('.discovery-logo'));
	var discoveryLogoText = element(by.css('.discovery-logo >a >strong'));
	var homeLink = element(by.xpath('//span[text()="Home"]'));
	var advancedSearchLink = element(by.xpath('//span[text()="Advanced Search"]'));
	var aboutLink = element(by.xpath('//span[text()="About"]'));
	var contractsLink = element(by.xpath('//span[text()="Contracts"]'));
	var homePageTitle = element(by.css('.usa-hero-callout-alt'));
	var contractVehicles = element(by.css('.section-head'));
	var OASISvehicleLink = element(by.xpath('//h2[text()="OASIS"]'));
	var BMOvehicleLink = element(by.xpath('//h2[text()="BMO"]'));
	var HCATSvehicleLink = element(by.xpath('//h2[text()="HCaTS"]'));
	var ERMvehicleLink = element(by.xpath('//h2[text()="ERM"]'));
	var OASISvehicleLinkText = element(by.xpath('//h2[text()="OASIS"]/../p'));
	var BMOvehicleLinkText = element(by.xpath('//h2[text()="BMO"]/../p'));
	var HCATSvehicleLinkText = element(by.xpath('//h2[text()="HCaTS"]/../p'));
	var ERMvehicleLinkText = element(by.xpath('//h2[text()="ERM"]/../p'));
	var searchButton = element(by.css('.usa-search-submit-text'));
	var NAICSdropdown = element(by.css('[title="Choose search type"]'));
	var keywordsDropdown = element(by.css('#select2-keyword-container'));
	var needHelpFooter = element(by.xpath('//h3[text()="Need Help?"]'));
	var discoveryFooter = element(by.xpath('//h3[text()="Discovery"]'));
	var GSAtoolsFooter = element(by.xpath('//h3[text()="Other GSA Tools"]'));
	var opinionMatterFooter = element(by.xpath('//h3[text()="Your Opinion Matters!"]'));
	var aboutLinkFooter = element(by.xpath('//a[text()="About"]'));
	var searchLinkFooter = element(by.xpath('//a[text()="Advanced Search"]'));
	var contractsLinkFooter = element(by.xpath('//a[text()="Contracts"]'));
	var contactLinkFooter = element(by.xpath('//a[text()="Contact"]'));
	var CALCLinkFooter = element(by.xpath('//a[text()="CALC"]'));
	var AGLinkFooter = element(by.xpath('//a[text()="Acquisition Gateway "]'));
	var ITsolutionLinkFooter = element(by.xpath('//a[text()="IT Solutions Navigator"]'));
	var eLibraryLinkFooter = element(by.xpath('//a[text()="eLibrary"]'));
	
	verifyLinkInNewTab = function(link,url){
		  link.click();
		  browser.sleep(3000);
		  browser.getAllWindowHandles().then(function (handles) {
	             var newWindowHandle = handles[1];
	             browser.switchTo().window(newWindowHandle).then(function () {
	             browser.ignoreSynchronization = true;
	             expect(browser.getCurrentUrl()).toContain(url);
	             browser.driver.close().then(function () {
	                browser.switchTo().window(handles[0]);
	                browser.ignoreSynchronization = false;
	              });
	            });
	       });
	}
	
	verifyLink = function(link,url){
		 link.click();
		 expect(browser.getCurrentUrl()).toContain(url);
		 browser.navigate().back();
    }
	
	enterNAICs = function(NAICs){
		 keywordsDropdown.click();
		 element(by.xpath("//li[contains(text(),'"+NAICs+"')]")).click();
		 searchButton.click();
		 expect(browser.getCurrentUrl()).toContain('/search');;
		 browser.sleep(3000);
   }

	describe('Discovery Landing Page', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL);
			 browser.sleep(3000);
	     });
		 
		 it('should navigate to Discovery Landing Page', function(){
			 expect(discoveryLogo.isDisplayed()).toBe(true);
			 expect(discoveryLogoText.getText()).toEqual('DISCOVERY');
			 expect(homeLink.isDisplayed()).toBe(true);
			 expect(advancedSearchLink.isDisplayed()).toBe(true);
			 expect(aboutLink.isDisplayed()).toBe(true);
			 expect(contractsLink.isDisplayed()).toBe(true);
			 expect(homePageTitle.getText()).toEqual('Search by NAICS, PSC, or Keywords to compare contracts');		 
		 });
		 
		 it('should be able to click on links on Discovery Landing Page NavBar', function(){
			 verifyLink(advancedSearchLink, '/search');
			 verifyLink(aboutLink, '/about');
			 verifyLink(contractsLink, '/contracts');	 
		 });
		 
		 it('should display contract vehicles on Discovery Landing Page', function(){
			 expect(contractVehicles.getText()).toEqual('Contract Vehicles on Discovery');
			 expect(OASISvehicleLink.isDisplayed()).toBe(true);
			 expect(BMOvehicleLink.isDisplayed()).toBe(true);
			 expect(HCATSvehicleLink.isDisplayed()).toBe(true);
			 expect(ERMvehicleLink.isDisplayed()).toBe(true);
			 expect(OASISvehicleLinkText.getText()).toEqual('One Acquisition Solution for Integrated Service');
			 expect(BMOvehicleLinkText.getText()).toEqual('Building Maintenance and Operations');
			 expect(HCATSvehicleLinkText.getText()).toEqual('Human Capital and Training Solutions');
			 expect(ERMvehicleLinkText.getText()).toEqual('Electronic Records Management');
		 });
		 
		 it('should be able to click on contract vehicles link on Discovery Landing Page', function(){
			 verifyLink(OASISvehicleLink, '/oasis');
			 verifyLink(BMOvehicleLink, '/bmo');
			 verifyLink(HCATSvehicleLink, '/hcats');
			 verifyLink(ERMvehicleLinkText, '/erm');
		 });
		 
		 it('should display search box on Discovery Landing Page', function(){
			 expect(NAICSdropdown.isDisplayed()).toBe(true);
			 expect(keywordsDropdown.isDisplayed()).toBe(true);
			 expect(keywordsDropdown.getText()).toEqual('Enter your code or keywords...');
			 expect(searchButton.isDisplayed()).toBe(true);
			 expect(searchButton.getText()).toEqual('Search');
		 });
		 
		 it('should display footer on Discovery Landing Page', function(){
			 expect(needHelpFooter.isDisplayed()).toBe(true);
			 expect(discoveryFooter.isDisplayed()).toBe(true);
			 expect(GSAtoolsFooter.isDisplayed()).toBe(true);
			 expect(opinionMatterFooter.isDisplayed()).toBe(true);
		 });
		 
		 it('should display Discovery links on Discovery Landing Page', function(){
			 expect(aboutLinkFooter.isDisplayed()).toBe(true);
			 verifyLink(aboutLinkFooter, '/about');
			
			 expect(searchLinkFooter.isDisplayed()).toBe(true);
			 verifyLink(searchLinkFooter, '/search');
			
			 expect(contractsLinkFooter.isDisplayed()).toBe(true);
			 verifyLink(contractsLinkFooter, '/contracts');
			 
			 expect(contactLinkFooter.isDisplayed()).toBe(true);
		 });
		 
		 it('should display GSA Tools links on Discovery Landing Page', function(){
			 expect(CALCLinkFooter.isDisplayed()).toBe(true);
			 verifyLinkInNewTab(CALCLinkFooter,'https://calc.gsa.gov');			 
			 
			 expect(ITsolutionLinkFooter.isDisplayed()).toBe(true);
			 verifyLinkInNewTab(ITsolutionLinkFooter,'https://navigator.gsa.gov');
			 
			 expect(eLibraryLinkFooter.isDisplayed()).toBe(true);
			 verifyLinkInNewTab(eLibraryLinkFooter,'https://www.gsaelibrary.gsa.gov');
			 
			 expect(AGLinkFooter.isDisplayed()).toBe(true);			 
			 verifyLinkInNewTab(AGLinkFooter,'https://hallways.cap.gsa.gov');
		 });
		 
		 it('should display search results when user searches on Discovery Landing Page', function(){
			 browser.ignoreSynchronization = true;
			 enterNAICs("236220");
			 expect(element(by.xpath('(//*[@class="items-selected"])[2]/li')).getText()).toEqual('236220 - Commercial and Institutional Building Construction');
		 });
		 

	});
	

});