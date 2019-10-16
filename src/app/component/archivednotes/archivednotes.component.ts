import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-archivednotes',
  templateUrl: './archivednotes.component.html',
  styleUrls: ['./archivednotes.component.scss']
})
export class ArchivednotesComponent implements OnInit {

  archivedNote: any;

  constructor(private noteService: NotesService) { }

  ngOnInit() {
    this.noteService.getArchivedNotes('user/notes/get_archivednotes').subscribe( response => {
      console.log(response);
      this.archivedNote = response;
    },
    error => {
      console.log(error);
    });
  }

}
