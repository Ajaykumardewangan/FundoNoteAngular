import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  popup = false;
  noteForm: FormGroup;
  constructor(
    private noteService: NotesService
    ) { }

  ngOnInit() {
    this.noteForm = new FormGroup({
      noteTitle: new FormControl(''),
      description: new FormControl(''),
      remindMe: new FormControl(''),
      colour: new FormControl(''),
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
    this.noteService.createNote(this.noteForm.value)
      .subscribe (
        (data: any) => {
          this.popup = !this.popup;

        });
      }
}
