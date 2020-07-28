import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter} from "rxjs/operators";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() label: string = '';

  @Output() onInputChanged = new EventEmitter<string>()

  @ViewChild('searchInput', {static: true, read: ElementRef}) searchInput: ElementRef;

  constructor() { }

  ngOnInit(): void {

    this.initSearch();
  }

  private initSearch(): void {

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(_ => {

        this.onInputChanged.emit(this.searchInput.nativeElement.value);
      });
  }
}
