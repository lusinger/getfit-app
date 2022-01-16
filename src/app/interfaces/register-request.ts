export interface RegisterRequest {
  userName: string;
  mail: string;
  password: string;
  fullName: string;
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
  changePerWeek: number;
  gender: 'male' | 'female';
  activityRate: 1.2 | 1.375 | 1.55 | 1.725 | 1.9;
}
