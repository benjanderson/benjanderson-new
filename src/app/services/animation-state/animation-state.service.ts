import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnimationStateService extends Subject<AnimationState> {
  constructor() {
    super();
   }

   public emit(value: AnimationState) { super.next(value); }
}

export interface AnimationState {
  name: string;
  $event: any;
}
