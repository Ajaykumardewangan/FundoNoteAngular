import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LabelsService } from 'src/app/service/labels.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editlabeldialog',
  templateUrl: './editlabeldialog.component.html',
  styleUrls: ['./editlabeldialog.component.scss']
})
export class EditlabeldialogComponent implements OnInit {

  labelList: any;
  labelForm: FormGroup;
  editlabelForm: FormGroup;
  constructor(private labelService: LabelsService, public dialogRef: MatDialogRef<EditlabeldialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllLabel();
    this.labelForm = new FormGroup({
      labelName: new FormControl('')
    });
    this.editlabelForm = new FormGroup({
      labelName: new FormControl('')
    });
  }

  getAllLabel() {
    this.labelService.getLabels(localStorage.getItem('token')).subscribe(
      (data: any) => {
        this.labelList = data;
      }
    );
  }
  createLabel() {
    console.log(this.labelForm.value);
    this.labelService.createLabel(this.labelForm.value)
      .subscribe(
        (response: any) => {
          console.log('save');
          this.snackBar.open('message save');
          this.dialogRef.close();
        },
        (error: any) => {
          this.snackBar.open('label already exist');
          this.dialogRef.close();
        });
  }

  clear() {
    this.labelForm.reset();
  }
  updatelabel(label: any) {
    console.log(label.id);
    this.labelService.updateLabel('user/label/update_label?labelId=' + label.id, this.editlabelForm.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.snackBar.open(response.statusMessage, 'Ok', {duration: 2000});
          this.dialogRef.close();
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open(error.error.description, 'error', {duration: 3000});
          this.dialogRef.close();
        });
  }
   deleteLabel(label: any) {
     console.log('in ts');
     this.labelService.deleteLabel('user/label/delete_label?labelId=' + label.id)
    .subscribe(
      (response: any) => {

        this.snackBar.open(response.statusMessage, 'ok', {duration: 3000});
        this.dialogRef.close();
      });
  }
}
