import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserIdentifier } from 'src/app/models/user-identifier';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LabelsService } from 'src/app/service/labels.service';
import { NotesService } from 'src/app/service/notes.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditlabeldialogComponent } from '../editlabeldialog/editlabeldialog.component';
import { DataService } from 'src/app/service/data.service';
import { ViewserviceService } from 'src/app/service/viewservice.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  isGrid = true;
  Label: any;
  token: string;
  constructor(
    private userService: UserService,
    private labelService: LabelsService,
    private noteService: NotesService,
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private viewService: ViewserviceService
    ) {

   }
  ngOnInit() {
    this.labelService.getLabels(localStorage.getItem('token')).subscribe( labels => {
      this.Label = labels;
      console.log(labels);
  },
  (error) => {
      console.log(error);
  });
    this.router.navigateByUrl('/dashboard/notes');
   }

   notes() {
     this.router.navigateByUrl('/dashboard/notes');
   }

   reminderNote() {
    this.router.navigateByUrl('/dashboard/reminder');
   }
   archivedNotes() {
    this.router.navigateByUrl('/dashboard/archivednotes');
   }
   trashNotes() {
     this.router.navigateByUrl('/dashboard/trashnotes');
     }

     openEditlabelDailog() {
      const dialogRef = this.dialog.open(EditlabeldialogComponent, {
        width: 'auto',
        height: 'auto',
       });
      }

      sendMessage(label: any): void {
        console.log('in click');
        // localStorage.setItem('labelId', label.labelId);
        // this.router.navigateByUrl('/dashboard/noteonlabel');
        this.noteService.addnoteonlabel('user/notes/getNotesOnLabel?labelId=' + label.id).subscribe(
          (response: any) => {
            console.log('in dashboard');
            console.log(response);
            this.dataService.sendMessage(response);
            this.router.navigateByUrl('/dashboard/notesonlabel');
          },
          (error: any) => {
            console.log(error);
            this.snackBar.open(error.description, 'error', { duration: 3000 });
          });
      }

      logout() {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }

      changeView() {
        this.isGrid = !this.isGrid;
        this.viewService.changeView();
        }
}
