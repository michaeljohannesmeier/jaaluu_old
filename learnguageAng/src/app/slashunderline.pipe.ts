import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slashunderline'})
export class SlashUnderlinePipe implements PipeTransform {
  transform(name: string): string {
    name = name.replace(new RegExp('/', 'g'), '');
    name = name.replace(new RegExp(' ', 'g'), '_');

    name = name.replace(new RegExp('ß', 'g'), 'ss');
    name = name.replace(new RegExp('è', 'g'), 'e');

    name = name.replace(new RegExp('Ä', 'g'), 'A');
    name = name.replace(new RegExp('ä', 'g'), 'a');
    name = name.replace(new RegExp('Ü', 'g'), 'U');
    name = name.replace(new RegExp('ü', 'g'), 'u');
    name = name.replace(new RegExp('Ö', 'g'), 'O');
    name = name.replace(new RegExp('ö', 'g'), 'o');


    return name;
  }
}
