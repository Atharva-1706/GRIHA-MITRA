export type Category = 'Cooling' | 'Cooking' | 'Cleaning';

export interface Appliance {
  id: string;
  name: string;
  category: Category;
  icon: string;
}

export interface Job {
  id: string;
  task: string;
  date: string;
  amount: number;
}

export type View = 'home' | 'appliances' | 'translator' | 'ledger';
