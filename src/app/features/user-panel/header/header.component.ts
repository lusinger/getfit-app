import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/types/types';
import { User } from 'src/app/interfaces/interfaces';
import { StateMachineService } from 'src/app/services/state-machine.service';

@Component({
  selector: 'getfit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  settingsState: State = 'closed';
  totalCalories: {total: number, breakfast: number, lunch: number, dinner: number, snack: number} = {total: 0, breakfast: 0, lunch: 0, dinner: 0, snack: 0};
  userState: User = {} as User;

  constructor(
    private state: StateMachineService,
  ) { }

  ngOnInit(): void {
    this.state.loadedUser.subscribe((user: User) => {
      this.userState = user;
    });
    this.state.breakfastCalories.subscribe((data) => {
      this.totalCalories.breakfast = data;
      this.totalCalories.total = this.calculateCalories();
    });
    this.state.lunchCalories.subscribe((data) => {
      this.totalCalories.lunch = data;
      this.totalCalories.total = this.calculateCalories();
    });
    this.state.dinnerCalories.subscribe((data) => {
      this.totalCalories.dinner = data;
      this.totalCalories.total = this.calculateCalories();
    });
    this.state.snackCalories.subscribe((data) => {
      this.totalCalories.snack = data;
      this.totalCalories.total = this.calculateCalories();
    });
  }

  toggleSettings(): void{
    this.settingsState === 'closed' ? this.settingsState = 'open' : this.settingsState = 'closed';
  }

  calculateCalories(): number{
    return this.totalCalories.breakfast + this.totalCalories.lunch + this.totalCalories.dinner + this.totalCalories.snack;
  }
}
