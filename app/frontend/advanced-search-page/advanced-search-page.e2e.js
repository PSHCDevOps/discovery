describe('Advanced Search Page', function() {
	
	var baseURL =  browser.params.url;

	describe('Discovery Advanced Search Page', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL);
			 browser.sleep(3000);
	     });
		 
		 it('should navigate to Discovery Advanced Search Page', function(){
			 advancedSearchLink.click();
			 expect(filtersIcon.isDisplayed()).toBe(true);
			 expect(keywordsFilter.isDisplayed()).toBe(true);
			 expect(keywordsFilter.getAttribute("aria-expanded")).toEqual("true");
			 expect(NAICsFilter.isDisplayed()).toBe(true);
			 expect(NAICsFilter.getAttribute("aria-expanded")).toEqual("false");
			 expect(PSCsFilter.isDisplayed()).toBe(true);
			 expect(PSCsFilter.getAttribute("aria-expanded")).toEqual("false");
			 expect(contractVehiclesFilter.isDisplayed()).toBe(true);
			 expect(contractVehiclesFilter.getAttribute("aria-expanded")).toEqual("false");
			 expect(serviceCategoriesFilter.isDisplayed()).toBe(true);
			 expect(serviceCategoriesFilter.getAttribute("aria-expanded")).toEqual("false");
			 expect(smallBusinessFilter.isDisplayed()).toBe(true);
			// expect(smallBusinessFilter.getAttribute("aria-expanded")).toEqual("false");
			 expect(zoneFilter.isDisplayed()).toBe(true);
			// expect(zoneFilter.getAttribute("aria-expanded")).toEqual("false");
		 });
		 
		 it('should not show any results when user navigates to Discovery Advanced Search Page', function(){
			 expect(iconArrowLeft.isDisplayed()).toBe(true);
			 expect(searchText.isDisplayed()).toBe(true);
			 expect(searchText.getText()).toEqual('Choose your filters and submit your search to begin.');
		 });	
		 
	});
	
	describe('Results On Discovery Advanced Search Page For Keywords', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL + '/search');
			 browser.sleep(3000);
	     });
		 
		 
		 it('should search by Keywords', function(){
			 var keyword='Classroom Training';
//			 expect(element(by.css('[aria-controls="filter-naics"]')).getAttribute('aria-expanded')).toEqual('false');
//			 if(element(by.css('[aria-controls="filter-naics"]')).getAttribute('aria-expanded')=="false"){
//				 element(by.css('[aria-controls="filter-naics"]')).click();
//			 }
			 selectKeyword(keyword);
		 });
		 
		 it('should display search results by Keywords', function(){			 
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);		 
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('37');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('35');	
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Keywords 2', function(){
			 var keyword='E-mail Marketing';
			 selectKeyword(keyword);
		 });
		 
		 it('should display search results by Keywords 2', function(){			 
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('keywords=77610&vehicles=HCATS__HCATS_SB__OASIS__OASIS_SB');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[4]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('36');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('44');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('44');	
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('45');
			 resetButton.click();
			 browser.sleep(3000);
			 

		 });
		 
	});
	
	describe('Results On Discovery Advanced Search Page For NAICs', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL + '/search');
			 browser.sleep(3000);
	     });
		 
		 it('should search by NAICs', function(){
			 var NAICs='541214 - Payroll Services';
			 selectNAICs(NAICs);
		 });
		 
		 it('should display search results by NAICs', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=OASIS__OASIS_SB&naics=541214');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('40');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('25');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
	});
	
	describe('Results On Discovery Advanced Search Page For Contract Vehicle', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL + '/search');
			 browser.sleep(3000);
	     });
		 
		 it('should search by Contract Vehicle BMO SB', function(){
			 var vehicle='BMO_SB';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle BMO SB', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=BMO_SB');			
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('50');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Contract Vehicle BMO', function(){
			 var vehicle='BMO';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle BMO', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=BMO');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('15');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Contract Vehicle ERM', function(){
			 var vehicle='ERM';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle ERM', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=ERM');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('46');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Contract Vehicle HCATS SB', function(){
			 var vehicle='HCATS_SB';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle HCATS SB', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=HCATS_SB');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('63');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Contract Vehicle HCATS', function(){
			 var vehicle='HCATS';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle HCATS', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=HCATS');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('49');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Contract Vehicle OASIS SB', function(){
			 var vehicle='OASIS_SB';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle OASIS SB', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=OASIS_SB');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('158');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
		 it('should search by Contract Vehicle OASIS', function(){
			 var vehicle='OASIS';
			 selectContractVehicle(vehicle);
		 });
		 
		 it('should display search results by Contract Vehicle OASIS', function(){
			 browser.ignoreSynchronization = true;
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('vehicles=OASIS');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('77');
			 resetButton.click();
			 browser.sleep(3000);
		 });
		 
	});
		
	describe('Results On Discovery Advanced Search Page For Small Business Designation', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL + '/search');
			 browser.sleep(3000);
	     });
		 
		 it('should search by Small Business 8(A) and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('8(A)');
		 });
		 
		 it('should search by HUBZone and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('HUBZone');
		 });
		 
		 it('should search by Small Business and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('SB');
		 });
		 
		 it('should search by Small Disadvantaged Business and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('SDB');
		 });
		 
		 it('should search by Small Disabled Vet Owned and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('SDVO');
		 });
		 
		 it('should search by Veterans VIP and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('VIP');
		 });
		 
		 it('should search by Veterans Owned and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('VO');
		 });
		 
		 it('should search by Woman Owned and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.css("#sbd-button")));
			 selectSBdesignation('WO');
		 });
	});
	
	describe('Results On Discovery Advanced Search Page For Zones', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL + '/search');
			 browser.sleep(3000);
	     });
		 
		 it('should search by Zone 1 and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//*[@id='filter-zone']/../button")));
			 selectZone('Zone 1');
		 });
		 
		 it('should search by Zone 2 and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//*[@id='filter-zone']/../button")));
			 selectZone('Zone 2');
		 });
		 
		 it('should search by Zone 3 and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//*[@id='filter-zone']/../button")));
			 selectZone('Zone 3');
		 });
		 
		 it('should search by Zone 4 and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//*[@id='filter-zone']/../button")));
			 selectZone('Zone 4');
		 });
		 
		 it('should search by Zone 5 and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//*[@id='filter-zone']/../button")));
			 selectZone('Zone 5');
		 });
		 
		 it('should search by Zone 6 and display results', function(){
			 browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//*[@id='filter-zone']/../button")));
			 selectZone('Zone 6');
		 });

	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var advancedSearchLink = element(by.xpath('//span[text()="Advanced Search"]'));
	var filtersIcon = element(by.xpath('//discovery-choose-filters/*[@id="choose-filters"]'));
	var keywordsFilter = element(by.xpath('//button[contains(text(),"Keywords")]'));
	var NAICsFilter = element(by.xpath('//button[contains(text(),"NAICs")]'));
	var PSCsFilter = element(by.xpath('//button[contains(text(),"PSCs")]'));
	var contractVehiclesFilter = element(by.xpath('//button[contains(text(),"Contract Vehicles")]'));
	var serviceCategoriesFilter = element(by.xpath('//button[contains(text(),"Service Categories")]'));
	var smallBusinessFilter = element(by.xpath('//button[contains(text(),"Small Business")]'));
	var zoneFilter = element(by.xpath('//button[contains(text(),"Zone")]'));
	
	var keywordsDropdown = element(by.css('#filter-keywords-autocomplete'));
	var NAICsDropdown = element(by.css('#filter-naics-autocomplete'));
	var PSCsDropdown = element(by.css('#filter-pscs-autocomplete'));
	var selectedItem = element(by.xpath('//ul[@class="items-selected"]/li')); 
	var removeSelectedItem = element(by.xpath('//ul[@class="items-selected"]//a'));
	var submitButton = element(by.xpath('(//button[text()=" Submit "])[1]'));
	var resetButton = element(by.xpath('(//button[text()=" Reset "])[1]'));
	
	var iconArrowLeft = element(by.css('#choose-filters .icon-arrow-left'));
	var searchText = element(by.css('#choose-filters >h2'));
	
	selectKeyword = function(keyword){
		 keywordsDropdown.click();
		 element(by.css('.select2-search__field')).sendKeys(keyword);
		 browser.actions().sendKeys(protractor.Key.ENTER).perform();
		 expect(selectedItem.getText()).toEqual(keyword);
		 expect(removeSelectedItem.isDisplayed()).toBe(true);
		 submitButton.click();
	}
	
	selectNAICs = function(NAICs){
		 element(by.css('[aria-controls="filter-naics"]')).click();
		 NAICsDropdown.click();
		 element(by.css('.select2-search__field')).sendKeys(NAICs);
		 browser.actions().sendKeys(protractor.Key.ENTER).perform();
		 expect(selectedItem.getText()).toEqual(NAICs);
		 expect(removeSelectedItem.isDisplayed()).toBe(true);
		 submitButton.click();
	}
	
	selectPSCs = function(PSCs){
		 element(by.css('[aria-controls="filter-pscs"]')).click();
		 PSCsDropdown.click();
		 element(by.css('.select2-search__field')).sendKeys(PSCs);
		 browser.actions().sendKeys(protractor.Key.ENTER).perform();
		 expect(selectedItem.getText()).toEqual(PSCs);
		 expect(removeSelectedItem.isDisplayed()).toBe(true);
		 submitButton.click();
	}
	
	selectContractVehicle = function(vehicle){
		 element(by.css('[aria-controls="filter-vehicles"]')).click();
		 element(by.css("[for='filter-vehicles-"+vehicle+"']")).click();
		 submitButton.click();
	}

	selectSBdesignation = function(SB){

		switch (SB) {
		case '8(A)':
			 element(by.css('#sbd-button')).click();
			 element(by.css("[for='filter-sbd-A6']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=A6');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('7');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('2');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('15');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('30');
			 resetButton.click();
			 browser.sleep(3000);
			break;
		case 'HUBZone':
			 element(by.css("[for='filter-sbd-XX']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=XX');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('7');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('5');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('4');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('4');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		case 'SB':
			 element(by.css("[for='filter-sbd-SB']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=SB');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('50');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('40');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('158');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		case 'SDB':
			 element(by.css("[for='filter-sbd-27']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(5000);
			 expect(browser.getCurrentUrl()).toContain('setasides=27');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('31');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('18');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('12');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		case 'SDVO':
			 element(by.css("[for='filter-sbd-QF']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=QF');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('10');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('5');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('13');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('30');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		case 'VIP':
			 element(by.css("[for='filter-sbd-VIP']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=VIP');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('9');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('6');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		case 'VO':
			 element(by.css("[for='filter-sbd-A5']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=A5');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('10');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('9');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('18');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('30');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		case 'WO':
			 element(by.css("[for='filter-sbd-A2']")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('setasides=A2');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('14');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('13');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('25');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('29');
			 resetButton.click();
			 browser.sleep(3000);
			 break;
		}
		
	}
	
	selectZone = function(Zone){

		switch (Zone) {
		case 'Zone 1':
			 element(by.xpath("//*[@id='filter-zone']/../button")).click();
			 //select option from drop down
			 element(by.css('#select_zone')).sendKeys('Zone 1 (DE, MD, NJ, NY, PA, VA)');
			 browser.actions().mouseMove(element(by.xpath("//*[@id='filter-zone']//button"))).perform();
			 element(by.xpath("//*[@id='filter-zone']//button")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('zone=1');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[5])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[6])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[7])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('40');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('9');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[5]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[6]")).getText()).toContain('158');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[7]")).getText()).toContain('75');
			 resetButton.click();
			 browser.sleep(5000);
			break;
		case 'Zone 2':
			 element(by.css('#select_zone')).sendKeys('Zone 2 (CT, MA, ME, NH, RI, VT)');
			 //browser.actions().mouseMove(element(by.xpath("//*[@id='filter-zone']//button"))).perform();
			 element(by.css('#sbd-button')).click();
			 element(by.xpath("//*[@id='filter-zone']//button")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('zone=2');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[5])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[6])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[7])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('17');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('7');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[5]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[6]")).getText()).toContain('158');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[7]")).getText()).toContain('75');
			 resetButton.click();
			 browser.sleep(5000);
			break;
		case 'Zone 3':
			 element(by.css('#select_zone')).sendKeys('Zone 3 (FL, GA, NC, SC)');
			 element(by.css('#sbd-button')).click();
			 element(by.xpath("//*[@id='filter-zone']//button")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('zone=3');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[5])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[6])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[7])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('24');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('8');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[5]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[6]")).getText()).toContain('158');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[7]")).getText()).toContain('75');
			 resetButton.click();
			 browser.sleep(5000);
			break;
		case 'Zone 4':
			 element(by.css('#select_zone')).sendKeys('Zone 4 (OK, TX)');
			 element(by.css('#sbd-button')).click();
			 element(by.xpath("//*[@id='filter-zone']//button")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('zone=4');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[5])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[6])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[7])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('23');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('8');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[5]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[6]")).getText()).toContain('158');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[7]")).getText()).toContain('75');
			 resetButton.click();
			 browser.sleep(5000);
			break;
		case 'Zone 5':
			 element(by.css('#select_zone')).sendKeys('Zone 5 (CA, NV)');
			 element(by.css('#sbd-button')).click();
			 element(by.xpath("//*[@id='filter-zone']//button")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('zone=5');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[5])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[6])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[7])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('20');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('7');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[5]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[6]")).getText()).toContain('158');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[7]")).getText()).toContain('75');
			 resetButton.click();
			 browser.sleep(5000);
			break;
		case 'Zone 6':
			 element(by.css('#select_zone')).sendKeys('Zone 6 (IA, IL, KS, MO, NE)');
			 element(by.css('#sbd-button')).click();
			 element(by.xpath("//*[@id='filter-zone']//button")).click();
			 submitButton.click();			 
			 browser.ignoreSynchronization = true;		
			 browser.sleep(3000);
			 expect(browser.getCurrentUrl()).toContain('zone=6');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[2])[1]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[3])[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[4])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[5])[1]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[6])[1]")).getText()).toContain('OASIS Small Business');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[7])[1]")).getText()).toContain('OASIS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('17');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('6');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[3]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[4]")).getText()).toContain('63');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[5]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[6]")).getText()).toContain('158');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[7]")).getText()).toContain('75');
			 resetButton.click();
			 browser.sleep(5000);
			break;
		}
		
		
	}

});