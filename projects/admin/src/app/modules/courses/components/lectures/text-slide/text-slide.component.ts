import { Component, Input } from '@angular/core';
import { Ss } from 'DAL';

@Component({
  selector: 'app-text-slide',
  templateUrl: './text-slide.component.html',
  styleUrls: ['./text-slide.component.scss'],
})
export class TextSlideComponent {
  @Input() slide: Ss;
}
