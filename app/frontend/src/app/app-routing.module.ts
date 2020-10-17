import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { OasisSbInfoComponent } from './pages/contract-vehicles/oasis-sb-info.component';
import { BmoInfoComponent } from './pages/contract-vehicles/bmo-info.component';
import { HcatsComponent } from './pages/contract-vehicles/hcats.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Error404Component } from './pages/error404/error404.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { SearchComponent } from './pages/search/search.component';
import { ErmComponent } from './pages/contract-vehicles/erm.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'oasis', component: OasisSbInfoComponent },
  { path: 'bmo', component: BmoInfoComponent },
  { path: 'hcats', component: HcatsComponent },
  { path: 'erm', component: ErmComponent },
  { path: '404', component: Error404Component },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
