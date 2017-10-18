import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';

import { D3Service, D3, D3DragEvent, D3ZoomEvent, Selection } from 'd3-ng2-service';

export interface ColorScore {
  age: number;
  gender: string;
  score: number;
}

@Component({
  selector: 'app-color-test-graph',
  template: '<svg></svg>',
  styleUrls: ['./color-test-graph.component.scss']
})
export class ColorTestGraphComponent implements OnDestroy {
  _data: Array<ColorScore>;
  get data(): Array<ColorScore> {
    return this._data;
  }

  @Input('data')
  set allowDay(value: Array<ColorScore>) {
    if (value) {
      this._data = value;
      this.bindGraph();
    }
  }

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private d3G: Selection<SVGGElement, any, null, undefined>;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnDestroy() {
    if (this.d3Svg && this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }

  private bindGraph() {
    const d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    const d3G: Selection<SVGGElement, any, null, undefined>;

    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement);

      this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

      const data = this._data;

      const margin = { top: 20, right: 15, bottom: 60, left: 60 }
        , width = 960 - margin.left - margin.right
        , height = 500 - margin.top - margin.bottom;

      const getX = (score: ColorScore) => score.score;
      const getY = (score: ColorScore) => score.age;
      const x = d3.scaleLinear()
        .domain([d3.min(data, getX) - 2, d3.max(data, getX)])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([d3.min(data, getY) - 2, d3.max(data, getY)])
        .range([height, 0]);

      const chart = this.d3Svg
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'chart');

      const main = chart.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'main');

      // draw the x axis
      const xAxis = d3.axisBottom(x);

      main.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'main axis date')
        .call(xAxis);

      // draw the y axis
      const yAxis = d3.axisLeft(y);

      main.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'main axis date')
        .call(yAxis);

      const g = main.append('svg:g');

      const tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('background-color', '#FFF')
        .style('padding', '5px')
        .style('border', '1px solid #333')
        .style('visibility', 'hidden')
        .text('a simple tooltip');

      g.selectAll('scatter-dots')
        .data(data)
        .enter()
        .append('svg:circle')
        .attr('cx', function (d, i) { return x(getX(d)); })
        .attr('cy', function (d) { return y(getY(d)); })
        .style('fill', function (d) {
          return d.gender === 'M' ? '#6F6FFF' : '#FFD0D0';
        })
        .attr('r', 5)
        .on('mouseover', function (d) {
          tooltip.text(`age:${d.age} gender:${d.gender} score:${d.score}`);
          return tooltip.style('visibility', 'visible');
        })
        .on('mousemove', function () {
          return tooltip.style('top',
            (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
        })
        .on('mouseout', function () { return tooltip.style('visibility', 'hidden'); });
    }
  }
}
