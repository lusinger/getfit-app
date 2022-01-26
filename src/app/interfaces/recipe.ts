import { Units } from '../types/units';
import { Entry } from "./entry";

export interface Recipe {
  id?: number;
  recipename: string;
  entryids?: Entry[];
  itemamounts: number;
  itemunits: 'Pers';
}
