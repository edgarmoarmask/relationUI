import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {IChartPoint} from "@dashboard/features/filter/models/chart.series.model";

import {EntityMentionsService} from "@dashboard/state/mentions/entity-mentions.service";
import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";

import {configureChartSeries} from "@dashboard/features/filter/helpers/chart-series";
import {Granularity} from "@dashboard/features/filter/models/granularities.model";


@UntilDestroy()
@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent implements OnInit {

  selectedGranularity: Granularity = Granularity.Year;

  chartSeries: IChartPoint[];

  constructor(
    private cdr: ChangeDetectorRef,
    private entityMentionsService: EntityMentionsService,
    private entityFilter: ChosenEntityFilter) {
  }

  ngOnInit() {
    this.initFilter();
  }

  onPointClick(points: IChartPoint[]): void {

    this.setFilter(points);
  }

  onGranularityChanged(granularity: Granularity): void {

    this.selectedGranularity = granularity;

    this.chartSeries = configureChartSeries(
      this.entityMentionsService.getOriginalDateGroups(),
      this.selectedGranularity
    );

    this.entityFilter.removeDateFilter();
  }

  private initFilter(): void {

    this.entityMentionsService.getGroupedEntitiesByDates$()
      .pipe(untilDestroyed(this))
      .subscribe(dateGroups => {

        this.chartSeries = configureChartSeries(dateGroups, this.selectedGranularity);

        this.cdr.markForCheck();
      });
  }

  private setFilter(points: IChartPoint[]): void {

    if (points.length === 0) {

      this.entityFilter.removeDateFilter();
      return;
    }

    const ids: string[] = this.getEntitiesIds(points);

    if (ids.length > 0)
      this.entityFilter.setDateFilter(ids);
    else
      this.entityFilter.removeDateFilter();
  }

  private getEntitiesIds(points: IChartPoint[]): string[] {

    let ids: string[] = [];

    points.forEach(point => {

      if (point.extra.entities.length > 0)
        ids = [...ids, ...point.extra.entities];
    });

    if (ids.length > 0)
      ids = [...new Set(ids)];

    return ids;
  }
}
