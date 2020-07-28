import {IEntityDateGroup} from "@eagleye/shared/models";

import {IChartPoint} from "@dashboard/features/filter/models/chart.series.model";
import {Granularity} from "@dashboard/features/filter/models/granularities.model";

export function configureChartSeries(dateGroups: IEntityDateGroup[], granularity: Granularity): IChartPoint[] {

  return dateGroups
    .map(group => getNameByGranularity(group.date, granularity))
    .filter((date, index, array) => array.indexOf(date) === index)
    .map(date => {

      const entities: string[] = dateGroups
        .filter(group => getNameByGranularity(group.date, granularity) === date)
        .reduce((acc, element) => (
          [...acc, ...element.entities]
        ), []);

      return {
        name: date,
        value: entities.length,
        extra: {
          entities: entities
        }
      }
    });
}

function getNameByGranularity(date: string, granularity: Granularity): string {

  switch (granularity) {

    case Granularity.Year:
      return getYear(date);

    case Granularity.Month:
      return getMonth(date);

    case Granularity.Week:
      return getWeek(date);

    case Granularity.Day:
      return getDay(date);
  }
}

function getYear(date: string): string {

  const options: Intl.DateTimeFormatOptions = {year: 'numeric'};

  return new Date(date).toLocaleString('default', options);
}

function getMonth(date: string): string {

  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short'};

  return new Date(date).toLocaleString('default', options);
}

function getWeek(date: string): string {

  const currentDate: Date = new Date(date);
  const firstYearDay: Date = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber: number = Math.ceil((((currentDate.getTime() - firstYearDay.getTime()) / 86400000) + firstYearDay.getDay() + 1) / 7);

  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short'};

  return `${new Date(date).toLocaleString('default', options)} Week ${weekNumber}`;
}

function getDay(date: string): string {

  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', weekday: 'long'};

  return new Date(date).toLocaleString('default', options);
}
