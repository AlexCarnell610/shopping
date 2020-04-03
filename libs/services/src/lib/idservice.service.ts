import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IDService {
  private ids$: Observable<number[]> = new Observable();
  private nextId;

  constructor() {
    this.ids$.pipe(map(ids => {
      this.nextId = this.findNextId(ids);
    }))
  }

  public setIds(idsInp: Observable<number[]>) {
    this.ids$ = idsInp;
  }

  public getNextId$(): Observable<number> {
    return this.ids$.pipe(
      map((ids) => {
        return this.findNextId(ids);
      })
    );
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
