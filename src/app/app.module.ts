import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { NewComponent } from './new/new.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SocketService } from './services/socket.service';

const config: SocketIoConfig = { url: 'http://localhost:8080/api/v1/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
