import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ColumnsComponent} from './components/columns/columns.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectComponent} from './components/select/select.component';
import {FilePickerComponent} from './components/file-picker/file-picker.component';
import {MessagesComponent} from './components/messages/messages.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ColumnsComponent,
    SelectComponent,
    FilePickerComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
