import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sentenseSymbol'})
export class SentenceSymbolPipe implements PipeTransform {
  transform(word: string): string {
    if (word == ' S '){
      return '<--';
    } else {
      return word
    }
  }
}
