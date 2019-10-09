import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserService } from './service/user.service';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { StorageServiceModule} from 'angular-webstorage-service';
import {MatDividerModule} from '@angular/material/divider';
import { NotesComponent } from './component/notes/notes.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import {FormsModule} from '@angular/forms';
import { DailogboxComponent } from './component/dailogbox/dailogbox.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DisplayNotesComponent } from './component/display-notes/display-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    NotesComponent,
    CreateNoteComponent,
    DailogboxComponent,
    DisplayNotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    StorageServiceModule,
    MatDividerModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    RouterModule,
    MatIconModule
  ],
  entryComponents: [
    DailogboxComponent],

  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
