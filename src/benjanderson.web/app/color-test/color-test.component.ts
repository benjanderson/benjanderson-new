import { Component, OnInit } from '@angular/core';
import { sampleSize } from 'lodash';

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrls: ['./color-test.component.scss']
})
export class ColorTestComponent implements OnInit {
  public colorArray1: ColorArray= {
      Color1: new Color(172, 118, 114),
      Color2: new Color(143, 140, 74),
      Colors: []
    };

  public colorArray2: ColorArray= {
      Color1: new Color(143, 140, 74),
      Color2: new Color(84, 151, 137),
      Colors: []
    };

  public colorArray3: ColorArray= {
      Color1: new Color(84, 151, 137),
      Color2: new Color(128, 136, 165),
      Colors: []
    };

  public colorArray4: ColorArray= {
      Color1: new Color(128, 136, 165),
      Color2: new Color(172, 118, 114),
      Colors: []
    };

  private numElements = 13;

  public showHelp = true;

  constructor() { }

  ngOnInit() {
    for (let i = 1; i < this.numElements; i++) {
      this.colorArray1.Colors.push(this.setColor(i, this.colorArray1));
      this.colorArray2.Colors.push(this.setColor(i, this.colorArray2));
      this.colorArray3.Colors.push(this.setColor(i, this.colorArray3));
      this.colorArray4.Colors.push(this.setColor(i, this.colorArray4));
    }

    this.colorArray1.Colors = sampleSize(this.colorArray1.Colors, this.colorArray1.Colors.length);
    this.colorArray2.Colors = sampleSize(this.colorArray2.Colors, this.colorArray2.Colors.length);
    this.colorArray3.Colors = sampleSize(this.colorArray3.Colors, this.colorArray3.Colors.length);
    this.colorArray4.Colors = sampleSize(this.colorArray4.Colors, this.colorArray4.Colors.length);
  }

  public getStyle(color: Color) {
    return {
      'background-color': 'rgb(' + color.red + ', ' + color.green + ', ' + color.blue + ')'
    };
  }

  public hideHelp(){
    this.showHelp = false;
  }

  private setColor(index: number, array: ColorArray): Color {
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
    return new Color(red, green, blue);
  }
}

class Color {
  constructor(public red: number, public green: number, public blue: number) { }
}

class ColorArray {
  public Color1: Color;
  public Color2: Color;
  public Colors: Array<Color>;
}
