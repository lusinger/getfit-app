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
import { ResetComponent } from './features/reset/reset.component';
import { AppRoutingModule } from './app-routing.module';
import { UserPanelComponent } from './features/user-panel/user-panel.component';
import { SearchOverlayComponent } from './features/user-panel/search-overlay/search-overlay.component';
import { UserSettingsComponent } from './features/user-panel/user-settings/user-settings.component';
import { TrackingSectionComponent } from './features/user-panel/tracking-section/tracking-section.component';
import { SectionItemComponent } from './features/user-panel/tracking-section/section-item/section-item.component';
import { AddItemComponent } from './features/user-panel/tracking-section/add-item/add-item.component';
import { DatePickerComponent } from './features/user-panel/date-picker/date-picker.component';
import { ScrollLockDirective } from './directives/scroll-lock.directive';
import { EntryContentPipe } from './pipes/entry-content.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TypewriterDirective,
    RegisterComponent,
    ScrollUpComponent,
    UserPanelComponent,
    SearchOverlayComponent,
    UserSettingsComponent,
    TrackingSectionComponent,
    SectionItemComponent,
    AddItemComponent,
    ResetComponent,
    DatePickerComponent,
    ScrollLockDirective,
    EntryContentPipe,
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
