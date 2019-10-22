import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { DailogboxComponent } from '../dailogbox/dailogbox.component';
import { NotesService } from 'src/app/service/notes.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MatDialog } from '@angular/material';
import { LabelsService } from 'src/app/service/labels.service';
import { ViewserviceService } from 'src/app/service/viewservice.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  @Input() notes: any;
  removable = true;
  selectable = true;
  direction = 'row';

  constructor(
    private noteService: NotesService,
    private labelService: LabelsService,
    private viewService: ViewserviceService,
    public dialog: MatDialog
  ) { this.viewService.currentView.subscribe(
    response =>
      this.change(response)
  );}

  ngOnInit() {
  }

  change(flag: boolean) {
    if (flag) {
      this.direction = 'column';
    } else {
      this.direction = 'row';
    }
  }

  openDialog(note: any): void {
    const dialogRef = this.dialog.open(DailogboxComponent, {
      width: '450px',
      height: 'auto',
      data: note
    });
  }

  pinUnpin(noteId: any) {
    this.noteService.archive('user/notes/pinned?noteId=' + noteId).subscribe(response => {
       console.log();
    },
    error => {
      console.log(error);
    });
  }

  onDelete(note: any, label: any) {
    this.labelService.deletelabelfromnote('user/notes/deleteLabelFromNote?noteId=' + note.id + '&labelId=' + label.id)
    .subscribe(
      (response: any) => {
        console.log(response.statusMessage );
      },
      (error: any) => {
        console.log('in error' , error.error.description);

       } );
  }

  deleteRemindMe(note: any) {
    this.noteService.deleteRemainder('user/notes/deleteRemainder?noteId=' + note.id)
    .subscribe(
      (responce: any) => {
        console.log(responce.statusMessage);
      },
      (error: any) => {
        console.log('in error' , error.error.description);
      }
    );
    }
}
