import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'profile-relations',
  templateUrl: './profile-relations.component.html',
  styleUrls: ['./profile-relations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileRelationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
