export interface IChartPoint {
  name: string;
  value: number;
  label?: string;
  extra: {
    entities: string[]
  }
}
