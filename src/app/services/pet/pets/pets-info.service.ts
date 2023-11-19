import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsInfoService {
  getPetsInfo(): import("rxjs").Observable<import("../../../models/pets").PetsInfo[]> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
