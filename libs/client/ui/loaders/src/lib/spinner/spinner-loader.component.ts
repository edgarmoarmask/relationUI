import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerLoaderComponent implements OnInit {

  @Input() size: number = 20;
  @Input() centered: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
