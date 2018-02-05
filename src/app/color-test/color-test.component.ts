import { Component, OnInit, HostBinding, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { sampleSize } from 'lodash';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { D3Service, D3, D3DragEvent, D3ZoomEvent, Selection } from 'd3-ng2-service';
import { ColorScore } from '../color-test-graph/color-test-graph.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

class Color {
  public incorrect: boolean;

  public enabled: boolean;

  public message: string;

  constructor(public ordinal: number, public red: number, public green: number, public blue: number) {
    this.enabled = true;
  }
}

class ColorArray {
  public Color1: Color;
  public Color2: Color;
  public Colors: Array<Color>;
}

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrls: ['./color-test.component.scss']
})
export class ColorTestComponent implements OnInit {
  private numElements = 13;
  public colorArray1: ColorArray = {
    Color1: new Color(-1, 172, 118, 114),
    Color2: new Color(this.numElements, 143, 140, 74),
    Colors: []
  };

  public colorArray2: ColorArray = {
    Color1: new Color(-1, 143, 140, 74),
    Color2: new Color(this.numElements, 84, 151, 137),
    Colors: []
  };

  public colorArray3: ColorArray = {
    Color1: new Color(-1, 84, 151, 137),
    Color2: new Color(this.numElements, 128, 136, 165),
    Colors: []
  };

  public colorArray4: ColorArray = {
    Color1: new Color(-1, 128, 136, 165),
    Color2: new Color(this.numElements, 172, 118, 114),
    Colors: []
  };

  public helpVisible = true;

  public scoreVisible = false;

  public graphVisible = false;

  public disableSubmit = false;

  public score: number;

  public clickCount = 0;

  public age: number;

  public gender = 'M';

  public data: Array<ColorScore>;

  private colorScoreSubscription: Subscription;

  constructor(private http: Http, private db: AngularFirestore) { }

  ngOnInit() {
    const setColor = (index: number, array: ColorArray): Color => {
      if (index === 0) {
        return array.Color1;
      }
      if (index === this.numElements - 1) {
        return array.Color2;
      }

      const rAvg = (array.Color2.red - array.Color1.red) / this.numElements;
      const gAvg = (array.Color2.green - array.Color1.green) / this.numElements;
      const bAvg = (array.Color2.blue - array.Color1.blue) / this.numElements;
      const red = Math.floor(array.Color1.red + (rAvg * index));
      const green = Math.floor(array.Color1.green + (gAvg * index));
      const blue = Math.floor(array.Color1.blue + (bAvg * index));
      return new Color(index - 1, red, green, blue);
    };

    for (let i = 1; i < this.numElements; i++) {
      this.colorArray1.Colors.push(setColor(i, this.colorArray1));
      this.colorArray2.Colors.push(setColor(i, this.colorArray2));
      this.colorArray3.Colors.push(setColor(i, this.colorArray3));
      this.colorArray4.Colors.push(setColor(i, this.colorArray4));
    }

    this.randomizeColors();
  }

  public getStyle(color: Color) {
    return {
      'background-color': 'rgb(' + color.red + ', ' + color.green + ', ' + color.blue + ')'
    };
  }

  public hideHelp() {
    this.helpVisible = false;
  }

  public showHelp() {
    this.helpVisible = true;
  }

  public scoreTest() {
    const scoreColor = (colorArray: ColorArray): number => {
      return colorArray.Colors
        .map((color: Color, index: number): number => {
          color.enabled = false;
          if (index !== color.ordinal) {
            color.incorrect = true;
            color.message = `guess position: ${index} actual: ${color.ordinal}`;
            return 0;
          }

          return 1;
        })
        .reduce((prev: number, curr: number) => prev + curr);
    };

    const s1 = scoreColor(this.colorArray1);
    const s2 = scoreColor(this.colorArray2);
    const s3 = scoreColor(this.colorArray3);
    const s4 = scoreColor(this.colorArray4);

    this.score = (s1 + s2 + s3 + s4) / (this.numElements * 4);
    this.scoreVisible = true;
  }

  public submitScore() {
    this.disableSubmit = true;
    const score = { age: this.age, gender: this.gender, score: this.score, clicks: this.clickCount };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.graphVisible = true;
    this.db.collection('colorStats').add(score).then(() => {
      this.graphVisible = true;

      const observable: Observable<any> = this.db.collection('colorStats', (ref) => ref
        .where('clicks', '>', 20))
        .valueChanges();
      this.colorScoreSubscription = observable.map((value: Array<ColorScore>) => {
        this.data = value;
        this.graphVisible = true;
        this.colorScoreSubscription.unsubscribe();
      })
      .catch(this.handleError)
      .subscribe();
    })
    .catch(this.handleError);
  }

  public reset() {
    this.scoreVisible = false;
    this.graphVisible = false;
    this.disableSubmit = false;
    this.score = null;
    this.age = null;
    this.clickCount = 0;
    this.randomizeColors();
    const resetColor = (colorArray: ColorArray) => {
      colorArray.Colors
        .map((color: Color, index: number) => {
          color.enabled = true;
          color.incorrect = false;
          color.message = null;
        });
    };

    resetColor(this.colorArray1);
    resetColor(this.colorArray2);
    resetColor(this.colorArray3);
    resetColor(this.colorArray4);
  }

  public countClick() {
    this.clickCount++;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = (<any>body).error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      // this.appinsightsService.trackException(new Error(errMsg));
    } else {
      errMsg = error.message ? error.message : error.toString();
      // this.appinsightsService.trackException(error);
    }
    console.error(errMsg);
    alert('something went horribly wrong, please try again later');
    return Observable.throw(errMsg);
  }

  private randomizeColors() {
    this.colorArray1.Colors = sampleSize(this.colorArray1.Colors, this.colorArray1.Colors.length);
    this.colorArray2.Colors = sampleSize(this.colorArray2.Colors, this.colorArray2.Colors.length);
    this.colorArray3.Colors = sampleSize(this.colorArray3.Colors, this.colorArray3.Colors.length);
    this.colorArray4.Colors = sampleSize(this.colorArray4.Colors, this.colorArray4.Colors.length);
  }
}

