import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  ViewEncapsulation,
  ContentChild,
  TemplateRef
} from '@angular/core';

import {BaseChartComponent, calculateViewDimensions, ColorHelper, DataItem, ViewDimensions} from "@swimlane/ngx-charts";

import {scaleLinear, scaleTime, scaleBand} from 'd3-scale';
import {brushX} from 'd3-brush';
import {select, event as d3event} from 'd3-selection';

import {IChartPoint} from "@dashboard/features/filter/models/chart.series.model";


@Component({
  selector: 'filter-chart',
  templateUrl: './filter-chart.component.html',
  styleUrls: ['./filter-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FilterChartComponent extends BaseChartComponent {

  @Input('series') results: IChartPoint[];
  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: string = 'right';
  @Input() xAxis: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() activeEntries: any[] = [];
  @Input() scheme: any = {domain: ['#ab344c']};
  @Input() schemeType: string;
  @Input() trimXAxisTicks: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() maxYAxisTickLength: number = 16;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() barPadding = 8;
  @Input() roundDomains: boolean = false;
  @Input() roundEdges: boolean = false;
  @Input() yScaleMax: number;
  @Input() yScaleMin: number;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;

  @Output() pointClick = new EventEmitter<IChartPoint[]>();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  colors: ColorHelper;
  margin: any[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: any;
  dataLabelMaxHeight: any = { negative: 0, positive: 0 };

  update(): void {
    super.update();

    this.activeEntries = [];

    if (!this.showDataLabel) {
      this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType,
      legendPosition: this.legendPosition
    });

    this.formatDates();

    if (this.showDataLabel) {
      this.dims.height -= this.dataLabelMaxHeight.negative;
    }
    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
  }

  getXScale(): any {
    this.xDomain = this.getXDomain();
    const spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
    return scaleBand().range([0, this.dims.width]).paddingInner(spacing).domain(this.xDomain);
  }

  getYScale(): any {
    this.yDomain = this.getYDomain();
    const scale = scaleLinear().range([this.dims.height, 0]).domain(this.yDomain);
    return this.roundDomains ? scale.nice() : scale;
  }

  getXDomain(): any[] {
    return this.results.map(d => d.label);
  }

  getYDomain(): [number, number] {
    const values = this.results.map(d => d.value);

    let min = this.yScaleMin ? Math.min(this.yScaleMin, ...values) : Math.min(0, ...values);
    if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
      min = Math.min(min, ...this.yAxisTicks);
    }

    let max = this.yScaleMax ? Math.max(this.yScaleMax, ...values) : Math.max(0, ...values);
    if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
      max = Math.max(max, ...this.yAxisTicks);
    }
    return [min, max];
  }

  onClick(data: DataItem) {

    this.setPointSelection(data);

    this.pointClick.emit(this.activeEntries);
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions() {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined,
      position: this.legendPosition
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.xDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.yDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onDataLabelMaxHeightChanged(event) {
    if (event.size.negative) {
      this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
    } else {
      this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
    }
    if (event.index === this.results.length - 1) {
      setTimeout(() => this.update());
    }
  }

  setPointSelection(item, fromLegend = false) {

    item = this.results.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    if (idx > -1) {
      this.activeEntries.splice(idx, 1);

      this.activeEntries = [...this.activeEntries];
    } else {

      this.activeEntries = [item, ...this.activeEntries];
    }
  }
}
