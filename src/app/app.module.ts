import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header/header.component';
import { PokeListComponent } from './pages/main/poke-list/poke-list.component';
import { MoreInfoComponent } from './pages/main/more-info/more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokeListComponent,
    MoreInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
