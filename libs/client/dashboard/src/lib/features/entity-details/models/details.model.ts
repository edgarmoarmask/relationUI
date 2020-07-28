export interface IDetailsGroup {
  name: string;
  items: IGroupItem[]
}
export interface IGroupItem {
  value: string;
  selected: boolean;
}
