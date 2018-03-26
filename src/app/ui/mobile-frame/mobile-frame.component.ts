import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-mobile-frame',
  templateUrl: './mobile-frame.component.html',
  styleUrls: ['./mobile-frame.component.css']
})
export class MobileFrameComponent implements OnInit {
  @Input() width = '400px';
  @Input() height = '600px';

  constructor() { }

  ngOnInit() {
  }

}