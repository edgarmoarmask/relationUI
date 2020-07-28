import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'profile-title',
  templateUrl: './profile-title.component.html',
  styleUrls: ['./profile-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileTitleComponent implements OnInit {

  @Input() name: string;
  @Input() type: string;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
