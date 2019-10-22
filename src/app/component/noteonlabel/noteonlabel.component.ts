import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-noteonlabel',
  templateUrl: './noteonlabel.component.html',
  styleUrls: ['./noteonlabel.component.scss']
})
export class NoteonlabelComponent implements OnInit {

  labeles: any;
  subscription: Subscription;
  constructor( private dataService: DataService,) { }

  ngOnInit() {
    this.subscription = this.dataService.getMessage().subscribe(message => {
      this.labeles = message.text;
      console.log('in labelnotes', this.labeles);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
