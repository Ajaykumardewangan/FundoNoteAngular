import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/service/notes.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-dailogbox',
  templateUrl: './dailogbox.component.html',
  styleUrls: ['./dailogbox.component.scss']
})
export class DailogboxComponent implements OnInit {

 notes: any;
  constructor(public dialogRef: MatDialogRef<DailogboxComponent>,
              @Inject(MAT_DIALOG_DATA) public note: any,
              private notesService: NotesService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private snackBar: MatSnackBar) {
                this.notes = note;
              }

  ngOnInit() {
  }
  // this.dialogRef.afterClosed().subscribe(result => {
  //   console.log( result);
  //   this.noteEvent.emit(result);
  // });
// this.dialogRef.close(notes);

closeDialog() {
  console.log('Id', this.notes.id);
  console.log('note', this.note);

  // tslint:disable-next-line: max-line-length
  this.notesService.updateNote('user/notes/update_note', this.notes, localStorage.getItem('token')).subscribe( (result) => {
    console.log(result);
    this.snackBar.open(result, 'Ok', {duration: 3000});
    this.dialogRef.close();
},
(error) => {
  this.snackBar.open(error.description, 'error', {duration: 3000});
});
}
}
