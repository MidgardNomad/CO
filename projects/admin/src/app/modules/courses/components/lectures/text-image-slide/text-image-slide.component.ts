import { Component, Input } from '@angular/core';
import { Ss } from 'DAL';

@Component({
  selector: 'app-text-image-slide',
  templateUrl: './text-image-slide.component.html',
  styleUrls: ['./text-image-slide.component.scss'],
})
export class TextImageSlideComponent {
  @Input() slide: Ss;
}
