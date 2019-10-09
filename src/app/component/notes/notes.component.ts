import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MatDialog } from '@angular/material';
import { DailogboxComponent } from '../dailogbox/dailogbox.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any;
  constructor(
    private noteService: NotesService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.noteService.getNotes(this.storage.get('token')).subscribe(notes => {
      this.notes = notes;
      console.log(notes);
    },
      (error) => {
        console.log(error);
      });
  }
  reciveMessage($event: any) {
    console.log('reched inside reciveMessage() method');
    console.log($event);
  }
}
