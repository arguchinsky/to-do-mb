export interface IItem {
  id: number;
  value: string;
  checked: boolean;
  changeState: VoidFunction;
}
