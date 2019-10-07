import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dailogbox',
  templateUrl: './dailogbox.component.html',
  styleUrls: ['./dailogbox.component.scss']
})
export class DailogboxComponent implements OnInit {

  notes: any;
  constructor(public dialogRef: MatDialogRef<DailogboxComponent>,
              @Inject(MAT_DIALOG_DATA) public note: any) {
                this.notes = note;
              }

  ngOnInit() {
  }

}
