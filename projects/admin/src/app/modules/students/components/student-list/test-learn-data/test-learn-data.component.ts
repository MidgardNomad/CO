import { DataService } from './data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-learn-data',
  templateUrl: './test-learn-data.component.html',
  styleUrls: ['./test-learn-data.component.scss'],
})
export class TestLearnDataComponent {
  data = [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getAllData().subscribe((dataB) => {
      // this.data = dataB;
      console.log(dataB);
    });
  }
}
