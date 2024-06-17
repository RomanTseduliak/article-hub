import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSuffix',
})
export class DateSuffixPipe implements PipeTransform {
  private getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  transform(value: Date | string | number): string {
    let date = new Date(value);
    let day = date.getDate();
    let month = date.toLocaleString('en-US', { month: 'long' });
    let year = date.getFullYear();
    let suffix = this.getOrdinalSuffix(day);

    return `${month} ${day}${suffix}, ${year}`;
  }
}
