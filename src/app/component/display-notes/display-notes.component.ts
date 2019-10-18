import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { DailogboxComponent } from '../dailogbox/dailogbox.component';
import { NotesService } from 'src/app/service/notes.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  @Input() notes: any;

  constructor(
    private noteService: NotesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
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
}
