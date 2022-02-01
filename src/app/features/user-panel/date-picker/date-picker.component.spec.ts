import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';

const calendarFields: Date[] = [
  new Date(2022, 1, 28),
  new Date(2022, 2, 1),
  new Date(2022, 2, 2),
  new Date(2022, 2, 3),
  new Date(2022, 2, 4),
  new Date(2022, 2, 5),
  new Date(2022, 2, 6),
  new Date(2022, 2, 7),
  new Date(2022, 2, 8),
  new Date(2022, 2, 9),
  new Date(2022, 2, 10),
  new Date(2022, 2, 11),
  new Date(2022, 2, 12),
  new Date(2022, 2, 13),
  new Date(2022, 2, 14),
  new Date(2022, 2, 15),
  new Date(2022, 2, 16),
  new Date(2022, 2, 17),
  new Date(2022, 2, 18),
  new Date(2022, 2, 19),
  new Date(2022, 2, 20),
  new Date(2022, 2, 21),
  new Date(2022, 2, 22),
  new Date(2022, 2, 23),
  new Date(2022, 2, 24),
  new Date(2022, 2, 25),
  new Date(2022, 2, 26),
  new Date(2022, 2, 27),
  new Date(2022, 2, 28),
  new Date(2022, 2, 29),
  new Date(2022, 2, 30),
  new Date(2022, 2, 31),
  new Date(2022, 3, 1),
  new Date(2022, 3, 2),
  new Date(2022, 3, 3),
  new Date(2022, 3, 4),
  new Date(2022, 3, 5),
  new Date(2022, 3, 6),
  new Date(2022, 3, 7),
  new Date(2022, 3, 8),
  new Date(2022, 3, 9),
  new Date(2022, 3, 10),
]

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generateCalendar()', () => {
    it('should populate an Date[] to represent the current month', () => {
      const startDate = new Date(2022, 2, 10);
      component.dates = component.generateCalendar(startDate);
      expect(component.dates).toEqual(calendarFields);
    });
  });
  describe('selectDate()', () => {
    it('should set the selectedDate state to passed date if selectedDate is in same month', () => {
      component.selectedDate = new Date(2022, 3, 20);
      const date = new Date(2022, 3, 10);
      component.selectDate(date);
      expect(component.selectedDate).toEqual(date);
    });
    it('should regenerate calendar if passed date is not in same month as selectedDate', () => {
      component.selectedDate = new Date(2022, 3, 20);
      const date = new Date(2022, 2, 10);
      component.selectDate(date);
      expect(component.selectedDate).toEqual(date);
      expect(component.dates).toEqual(calendarFields);
      expect()
    });
  });
  describe('toggleOverlay()', () => {
    it('should return "closed" if current state is "open" and vise versa', () => {
      component.overlayState = 'open';
      component.toggleOverlay();
      expect(component.overlayState).toEqual('closed');
    });
  });
  describe('getPrevDate()', () => {
    it('should return given date reduced by 1 day', () => {
      const date = new Date(2022, 2, 10);
      const prev = component.getPrevDate(date);
      expect(prev.getDate()).toBe(date.getDate() - 1);
    });
  });
  describe('getNextDate()', () => {
    it('should return given date increased by 1 day', () => {
      const date = new Date(2022, 2, 10);
      const next = component.getNextDate(date);
      expect(next.getDate()).toBe(date.getDate() + 1);
    });
  });
  describe('getPrevMonth()', () => {
    it('should return given date reduced by 1 month', () => {
      const date = new Date(2022, 2, 10);
      const prev = component.getPrevMonth(date);
      expect(prev.getMonth()).toBe(date.getMonth() - 1);
    });
  });
  describe('getNextMonth()', () => {
    it('should return given date increased by 1 month', () => {
      const date = new Date(2022, 2, 10);
      const next = component.getNextMonth(date);
      expect(next.getMonth()).toBe(date.getMonth() + 1);
    });
  });
});
