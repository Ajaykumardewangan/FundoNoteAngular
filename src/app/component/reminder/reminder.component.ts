import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  notes: any;

  constructor(private noteService: NotesService) { }

  ngOnInit()  {
    this.noteService.getReminders('user/notes/get_reminder').subscribe( response => {
      console.log(response);
      this.notes = response;
    },
    error => {
      console.log(error);
    });

  }

}
