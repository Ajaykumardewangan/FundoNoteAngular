import { Component, OnInit, Inject, Input } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() note: any;

   colors: string[] =  ['#ffe6e6', '#e5ffe5', '#A9A9A9', '#B0C4DE', '#DAA520', '#FFFFFF', '#FFF8DC', '#FFA07A', '#FAFAD2',
   '#F5F5F5', '#FA8072', '#FFD700', '	#FF4500'];
  constructor(
    private noteService: NotesService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
  }

  archive(notes: any) {
    this.noteService.archive('user/notes/archive?noteId=' + notes.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
  }
  changeColor(color: any, notes: any) {
    console.log(color);
    console.log(notes.id);
    console.log('user/notes/change-color/%23ffffff' + '&noteId=' + notes.id);
    this.noteService.changeColor('user/notes/change-color/' + color + '?noteId=' + notes.id).subscribe(
      (response) => {
        console.log();
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
  }
}
