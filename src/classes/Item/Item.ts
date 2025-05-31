import type { IItem } from './interfaces';

export class Item implements IItem {
  id: number;
  value: string;
  checked: boolean;

  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
    this.checked = false;
  }

  changeState() {
    this.checked = !this.checked;
  }
}
