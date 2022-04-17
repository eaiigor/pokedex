import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header/header.component';
import { PokeListComponent } from './pages/main/poke-list/poke-list.component';
import { MoreInfoComponent } from './pages/main/more-info/more-info.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

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
    NgbModalModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
