import { Component, Input } from '@angular/core';
import { Ss } from 'DAL';

@Component({
  selector: 'app-fill-slide',
  templateUrl: './fill-slide.component.html',
  styleUrls: ['./fill-slide.component.scss'],
})
export class FillSlideComponent {
  @Input() slide: Ss;
}
