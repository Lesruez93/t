import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GsService {

  private value: any;
  constructor() {}

  public setParams(value) {
    this.value = value;
  }

  getParams() {
    return this.value;
  }}
