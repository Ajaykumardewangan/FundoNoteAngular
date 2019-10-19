import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  popup = false;
  noteForm: FormGroup;
  constructor(
    private noteService: NotesService,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
    this.noteForm = new FormGroup({
      noteTitle: new FormControl(''),
      description: new FormControl(''),
      remindMe: new FormControl(''),
      color: new FormControl('white'),
      archive: new FormControl(''),
      isPinned: new FormControl(''),
    });
  }
  onClickNote() {
    this.popup = !this.popup;
  }

  onReturn() {
    console.log(this.noteForm);
    if (this.noteForm.invalid) {
      console.log(this.noteForm);
      return;
    }
    this.noteService.createNote(this.noteForm.value).subscribe ((data: any) => {
          this.popup = !this.popup;
          this.snackbar.open('note created', 'ok', {duration: 3000});
        },
        error => {
          this.snackbar.open(error.error.description, 'error', {duration: 3000});
        });
      }
}
