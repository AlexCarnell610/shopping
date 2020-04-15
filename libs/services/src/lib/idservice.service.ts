import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IDService {
  private ids: number[] = []
  private nextId;

  constructor() {}

  public setId(idsInp: number[]) {
    this.nextId = this.findNextId(idsInp)
  }

  public async getNextId(): Promise<number>{
    return await this.nextId
  }

  private findNextId(ids: number[]): number{
    ids.sort();
    let noSkips: boolean = true;
    for (let i = 0; i < ids.length - 1; i++) {
      if (ids[i] + 1 !== ids[i + 1]) {
        noSkips = false;
        return ids[i] + 1;
      }
    }
    if (noSkips) {
      return ids[ids.length - 1] + 1;
    }
  }
}
