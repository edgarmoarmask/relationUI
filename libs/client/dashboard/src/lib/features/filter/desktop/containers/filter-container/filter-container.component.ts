import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";
import {EntityGroupsService} from "@dashboard/state/entity/entity-groups";

import {IChartPoint} from "@dashboard/features/filter/desktop/models/chart.series.model";
import {Granularity} from "@dashboard/features/filter/desktop/models/granularities.model";

import {configureChartSeries} from "@dashboard/features/filter/desktop/helpers/chart-series";
import {getPointsIds} from "@dashboard/features/filter/desktop/helpers/chart-points";


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
    private entityGroupsService: EntityGroupsService,
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
      this.entityGroupsService.getOriginalDateGroups(),
      this.selectedGranularity
    );

    this.entityFilter.removeDateFilter();
  }

  private initFilter(): void {

    this.entityGroupsService.getGroupedEntitiesByDates$()
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

    const ids: string[] = getPointsIds(points);

    if (ids.length > 0)
      this.entityFilter.setDateFilter(ids);
    else
      this.entityFilter.removeDateFilter();
  }
}
