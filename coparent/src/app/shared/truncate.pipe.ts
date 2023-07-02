import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length <= 35) {
      return value;
    }

    return value.substr(0, 35) + '...';
  }
}
