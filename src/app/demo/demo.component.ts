import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AnimationStateService } from '../services/animation-state/animation-state.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public defaultImage = 'http://files.benjaminjanderson.com/benjaminjandersonblob/demo-placeholder.png';

  public images = [
    {
      title: 'Color Test',
      imageSrc: 'http://files.benjaminjanderson.com/benjaminjandersonblob/demo-color-test.png',
      cssClass: 'color-test',
      routerLink: '/demo/color-test'
    },
    {
      title: 'Cashmere',
      imageSrc: 'http://files.benjaminjanderson.com/benjaminjandersonblob/demo-cashmere.png',
      cssClass: 'cashmere',
      routerLink: '/demo/cashmere'
    }];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
