import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NotesComponent } from './component/notes/notes.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchivednotesComponent } from './component/archivednotes/archivednotes.component';
import { TrashnotesComponent } from './component/trashnotes/trashnotes.component';
import { NoteonlabelComponent } from './component/noteonlabel/noteonlabel.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'forgetPassword', component: ForgetPasswordComponent},
  {path: 'resetpassword/:token', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent,
  children: [
     {path: '', component: NotesComponent},
     {path: 'reminder', component: ReminderComponent},
     {path: 'notes', component: NotesComponent },
     {path: 'archivednotes', component: ArchivednotesComponent },
     {path: 'trashnotes', component: TrashnotesComponent },
     {path: 'notesonlabel', component: NoteonlabelComponent }
   ]
},
  {path: 'create-note', component: CreateNoteComponent },
  {path: 'toolbar', component: ToolbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  RegistrationComponent,
  ForgetPasswordComponent,
  ResetPasswordComponent,
  DashboardComponent
   ];
