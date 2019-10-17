import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { LabelsService } from 'src/app/service/labels.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @Input() note: any;

  popup = false;
 labelList: [];
 inputdata = '';
 labelForm: FormGroup;

  public dateTime: any;

  //  colors: string[] =  ['#ffe6e6', '#e5ffe5', '#A9A9A9', '#B0C4DE', '#DAA520', '#FFFFFF', '#FFF8DC', '#FFA07A', '#FAFAD2',
  //  '#F5F5F5', '#FA8072', '#FFD700', '	#FF4500'];
  // colors: string[] =  ['blue', 'green', 'yellow', 'skyblue', 'brown', 'orange', 'pink', 'white', 'lightblue',
  // 'red', 'aqua', 'silver', 'olive'];
  colors =
    // tslint:disable-next-line: max-line-length
    [
      // tslint:disable-next-line: max-line-length
      [{ name: 'Blue', value: 'blue' }, { name: 'green', value: 'green' }, { name: 'Yellow', value: 'yellow' }, { name: 'skyblue', value: 'skyblue' }],
      // tslint:disable-next-line: max-line-length
      [{ name: 'Brown', value: 'brown' }, { name: 'orange', value: 'orange' }, { name: 'pink', value: 'pink' }, { name: 'white', value: 'white' }],
      // tslint:disable-next-line: max-line-length
      [{ name: 'lightblue', value: 'lightblue' }, { name: 'red', value: 'red' }, { name: 'aqua', value: 'aqua' }, { name: 'silver', value: 'silver' }]
    ];
  constructor(
    private noteService: NotesService,
    private snackbar: MatSnackBar,
    private labelService: LabelsService) { }

  ngOnInit() {
    this.getAllLabel();
    console.log(this.labelList);

    this.labelForm = new FormGroup({
      labelName: new FormControl('')});
  }

  archive(notes: any) {
    this.noteService.archive('user/notes/archive?noteId=' + notes.id).subscribe(
      (response) => {
        console.log(response);
        this.snackbar.open('note archived', 'ok', {duration: 3000});
      },
      (error) => {
        console.log(error);
        this.snackbar.open(error.error.description, 'error', {duration: 3000});
      });
  }
  changeColor(color: any, notes: any) {
    this.noteService.changeColor('user/notes/change-color/' + color + '?noteId=' + notes.id).subscribe(
      (response) => {
        console.log();
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
  }

  addToTrash(noteId: any) {
    this.noteService.archive('user/notes/trash?noteId=' + noteId).subscribe(Response => {
      console.log(Response);
      this.snackbar.open('note Trashed', 'ok', {duration: 3000});
    },
      error => {
        console.log(error);
        this.snackbar.open(error.error.description, 'error', {duration: 3000});
      }
    );
  }

  reminder(selectedDateTime, noteId: any) {
    const data = '';
    console.log(selectedDateTime);
    console.log(this.dateTime);
    const dateNow = new Date();
    let today: any;

    if (selectedDateTime == 'today') {
      today = formatDate(dateNow, 'yyyy-MM-ddT20:00:00', 'en-IND', '+5:30');
      console.log('todays DateTime : ', today);
    } else if (selectedDateTime == 'tomorrow') {
      today = formatDate(dateNow.setDate(dateNow.getDate() + 1), 'yyyy-MM-ddT08:00:00', 'en-IND', '+5:30');
      console.log('tomorrow DateTime : ', today);
    } else if (selectedDateTime == 'next-week') {
      today = formatDate(dateNow.setDate(dateNow.getDate() + 7), 'yyyy-MM-ddT20:00:00', 'en-IND', '+5:30');
    } else {
      today = formatDate(this.dateTime, 'yyyy-MM-ddTHH:MM:SS', 'en-IND', '+5:30');
      console.log('Selecting dateTime : ', today);

    }
    this.noteService.reminder('user/notes/reminder?noteId=' + noteId + '&reminderDate=' + today).subscribe(Response => {
      // this.noteService.reminder('user/notes/delete_note?noteId=26&reminderDate=2019-09-14T12:00:00').subscribe( Response => {
      console.log(Response);
    },
      error => {
        console.log(error);
      }
    );
  }

  onPost(label: any) {
    console.log(label);
    console.log(this.note.id);
    this.labelService.addlabeltonote('user/notes/mappingNoteLabel?noteId=' + this.note.id, label).subscribe(
      (response: any) => {
        console.log(response.statusMessage );
      },
      (error: any) => {
        console.log('in error' , error.error.description);
       } );
  }
  onAddLabelToNote() {
    console.log(this.labelForm.value);
    this.labelService.addlabeltonote('user/notes/mappingNoteLabel?noteId=' + this.note.id, this.labelForm.value).subscribe(
      (response: any) => {
        console.log(response.statusMessage );
      },
      (error: any) => {
        console.log('in error');

       } );
  }

  getAllLabel() {
    this.labelService.getLabels(localStorage.getItem('token')).subscribe (
      (data: any) => {
        this.labelList = data;
      }
    );
  }
}
