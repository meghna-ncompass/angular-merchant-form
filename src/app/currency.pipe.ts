import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currency ' })
export class Currency implements PipeTransform {
  transform(value: number): string {
    return `$ ${value}`;
  }
}
