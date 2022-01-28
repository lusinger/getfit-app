import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/item';
import { Recipe } from '../interfaces/recipe';
import { Entry } from '../interfaces/entry';

type PipeOptions = 'data' | 'name' | 'calories';

@Pipe({
  name: 'entryContent'
})
export class EntryContentPipe implements PipeTransform {

  transform(entry: Entry, option: PipeOptions): string {
    if(entry.content){
      switch(option){
        case 'data':
          if('itemname' in entry.content){
            const item = entry.content as Item;
            return `${entry.amount + entry.unit + ' ' + item.itemname}`;
          }else{
            const recipe = entry.content as Recipe;
            return `${entry.amount + entry.unit + ' ' + recipe.recipename}`;
          }
        case 'name':
          if('itemname' in entry.content){
            const item = entry.content as Item;
            return item.itemname;
          }else{
            const recipe = entry.content as Recipe;
            return recipe.recipename;
          }
        case 'calories':
          if('itemname' in entry.content){
            const item = entry.content as Item;
            switch(entry.unit){
              case 'g':
                return `${entry.amount * item.perg}`;
              case 'ml':
                return `${entry.amount * item.perml}`;
              case 'EL':
                return `${entry.amount * item.perel}`;
              default:
                return '';
            }
          }else{
            const recipe = entry.content as Recipe;
            return `${entry.amount + entry.unit + ' ' + recipe.recipename}`;
          }
      }
    }else{
      return '';
    }
  }

}
