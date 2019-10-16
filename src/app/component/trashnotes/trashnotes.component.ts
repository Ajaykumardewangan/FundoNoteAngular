import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trashnotes',
  templateUrl: './trashnotes.component.html',
  styleUrls: ['./trashnotes.component.scss']
})
export class TrashnotesComponent implements OnInit {

  constructor(private noteService: NotesService,
              private snackbar: MatSnackBar) { }
  notes: any;

  ngOnInit() {
    this.noteService.getTrash('user/notes/get_trash').subscribe(response => {
        console.log(response);
        this.notes = response;
    },
    error => {
      console.log(error);
    });
  }

  deleteNote(noteId: any) {
    this.noteService.deleteNote('user/notes/delete_note?noteId=' + noteId).subscribe(Response => {
      console.log(Response);
      this.snackbar.open('note delete parmanently', 'ok', {duration: 3000});
    },
      error => {
        console.log(error);
        this.snackbar.open(error.error.description, 'error', {duration: 3000});
      }
    );
  }
  addToTrash(noteId: any) {
    this.noteService.archive('user/notes/trash?noteId=' + noteId).subscribe(Response => {
      console.log(Response);
      this.snackbar.open('note restored', 'ok', {duration: 3000});
    },
      error => {
        console.log(error);
        this.snackbar.open(error.error.description, 'error', {duration: 3000});
      }
    );
  }

}
