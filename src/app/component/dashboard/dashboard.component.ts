import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserIdentifier } from 'src/app/models/user-identifier';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LabelsService } from 'src/app/service/labels.service';
import { NotesService } from 'src/app/service/notes.service';
import { MatDialog } from '@angular/material';
import { EditlabeldialogComponent } from '../editlabeldialog/editlabeldialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  Label: any;
  token: string;
  constructor(
    private userService: UserService,
    private labelService: LabelsService,
    private noteService: NotesService,
    private router: Router,
    public dialog: MatDialog
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
}
