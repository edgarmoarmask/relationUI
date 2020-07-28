import { Injectable } from '@angular/core';

import {ToastrService} from "ngx-toastr";

import {INotification} from "../model";
import {DEFAULT_CONFIG} from "../config";

@Injectable()
export class NotifierService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(): void {
  }

  showInfo(): void {
  }

  showWarning(): void {
  }

  showError(config: INotification): void {

    this.toastrService.error(
      config.message, config.title,
      DEFAULT_CONFIG
    );
  }
}
