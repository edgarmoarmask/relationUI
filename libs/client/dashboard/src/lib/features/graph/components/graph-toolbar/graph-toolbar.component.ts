import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {TAnimationState} from "@dashboard/features/graph/models/animation-state.model";

@Component({
  selector: 'graph-toolbar',
  templateUrl: './graph-toolbar.component.html',
  styleUrls: ['./graph-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphToolbarComponent implements OnInit {

  @Input() animationAvailable: boolean;

  @Output() arrange = new EventEmitter<void>();
  @Output() animate = new EventEmitter<TAnimationState>();
  @Output() clear = new EventEmitter<void>();
  @Output() zoomIn = new EventEmitter<void>();
  @Output() zoomOut = new EventEmitter<void>();

  isAnimationEnabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  startAnimation(): void {

    this.isAnimationEnabled = true;

    this.animate.emit('start');
  }

  stopAnimation(): void {

    this.isAnimationEnabled = false;

    this.animate.emit('stop');
  }
}
