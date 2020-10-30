# Discovery

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).  Follow the protractor test setup, you'll need to run the selenium server with their helper, webdriver-manager.

* Edit the specs section, in the [configuration/config.js](configuration/conf.js) file to select the e2e tests you wish to run.  You may only want to test specific areas of the app, since it does take a few minutes to run each section.
* To run multiple specs at once, simply add them to a single list.
<br> 
``` ['../advanced-search-page/advanced-search-page.e2e.js', '../vendors-page/vendors-page.e2e.js']```
* Make sure you're in the proper directory, `cd frontend/configuration`, then you may Run `protractor conf.js`

Your default browser should launch, and you'll see the automated test running.  You should also see the results printed in terminal.  A Beautiful HTML report is generated in **frontend/report**, simply open the **Discovery-Report.html** file.  You don't need to check this file in.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
