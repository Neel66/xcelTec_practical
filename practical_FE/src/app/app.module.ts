import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth/auth.service';
import { AudioComponent } from './audio/audio.component';
import { AddComponent } from './audio/add/add.component';
import { DeleteDialogComponent } from './common/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AudioComponent, AddComponent, DeleteDialogComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [HttpClient, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
