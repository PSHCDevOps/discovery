import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { OasisSbInfoComponent } from './pages/contract-vehicles/oasis-sb-info.component';
import { HelpComponent } from './pages/help/help.component';
import { BmoInfoComponent } from './pages/contract-vehicles/bmo-info.component';
import { HcatsComponent } from './pages/contract-vehicles/hcats.component';
import { HeroComponent } from './common/hero.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Error404Component } from './pages/error404/error404.component';
import { SearchModule } from './pages/search/search.module';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { ErmComponent } from './pages/contract-vehicles/erm.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    WelcomeComponent,
    Error404Component,
    AboutComponent,
    ContractsComponent,
    OasisSbInfoComponent,
    HelpComponent,
    BmoInfoComponent,
    HcatsComponent,
    HeroComponent,
    ErmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SearchModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
