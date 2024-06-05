import { Component, Input } from '@angular/core';
import { Ss } from 'DAL';

@Component({
  selector: 'app-mcq-slide',
  templateUrl: './mcq-slide.component.html',
  styleUrls: ['./mcq-slide.component.scss'],
})
export class McqSlideComponent {
  @Input() slide: Ss;
}
