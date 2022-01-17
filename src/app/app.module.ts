import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { TypewriterDirective } from './directives/typewriter.directive';
import { RegisterComponent } from './features/register/register.component';
import { ScrollUpComponent } from './features/scroll-up/scroll-up.component';
import { AppRoutingModule } from './app-routing.module';
import { UserPanelComponent } from './features/user-panel/user-panel.component';
import { TrackingSectionComponent } from './features/user-panel/tracking-section/tracking-section.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TypewriterDirective,
    RegisterComponent,
    ScrollUpComponent,
    UserPanelComponent,
    TrackingSectionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
