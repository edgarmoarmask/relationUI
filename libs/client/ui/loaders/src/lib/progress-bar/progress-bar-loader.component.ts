import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'progress-bar-loader',
  templateUrl: './progress-bar-loader.component.html',
  styleUrls: ['./progress-bar-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarLoaderComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
