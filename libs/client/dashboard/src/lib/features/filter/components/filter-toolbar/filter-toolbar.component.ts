import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

import {Granularity} from "@dashboard/features/filter/models/granularities.model";

@Component({
  selector: 'filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterToolbarComponent implements OnInit {

  @Output() granularityChanged = new EventEmitter<Granularity>();

  private granularities: Granularity[] = Object.values(Granularity);
  private currentGranularity: Granularity = Granularity.Year;

  increaseDisabled: boolean = true;
  decreaseDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  increaseGranularity(): void {

    const newGranularity: Granularity = this.granularities[this.granularities.indexOf(this.currentGranularity) - 1];

    if (newGranularity)
      this.setGranularity(newGranularity);
  }

  decreaseGranularity(): void {

    const newGranularity: Granularity = this.granularities[this.granularities.indexOf(this.currentGranularity) + 1];

    if (newGranularity)
      this.setGranularity(newGranularity);
  }

  private setGranularity(newGranularity: Granularity): void {

    this.currentGranularity = newGranularity;
    this.actionsAvailability();

    this.granularityChanged.emit(this.currentGranularity);
  }

  private actionsAvailability(): void {

    this.increaseDisabled = this.currentGranularity === Granularity.Year;
    this.decreaseDisabled = this.currentGranularity === Granularity.Day;
  }
}
