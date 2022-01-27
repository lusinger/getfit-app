import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/item';
import { Recipe } from '../interfaces/recipe';
import { Entry } from '../interfaces/entry';

@Pipe({
  name: 'entryContent'
})
export class EntryContentPipe implements PipeTransform {

  transform(entry: Entry): string {
    if(entry.content){
      if('itemname' in entry.content){
        const item = entry.content as Item;
        return `${entry.amount + entry.unit + ' ' + item.itemname}`;
      }else{
        const recipe = entry.content as Recipe;
        return `${entry.amount + entry.unit + ' ' + recipe.recipename}`;
      }
    }else{
      return '';
    }
  }

}
