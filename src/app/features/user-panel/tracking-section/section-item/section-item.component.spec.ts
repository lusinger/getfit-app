import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Entry } from 'src/app/interfaces/interfaces';
import { EntryContentPipe } from 'src/app/pipes/entry-content.pipe';

import { SectionItemComponent } from './section-item.component';

const mockEntry: Entry = {
  id: 1,
  createdon: new Date(),
  userid: 1,
  entryid: 1,
  amount: 100,
  unit: 'g',
  isrecipe: false,
  section: 'breakfast',
}

describe('SectionItemComponent', () => {
  let component: SectionItemComponent;
  let fixture: ComponentFixture<SectionItemComponent>;
  let debug: DebugElement;
  let timer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionItemComponent, EntryContentPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionItemComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
    timer = jasmine.createSpy('timerCallback');
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeItem()', () => {
    it('should set remove property from false to true', () => {
      component.removeItem();
      expect(component.remove).toBe(true);
    });
    it('should emit removingItem on click', () => {
      component.itemData = mockEntry;
      const ref = fixture.debugElement.query(By.css('.remove-interface'));
      spyOn(component.removingItem, 'emit');
      ref.triggerEventHandler('click', null);
      jasmine.clock().tick(600);
      expect(component.removingItem.emit).toHaveBeenCalledTimes(1);
      expect(component.removingItem.emit).toHaveBeenCalledWith(mockEntry);
    });
  });
  
  describe('openEdit()', () => {
    it('should emit openingEdit on click', () => {
      component.itemData = mockEntry;
      const ref = fixture.debugElement.query(By.css('.edit-button'));
      spyOn(component.openingEdit, 'emit');
      ref.triggerEventHandler('click', null);
      expect(component.openingEdit.emit).toHaveBeenCalledOnceWith(mockEntry);
    });
  });
});
