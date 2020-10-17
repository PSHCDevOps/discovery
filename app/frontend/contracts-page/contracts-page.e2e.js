describe('Contracts Page', function() {
	
	var baseURL =  browser.params.url;
	
	describe('Discovery Contracts Page', function(){
		
		 beforeAll(function() {
			 browser.get(baseURL);
			 browser.sleep(3000);
	     });
		 
		 it('should navigate to Contracts Page', function(){
			 contractsLink.click();
			 expect(discoveryLogo.isDisplayed()).toBe(true);
			 expect(discoveryLogoText.getText()).toEqual('DISCOVERY');
			 expect(homeLink.isDisplayed()).toBe(true);
			 expect(advancedSearchLink.isDisplayed()).toBe(true);
			 expect(aboutLink.isDisplayed()).toBe(true);
			 expect(contractsLink.isDisplayed()).toBe(true);	 
		 });
		 
		 it('should display title on Contracts Page', function(){		
			 expect(contractsTitle.isDisplayed()).toBe(true);
			 expect(contractsTitle.getText()).toEqual('Contracts');
		 });
		 
		 it('should display all contracts on Contracts Page', function(){		
			 expect(contracts.count()).toEqual(5);
			 verifyContract('OASIS','One Acquisition Solution for Integrated Service');
			 verifyContract('BMO','Building Maintenance and Operations');
			 verifyContract('HCaTS','Human Capital and Training Solutions');
			 verifyContract('ERM','Electronic Records Management');
		 });
		 
		 it('should display footer on Contracts Page', function(){
			 expect(needHelpFooter.isDisplayed()).toBe(true);
			 expect(discoveryFooter.isDisplayed()).toBe(true);
			 expect(GSAtoolsFooter.isDisplayed()).toBe(true);
			 expect(opinionMatterFooter.isDisplayed()).toBe(true);
		 });
		 
		 it('should display Contract\'s Page for each contract', function(){		
			 navigateToContract('OASIS');
			 contractsPage('OASIS','One Acquisition Solution for Integrated Service');
			 browser.navigate().back();
			 
			 navigateToContract('BMO');
			 contractsPage('BMO','Building Maintenance and Operations');
			 browser.navigate().back();
			 
			 navigateToContract('HCaTS');
			 contractsPage('HCaTS','Human Capital and Training Solutions');
			 browser.navigate().back();
			 
			 navigateToContract('ERM');
			 contractsPage('ERM','Electronic Records Management');
			 browser.navigate().back();
		 });
		 
	});
	
	describe('Verify Pool Links For OASIS Contract Vehicle', function(){

		 it('should verify pool links on OASIS Contract Page', function(){
			 browser.get(baseURL + '/oasis');
			 browser.sleep(5000);
		 });	
		 
		 it('should display \'Management, Scientific, and Technical Services\' Pool', function(){
			 verifyOASISpools('1');
		 });
		 
		 it('should display \'Financial and Accounting Services\' Pool', function(){
			 verifyOASISpools('2');
		 });
		 
		 it('should display \'Military, Marine, and Energy Engineering\' Pool', function(){
			 verifyOASISpools('3');
		 });
		 
		 it('should display \'Scientific Research and Development\' Pool', function(){
			 verifyOASISpools('4');
		 });
		 
		 it('should display \'Aircraft Parts and Engines Research and Development\' Pool', function(){
			 verifyOASISpools('5');
		 });
		 
		 it('should display \'Space and Missiles Research and Development\' Pool', function(){
			 verifyOASISpools('6');
		 });
		 
		 it('should display \'Aircraft Research and Development\' Pool', function(){
			 verifyOASISpools('7');
		 });
	});
	
	describe('Verify Links For OASIS Contract Vehicle', function(){

		 it('should verify OASIS links', function(){
			 browser.get(baseURL + '/oasis');
			 verifyOASISLinks();
		 });
		 
	});
	
	describe('Verify Pool Links For HCATS Contract Vehicle', function(){

		 it('should verify pool links on HCATS Contract Page', function(){
			 browser.get(baseURL + '/hcats');
			 browser.sleep(5000);
		 });	
		 
		 it('should display \'HCATS Pool 1\' Pool', function(){
			 verifyHCATSpools('1');
		 });
		 
		 it('should display \'HCATS Pool 2\' Pool', function(){
			 verifyHCATSpools('2');
		 });
		 
	});
	
	describe('Verify Links For HCATS Contract Vehicle', function(){

		 it('should verify HCATS links', function(){
			 browser.get(baseURL + '/hcats');
			 verifyHCATSLinks();
		 });
		 
	});
	
	describe('Verify Pool Links For BMO Contract Vehicle', function(){

		 it('should verify pool links on BMO Contract Page', function(){
			 browser.get(baseURL +'/bmo');
			 browser.sleep(5000);
		 });	
		 
		 it('should display \'HVAC Maintenance\' Pool', function(){
			 verifyBMOpools('1');
		 });
		 
		 it('should display \'Plumbing and Pipefitting\' Pool', function(){
			 verifyBMOpools('2');
		 });
		 
		 it('should display \'Elevator Maintenance\' Pool', function(){
			 verifyBMOpools('3');
		 });
		 
		 it('should display \'Electrical Maintenance\' Pool', function(){
			 verifyBMOpools('4');
		 });
		 
		 it('should display \'Janitorial\' Pool', function(){
			 verifyBMOpools('5');
		 });
		 
		 it('should display \'Landscaping / Grounds Maintenance\' Pool', function(){
			 verifyBMOpools('6');
		 });
		 
		 it('should display \'Fire Alarm System Maintenance and Repair\' Pool', function(){
			 verifyBMOpools('7');
		 });
		 
		 it('should display \'Fire Supression System Preventative Maintenance and Repair Services\' Pool', function(){
			 verifyBMOpools('8');
		 });
		 
		 it('should display \'Roofing Services\' Pool', function(){
			 verifyBMOpools('9');
		 });
		 
		 it('should display \'Building Management Services\' Pool', function(){
			 verifyBMOpools('10');
		 });
		 
		 it('should display \'Architectural and Framework Building Maintenance Services\' Pool', function(){
			 verifyBMOpools('11');
		 });
		 
		 it('should display \'Commissioning Services\' Pool', function(){
			 verifyBMOpools('12');
		 });
		 
		 it('should display \'Elevator Inspection Services\' Pool', function(){
			 verifyBMOpools('13');
		 });
		 
		 it('should display \'Other Facility Management Related Services\' Pool', function(){
			 verifyBMOpools('14');
		 });
		 
		 it('should display \'Pest Control\' Pool', function(){
			 verifyBMOpools('15');
		 });
		 
		 it('should display \'Waste Management and Recycling Services\' Pool', function(){
			 verifyBMOpools('16');
		 });
		 
		 it('should display \'Cemetery Maintenance\' Pool', function(){
			 verifyBMOpools('17');
		 });
		 
	});
	
	describe('Verify Links For BMO Contract Vehicle', function(){

		 it('should verify BMO links', function(){
			 browser.get(baseURL + '/bmo');
			 verifyBMOLinks();
		 });
		 
	});
	
    describe('Verify Pool Links For ERM Contract Vehicle', function(){

		 it('should verify pool links on ERM Contract Page', function(){
			 browser.get(baseURL + '/erm');
			 browser.sleep(5000);
		 });	
		 
		 it('should display \'Desktop Applications\' Pool', function(){
			 verifyERMpools('1');
		 });
		 
		 it('should display \'Electronic Messages\' Pool', function(){
			 verifyERMpools('2');
		 });
		 
		 it('should display \'Social Media\' Pool', function(){
			 verifyERMpools('3');
		 });
		 
		 it('should display \'Cloud Services\' Pool', function(){
			 verifyERMpools('4');
		 });
		 
		 it('should display \'Websites\' Pool', function(){
			 verifyERMpools('5');
		 });
		 
		 it('should display \'Digital Media (Photo)\' Pool', function(){
			 verifyERMpools('6');
		 });
		 
		 it('should display \'Digital Media (Audio)\' Pool', function(){
			 verifyERMpools('7');
		 });
		 
		 it('should display \'Digital Media (Video)\' Pool', function(){
			 verifyERMpools('8');
		 });
		 
		 it('should display \'Databases\' Pool', function(){
			 verifyERMpools('9');
		 });
		 
		 it('should display \'Shared Drives\' Pool', function(){
			 verifyERMpools('10');
		 });
		 
		 it('should display \'Engineering Drawings\' Pool', function(){
			 verifyERMpools('11');
		 });
		 
	});
	
    describe('Verify Links For ERM Contract Vehicle', function(){

	     it('should verify ERM links', function(){
		     browser.get(baseURL + '/erm');
		     verifyERMLinks();
	     });
	 
    });	
	

	
	
	
	/**
	 * Page Object and Methods
	 */
	
	var contractsLink = element(by.xpath('//span[text()="About"]'));
	var contractsTitle = element(by.css('.usa-grid>h1'));
	var contracts = element.all(by.css('.usa-media_block'));
	var discoveryLogo = element(by.css('.discovery-logo'));
	var discoveryLogoText = element(by.css('.discovery-logo >a >strong'));
	var homeLink = element(by.xpath('//span[text()="Home"]'));
	var advancedSearchLink = element(by.xpath('//span[text()="Advanced Search"]'));
	var aboutLink = element(by.xpath('//span[text()="About"]'));
	var contractsLink = element(by.xpath('//span[text()="Contracts"]'));
	var needHelpFooter = element(by.xpath('//h3[text()="Need Help?"]'));
	var discoveryFooter = element(by.xpath('//h3[text()="Discovery"]'));
	var GSAtoolsFooter = element(by.xpath('//h3[text()="Other GSA Tools"]'));
	var opinionMatterFooter = element(by.xpath('//h3[text()="Your Opinion Matters!"]'));
	var iconBestInClass = element(by.css('.best-in-class'));
	
	
	verifyContract = function(contract, title){
		 expect(element(by.xpath("//*[@class='circle']/h3[text()='"+contract+"']")).isDisplayed()).toBe(true);
		 expect(element(by.xpath("//h3[text()='"+title+"']")).isDisplayed()).toBe(true);
		 expect(element(by.xpath("//h3[text()='"+title+"']/../p")).isDisplayed()).toBe(true);
		 expect(element(by.xpath("//h3[text()='"+title+"']/../a")).getText()).toEqual('Learn more');	 
    }
	
	navigateToContract = function(contract){
		 element(by.xpath("//h3[text()='"+contract+"']/../following-sibling::div/p/following-sibling::a")).click();
		 expect(browser.getCurrentUrl()).toContain(contract.toLowerCase());
		 browser.sleep(3000);
	}
	
	contractsPage = function(contract,title){
		 expect(element(by.xpath("//h1[text()='"+contract+"']")).isDisplayed()).toBe(true);
		 expect(element(by.xpath("//h3[text()='"+title+"']")).isDisplayed()).toBe(true);
		 expect(element(by.xpath("//h3[text()='"+contract+" Links:']")).isDisplayed()).toBe(true);
		 expect(element(by.xpath("//h3[text()='"+contract+" Links:']/../ul")).isDisplayed()).toBe(true);
	}		
	
	verifyOASISpools = function(pool){

				switch (pool) {
				case '1':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(0).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_1__OASIS_1');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('44');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('45');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-3')])[1]")).getText()).toEqual('Management, Scientific, and Technical Services');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-3')])[1]")).getText()).toEqual('Management, Scientific, and Technical Services');			 
					 browser.navigate().back();
					break;
				case '2':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(1).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_2__OASIS_2');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('40');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('25');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-2')])[1]")).getText()).toEqual('Financial and Accounting Services');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-2')])[1]")).getText()).toEqual('Financial and Accounting Services');			 
					 browser.navigate().back();
					break;
				case '3':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(2).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_3__OASIS_3');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('43');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('43');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-4')])[1]")).getText()).toEqual('Military, Marine, and Energy Engineering');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-4')])[1]")).getText()).toEqual('Military, Marine, and Energy Engineering');			 
					 browser.navigate().back();
					break;
				case '4':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(3).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_4__OASIS_4');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('40');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('42');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-5')])[1]")).getText()).toEqual('Scientific Research and Development');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-5')])[1]")).getText()).toEqual('Scientific Research and Development');			 
					 browser.navigate().back();
					break;	
				case '5':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(4).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_5A__OASIS_5A');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('22');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('21');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-0')])[1]")).getText()).toEqual('Aircraft Parts and Engines Research and Development');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-0')])[1]")).getText()).toEqual('Aircraft Parts and Engines Research and Development');			 
					 browser.navigate().back();
					break;
				case '6':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(5).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_5B__OASIS_5B');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('22');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('21');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-6')])[1]")).getText()).toEqual('Space and Missiles Research and Development');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-6')])[1]")).getText()).toEqual('Space and Missiles Research and Development');			 
					 browser.navigate().back();
					break;
				case '7':
					 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(6).click();
					 browser.sleep(3000);
					 browser.ignoreSynchronization = true;
					 expect(browser.getCurrentUrl()).toContain('service_categories=OASIS_SB_6__OASIS_6');
					 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('OASIS Small Business');
					 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('OASIS Unrestricted');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('41');
					 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('38');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS-1')])[1]")).getText()).toEqual('Aircraft Research and Development');
					 expect(element(by.xpath("(//li[contains(@id,'OASIS_SB-1')])[1]")).getText()).toEqual('Aircraft Research and Development');			 
					 browser.navigate().back();
					break;
				}
	}
	
	verifyHCATSpools = function(pool){

		switch (pool) {
		case '1':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(0).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=HCATS_1__HCATS_SB_1');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('37');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('35');
			 expect(element(by.xpath("(//li[contains(@id,'HCATS-0')])[1]")).getText()).toEqual('HCATS Pool 1');
			 expect(element(by.xpath("(//li[contains(@id,'HCATS_SB-0')])[1]")).getText()).toEqual('HCATS Small Business Pool 1');			 
			 browser.navigate().back();
			break;
		case '2':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(1).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=HCATS_2__HCATS_SB_2');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('HCATS Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('HCATS Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('36');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('44');
			 expect(element(by.xpath("(//li[contains(@id,'HCATS-1')])[1]")).getText()).toEqual('HCATS Pool 2');
			 expect(element(by.xpath("(//li[contains(@id,'HCATS_SB-1')])[1]")).getText()).toEqual('HCATS Small Business Pool 2');			 
			 browser.navigate().back();
			break;
		}
		
	}
	
	
	verifyBMOpools = function(pool){

		switch (pool) {
		case '1':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(0).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_1__BMO_SB_1');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-9')])[1]")).getText()).toEqual('HVAC Maintenance');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-9')])[1]")).getText()).toEqual('HVAC Maintenance');			 
			 browser.navigate().back();
			break;
		case '2':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(1).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_2__BMO_SB_2');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('49');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-14')])[1]")).getText()).toEqual('Plumbing and Pipefitting');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-14')])[1]")).getText()).toEqual('Plumbing and Pipefitting');			 
			 browser.navigate().back();
			break;
		case '3':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(2).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_3__BMO_SB_3');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('39');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-6')])[1]")).getText()).toEqual('Elevator Maintenance');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-6')])[1]")).getText()).toEqual('Elevator Maintenance');			 
			 browser.navigate().back();
			break;
		case '4':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(3).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_4__BMO_SB_4');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('48');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-4')])[1]")).getText()).toEqual('Electrical Maintenance');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-4')])[1]")).getText()).toEqual('Electrical Maintenance');			 
			 browser.navigate().back();
			break;
		case '5':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(4).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_5__BMO_SB_5');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('40');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-10')])[1]")).getText()).toEqual('Janitorial');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-10')])[1]")).getText()).toEqual('Janitorial');			 
			 browser.navigate().back();
			break;
		case '6':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(5).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_6__BMO_SB_6');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('40');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-11')])[1]")).getText()).toEqual('Landscaping / Grounds Maintenance');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-11')])[1]")).getText()).toEqual('Landscaping / Grounds Maintenance');			 
			 browser.navigate().back();
			break;
		case '7':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(6).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_7__BMO_SB_7');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('46');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('13');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-7')])[1]")).getText()).toEqual('Fire Alarm System Maintenance and Repair');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-7')])[1]")).getText()).toEqual('Fire Alarm System Maintenance and Repair');			 
			 browser.navigate().back();
			break;
		case '8':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(7).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_8__BMO_SB_8');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('44');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('13');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-8')])[1]")).getText()).toEqual('Fire Supression System Preventative Maintenance and Repair Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-8')])[1]")).getText()).toEqual('Fire Supression System Preventative Maintenance and Repair Services');			 
			 browser.navigate().back();
			break;
		case '9':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(8).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_9__BMO_SB_9');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('37');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('11');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-15')])[1]")).getText()).toEqual('Roofing Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-15')])[1]")).getText()).toEqual('Roofing Services');			 
			 browser.navigate().back();
			break;
		case '10':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(9).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_10__BMO_SB_10');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('44');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('13');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-1')])[1]")).getText()).toEqual('Building Management Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-1')])[1]")).getText()).toEqual('Building Management Services');			 
			 browser.navigate().back();
			break;
		case '11':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(10).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_11__BMO_SB_11');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('39');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('12');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-0')])[1]")).getText()).toEqual('Architectural and Framework Building Maintenance Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-0')])[1]")).getText()).toEqual('Architectural and Framework Building Maintenance Services');			 
			 browser.navigate().back();
			break;
		case '12':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(11).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_12__BMO_SB_12');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('26');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('12');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-3')])[1]")).getText()).toEqual('Commissioning Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-3')])[1]")).getText()).toEqual('Commissioning Services');			 
			 browser.navigate().back();
			break;
		case '13':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(12).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_13__BMO_SB_13');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('32');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('13');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-5')])[1]")).getText()).toEqual('Elevator Inspection Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-5')])[1]")).getText()).toEqual('Elevator Inspection Services');			 
			 browser.navigate().back();
			break;
		case '14':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(13).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_14__BMO_SB_14');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('37');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('11');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-12')])[1]")).getText()).toEqual('Other Facility Management Related Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-12')])[1]")).getText()).toEqual('Other Facility Management Related Services');			 
			 browser.navigate().back();
			break;
		case '15':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(14).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_15__BMO_SB_15');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('38');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('11');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-13')])[1]")).getText()).toEqual('Pest Control');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-13')])[1]")).getText()).toEqual('Pest Control');			 
			 browser.navigate().back();
			break;
		case '16':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(15).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_16__BMO_SB_16');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('27');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('14');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-16')])[1]")).getText()).toEqual('Waste Management and Recycling Services');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-16')])[1]")).getText()).toEqual('Waste Management and Recycling Services');			 
			 browser.navigate().back();
			break;
		case '17':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(16).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=BMO_17__BMO_SB_17');
			 expect(element(by.xpath("(//*[@id='tbl-compare']//th/following-sibling::th[1])[1]")).getText()).toContain('BMO Small Business');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[2]")).getText()).toContain('BMO Unrestricted');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[1]")).getText()).toContain('1');
			 expect(element(by.xpath("(//button[@class='tooltip-bottom'])[2]")).getText()).toContain('3');
			 expect(element(by.xpath("(//li[contains(@id,'BMO-2')])[1]")).getText()).toEqual('Cemetery Maintenance');
			 expect(element(by.xpath("(//li[contains(@id,'BMO_SB-2')])[1]")).getText()).toEqual('Cemetery Maintenance');			 
			 browser.navigate().back();
			break;
		}
		
	}
	
	verifyERMpools = function(pool){

		switch (pool) {
		case '1':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(0).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_1');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('42');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-2')])[1]")).getText()).toEqual('Desktop Applications');			 
			 browser.navigate().back();
			break;
		case '2':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(1).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_2');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('41');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-6')])[1]")).getText()).toEqual('Electronic Messages');			 
			 browser.navigate().back();
			break;
		case '3':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(2).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_3');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('36');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-9')])[1]")).getText()).toEqual('Social Media');			 
			 browser.navigate().back();
			break;
		case '4':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(3).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_4');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('42');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-0')])[1]")).getText()).toEqual('Cloud Services');			 
			 browser.navigate().back();
			break;
		case '5':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(4).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_5');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('37');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-10')])[1]")).getText()).toEqual('Websites');			 
			 browser.navigate().back();
			break;
		case '6':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(5).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_6');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('44');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-4')])[1]")).getText()).toEqual('Digital Media (Photo)');			 
			 browser.navigate().back();
			break;
		case '7':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(6).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_7');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('40');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-3')])[1]")).getText()).toEqual('Digital Media (Audio)');			 
			 browser.navigate().back();
			break;
		case '8':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(7).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_8');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('40');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-5')])[1]")).getText()).toEqual('Digital Media (Video)');			 
			 browser.navigate().back();
			break;
		case '9':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(8).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_9');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('43');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-1')])[1]")).getText()).toEqual('Databases');			 
			 browser.navigate().back();
			break;
		case '10':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(9).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_10');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('39');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-8')])[1]")).getText()).toEqual('Shared Drives');			 
			 browser.navigate().back();
			break;
		case '11':
			 element.all(by.xpath("//ul[@class='usa-font-lead']//a")).get(10).click();
			 browser.sleep(3000);
			 browser.ignoreSynchronization = true;
			 expect(browser.getCurrentUrl()).toContain('service_categories=ERM_11');
			 expect(element(by.xpath("//*[@id='tbl-compare']//th/following-sibling::th[1]")).getText()).toContain('Electronic Records Management');
			 expect(element(by.xpath("//button[@class='tooltip-bottom']")).getText()).toContain('41');
			 expect(element(by.xpath("(//li[contains(@id,'ERM-7')])[1]")).getText()).toEqual('Engineering Drawings');			 
			 browser.navigate().back();
			break;
		}
		
	}
	
	verifyERMLinks = function(){
		var ERMlinks=['GSA Schedule 36 Home Page', 'ERM on Schedule 36 info page', 'ERM Contracts'];	
		var ERMurls=['/schedule-36the-office-imaging-document-solution', '/records-management-solutions', 'specialItemNumber=51+600'];
		var j=0;
		for(var i=0; i<ERMlinks.length; i++){	
			element(by.xpath("//a[contains(text(),'"+ERMlinks[i]+"')]")).click();
			browser.sleep(3000);
			browser.getAllWindowHandles().then(function (handles) {
		     var newWindowHandle = handles[1];
		     browser.switchTo().window(newWindowHandle).then(function () {
		     browser.ignoreSynchronization = true;			  
		     expect(browser.getCurrentUrl()).toContain(ERMurls[j]);
	           browser.driver.close().then(function () {
		       browser.switchTo().window(handles[0]);
		       j++;
		      });
		    });
		   });
		}
	}
	
	verifyOASISLinks = function(){
		var OASISlinks=['OASIS Ordering Guide', 'OASIS Contracts', 'Upcoming Trainings', 'NAICS Codes per Pool'];
		var OASISurls=['/how-to-use-oasis', '/oasis-contracts', '/training-and-scope-reviews', 'NEW_NAICS_Definitions_-_March_2020.pdf'];
		var j=0;
		for(var i=0; i<OASISlinks.length; i++){	
			element(by.xpath("//a[contains(text(),'"+OASISlinks[i]+"')]")).click();
			browser.sleep(3000);
			browser.getAllWindowHandles().then(function (handles) {
		     var newWindowHandle = handles[1];
		     browser.switchTo().window(newWindowHandle).then(function () {
		     browser.ignoreSynchronization = true;			  
		     expect(browser.getCurrentUrl()).toContain(OASISurls[j]);
	           browser.driver.close().then(function () {
		       browser.switchTo().window(handles[0]);
		       j++;
		      });
		    });
		   });
		}
	}
	
	verifyBMOLinks = function(){
		var BMOlinks=['BMO Home Page', 'BMO Ordering Guide', 'BMO Training', 'BMO Contract(s)'];	
		var BMOurls=['/building-maintenance-and-operations', '/Ordering%20Guide%20V5_0.pdf', '/bmo-training', '/fssi-bmo-faq'];
		var j=0;
		for(var i=0; i<BMOlinks.length; i++){	
			element(by.xpath("//a[contains(text(),'"+BMOlinks[i]+"')]")).click();
			browser.sleep(3000);
			browser.getAllWindowHandles().then(function (handles) {
		     var newWindowHandle = handles[1];
		     browser.switchTo().window(newWindowHandle).then(function () {
		     browser.ignoreSynchronization = true;			  
		     expect(browser.getCurrentUrl()).toContain(BMOurls[j]);
	           browser.driver.close().then(function () {
		       browser.switchTo().window(handles[0]);
		       j++;
		      });
		    });
		   });
		}
	}
	
	verifyHCATSLinks = function(){
		var HCATSlinks=['HCaTS Home Page', 'HCaTS Ordering Guide', 'HCaTS Training', 'HCaTS Contract(s)'];	
		var HCATSurls=['/human-capital-and-training-solutions', 'Aug%202018.pdf', '/hcats-training', '/hcats-resource-directory'];
		var j=0;
		for(var i=0; i<HCATSlinks.length; i++){	
			element(by.xpath("//a[contains(text(),'"+HCATSlinks[i]+"')]")).click();
			browser.sleep(3000);
			browser.getAllWindowHandles().then(function (handles) {
		     var newWindowHandle = handles[1];
		     browser.switchTo().window(newWindowHandle).then(function () {
		     browser.ignoreSynchronization = true;			  
		     expect(browser.getCurrentUrl()).toContain(HCATSurls[j]);
	           browser.driver.close().then(function () {
		       browser.switchTo().window(handles[0]);
		       j++;
		      });
		    });
		   });
		}
	}

});