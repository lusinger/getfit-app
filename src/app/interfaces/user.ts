export interface User {
  username: string;
  mail: string;
  fullName: string;
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
  changePerWeek: number;
  gender: 'male' | 'female';
  calorieGoal: number;
}
