import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'namestrip'})
export class NameStripPipe implements PipeTransform {
  transform(wordArray: string[]): string {
    let headlineText = '';
    wordArray.forEach(word => {
      if (word !== '>ss<') {
        headlineText = headlineText + word.trim() + ' ';
      }
    });
    headlineText = headlineText.trim();
    headlineText = headlineText.replace(new RegExp(' ', 'g'), '_');
    headlineText = headlineText.replace(new RegExp('/', 'g'), '');

    headlineText = headlineText.replace(new RegExp('ß', 'g'), 'ss');
    headlineText = headlineText.replace(new RegExp('è', 'g'), 'e');

    headlineText = headlineText.replace(new RegExp('Ä', 'g'), 'A');
    headlineText = headlineText.replace(new RegExp('ä', 'g'), 'a');
    headlineText = headlineText.replace(new RegExp('Ü', 'g'), 'U');
    headlineText = headlineText.replace(new RegExp('ü', 'g'), 'u');
    headlineText = headlineText.replace(new RegExp('Ö', 'g'), 'O');
    headlineText = headlineText.replace(new RegExp('ö', 'g'), 'o');

    return headlineText;
  }
}
