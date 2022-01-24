import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/item';
import { Recipe } from '../interfaces/recipe';

@Pipe({
  name: 'entryContent'
})
export class EntryContentPipe implements PipeTransform {

  transform(value: Item | Recipe): string {
    if('itemname' in value){
      const item = value as Item;
      return item.itemname;
    }else{
      const recipe = value as Recipe;
      return recipe.recipename;
    }
  }

}
