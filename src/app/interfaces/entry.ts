export interface Entry {
  id?: number;
  createdon: Date;
  itemname: string;
  amount: number;
  unit: 'g' |  'ml' | 'EL' | 'Pers';
}
