import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.css']
})
export class CrumbsComponent implements OnInit, OnChanges {
  @Input() url: string;
  paramsArr: string[];

  mainParams = ["sources", "databases", "tables", "columns"]
  constructor() { }

  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges) {
    this.url = changes.url.currentValue;
    this.paramsArr = this.url?.substring(1).split('?')[0].split('/');
  }

  checkMain(param): boolean {
    return this.mainParams.indexOf(param) > -1;
  }

  getHref(item): string {
    return this.url?.split(item)[0] + item
  }
}
