import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/service/notes.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-collaboratordialogbox',
  templateUrl: './collaboratordialogbox.component.html',
  styleUrls: ['./collaboratordialogbox.component.scss']
})
export class CollaboratordialogboxComponent implements OnInit {

  notes: any;
  emailForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CollaboratordialogboxComponent>,
              @Inject(MAT_DIALOG_DATA) public note: any,
              private snackBar: MatSnackBar,
              private notesService: NotesService) {
              this.notes = note;
    }

  ngOnInit() {
    this.emailForm = new FormGroup({
       email : new FormControl('')
    });
  }

  addCollaborator(form: NgForm) {
    console.log(form);
    console.log(this.emailForm.value.email);
    // tslint:disable-next-line: max-line-length
    this.notesService.addToCollaborator('user/notes/addcollaborator?email=' + this.emailForm.value.email + '&noteId=' + this.notes.id).subscribe( (result) => {
      console.log(result);
      this.snackBar.open('collborator added', 'Ok', {duration: 3000});
      this.dialogRef.close();
  },
  (error) => {
    console.log(error);
    this.snackBar.open(error.error.description, 'error', {duration: 3000});
  });
  }
}
