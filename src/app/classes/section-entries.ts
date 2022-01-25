import { Entry } from "../interfaces/entry";
import { Sections } from "../types/sections";

export class SectionEntries{
  breakfast: Entry[];
  lunch: Entry[];
  dinner: Entry[];
  snack: Entry[];

  constructor(breakfast: Entry[], lunch: Entry[], dinner: Entry[], snack: Entry[]){
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
    this.snack = snack;
  }

  getSection(section: Sections): Entry[]{
    switch(section){
      case 'breakfast':
        return this.breakfast;
      case 'lunch':
        return this.breakfast;
      case 'dinner':
        return this.breakfast;
      case 'snack':
        return this.breakfast;
      default:
        return [];
    }
  };

  clearData(): void{
    this.breakfast = [];
    this.lunch = [];
    this.dinner = [];
    this.snack = [];
  }

  private addToSection(entry: Entry): void{
    switch(entry.section){
      case 'breakfast':
        this.breakfast.push(entry);
        break;
      case 'lunch':
        this.lunch.push(entry);
        break;
      case 'dinner':
        this.dinner.push(entry);
        break;
      case 'snack':
        this.snack.push(entry);
        break;
    }
  }

  addData(data: Entry | Entry[]): void{
    if(Array.isArray(data)){
      data.forEach((entry) => {
        this.addToSection(entry);
      });
    }else{
      this.addToSection(data);
    }
  }
}