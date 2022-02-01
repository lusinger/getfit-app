import { SectionEntries } from './section-entries';
import { Entry } from '../interfaces/interfaces';

const data: Entry[] = [
  {id: 1, createdon: new Date(), userid: 1, entryid: 2, amount: 100, unit: 'g', isrecipe: false, section: 'breakfast'},
  {id: 2, createdon: new Date(), userid: 2, entryid: 2, amount: 200, unit: 'g', isrecipe: false, section: 'lunch'},
  {id: 3, createdon: new Date(), userid: 3, entryid: 2, amount: 300, unit: 'g', isrecipe: false, section: 'dinner'},
  {id: 4, createdon: new Date(), userid: 4, entryid: 2, amount: 400, unit: 'g', isrecipe: false, section: 'snack'},
]

describe('class SectionEntries', () => {
  it('should create an instance', () => {
    expect(new SectionEntries([], [], [], [])).toBeTruthy();
  });
  describe('getSection()', () => {
    it('should return Entry[] of defined section property', () => {
      const entries = new SectionEntries([data[0]], [data[1]], [data[2]], [data[3]]);
      const values = entries.getSection('breakfast');
      expect(values[0].id).toBe(1);
    });
  });
  describe('clearData()', () => {
    it('should remove all data from SectionEntries instance', () => {
      const entries = new SectionEntries([data[0]], [data[1]], [data[2]], [data[3]]);
      entries.clearData();
      expect(entries.breakfast.length).toBe(0);
      expect(entries.lunch.length).toBe(0);
      expect(entries.dinner.length).toBe(0);
      expect(entries.snack.length).toBe(0);
    });
  });
  describe('addData()', () => {
    const entries = new SectionEntries([data[0]], [data[1]], [data[2]], [data[3]]);
    it('should add single entry to matching section', () => {
      const entryToAdd: Entry = {id: 5, createdon: new Date(), userid: 1, entryid: 1, amount: 10, unit: 'ml', isrecipe: false, section: 'breakfast'};
      entries.addData(entryToAdd);
      expect(entries.breakfast.some((entry) => {
        return entry.id === 5 ? true : false;
      })).toBe(true);
    });
    it('should add multiple entries to matching section(s)', () => {
      const entriesToAdd: Entry[] = [
        {id: 6, createdon: new Date(), userid: 1, entryid: 1, amount: 10, unit: 'ml', isrecipe: false, section: 'breakfast'},
        {id: 7, createdon: new Date(), userid: 1, entryid: 1, amount: 10, unit: 'ml', isrecipe: false, section: 'lunch'},
      ];
      entries.addData(entriesToAdd);
      expect(entries.breakfast.some((entry) => {
        return entry.id === 6 ? true : false;
      })).toBe(true);
      expect(entries.lunch.some((entry) => {
        return entry.id === 7 ? true : false;
      })).toBe(true);
    });
  });
});
