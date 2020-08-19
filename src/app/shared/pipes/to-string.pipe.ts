import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString',
  // pure:false
})
export class ToStringPipe implements PipeTransform {
  transform(value: string[], ...args: any[]): string {
    return value.sort().join(', ');
  }
}
