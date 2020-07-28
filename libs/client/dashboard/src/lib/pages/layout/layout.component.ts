import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  AfterViewInit, ChangeDetectorRef,
  Injector
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {ModuleLoaderService, ScreenSizeObserverService} from "@eagleye/client/services";

import {DocumentApiService} from "@dashboard/api/document-api.service";
import {EntityApiService} from "@dashboard/api/entity-api.service";

import {LAYOUT_ROUTE_NAME} from "@dashboard/constants/routes";

import {ENTITY_STATE_SERVICES} from "@dashboard/state/entity";
import {EVENT_STATE_SERVICES} from "@dashboard/state/event";
import {DOCUMENT_STATE_SERVICES} from "@dashboard/state/document";
import {RELATIONS_STATE_SERVICES} from "@dashboard/state/relations";
import {MENTIONS_STATE_SERVICES} from "@dashboard/state/mentions";

import {TViewType} from "@dashboard/pages/layout/model";
import {getCanvasModule} from "@dashboard/pages/layout/helpers";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DocumentApiService, EntityApiService,
    ENTITY_STATE_SERVICES,
    EVENT_STATE_SERVICES,
    DOCUMENT_STATE_SERVICES,
    RELATIONS_STATE_SERVICES,
    MENTIONS_STATE_SERVICES
  ]
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasArea', {read: ViewContainerRef}) canvasArea: ViewContainerRef;
  @ViewChild('desktopFilterPane', {read: ViewContainerRef}) desktopFilterPane: ViewContainerRef;
  @ViewChild('mobileFilterPane', {read: ViewContainerRef}) mobileFilterPane: ViewContainerRef;

  folderName$: Observable<string>;

  selectedView: TViewType = 'graph';

  isDesktop$: Observable<boolean> = this.screenSizeObserver.isDesktopScreen$();

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private screenSizeObserver: ScreenSizeObserverService,
    private moduleLoaderService: ModuleLoaderService) {
  }

  ngOnInit() {

   this.initFolderName();
  }

  ngAfterViewInit() {

    this.loadCanvasArea('graph');
    this.loadFilterArea();
  }

  changeCanvasView(view: TViewType): void {

    this.selectedView = view;

    this.loadCanvasArea(view);
  }

  private initFolderName(): void {

    this.folderName$ = this.route.params.pipe(
      map(params => params[LAYOUT_ROUTE_NAME])
    );
  }

  private async loadFilterArea() {

    if (this.screenSizeObserver.isDesktopScreen()) {
      this.loadDesktopFilterArea();
    } else {
      this.loadMobileFilterArea();
    }

    this.cdr.markForCheck();
  }

  private async loadCanvasArea(view: TViewType) {

    this.canvasArea.clear();

    const {MainComponent, AreaModule} = await getCanvasModule(view);

    const factory = await this.moduleLoaderService.createComponentFactoryByModule(AreaModule, MainComponent);

    this.canvasArea.createComponent(factory, null, this.injector);

    this.cdr.markForCheck();
  }

  private async loadDesktopFilterArea() {

    this.desktopFilterPane.clear();

    const {FilterContainerComponent, FilterModule} = await import('@dashboard/features/filter/desktop');
    const factory = await this.moduleLoaderService.createComponentFactoryByModule(FilterModule, FilterContainerComponent);

    this.desktopFilterPane.createComponent(factory);
  }

  private async loadMobileFilterArea() {

    this.mobileFilterPane.clear();

    const {FilterContainerComponent, FilterModule} = await import('@dashboard/features/filter/mobile');
    const factory = await this.moduleLoaderService.createComponentFactoryByModule(FilterModule, FilterContainerComponent);

    this.mobileFilterPane.createComponent(factory);
  }
}
