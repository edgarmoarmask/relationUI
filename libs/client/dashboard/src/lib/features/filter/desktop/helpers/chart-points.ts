import {IChartPoint} from "@dashboard/features/filter/desktop/models/chart.series.model";

export function getPointsIds(points: IChartPoint[]): string[] {

  let ids: string[] = [];

  points.forEach(point => {

    if (point.extra.entities.length > 0)
      ids = [...ids, ...point.extra.entities];
  });

  if (ids.length > 0)
    ids = [...new Set(ids)];

  return ids;
}
