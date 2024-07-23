import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: any) {
    const today = new Date().getTime();
    const birthYear = value.toDate().getTime();
    const age = Math.floor((today - birthYear) / (1000 * 60 * 60 * 24 * 365));
    return age;
  }
}
