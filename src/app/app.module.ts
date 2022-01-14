import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TypewriterDirective } from './directives/typewriter.directive';
import { RegisterComponent } from './features/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TypewriterDirective,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
