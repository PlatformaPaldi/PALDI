import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'app/core/state.service';
import { State } from "app/core/state";
import { ISlimScrollOptions } from 'ng2-slimscroll';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('scroll') scrollRef: ElementRef;
  height: number;
  width: number;

  state: State;
  opts: ISlimScrollOptions;

  constructor(private stateServ: StateService) {
    this.state = this.stateServ.current;
  }

  ngOnInit() {
    this.opts = {
      // position: 'right',
      // barOpacity: '0.3',
      // barWidth: '6',
      // barMargin: '0 -10px',
      // gridMargin: '0 -10px'
    };
    this.resize();
  }

  resize() {
    // let scrollElm: HTMLElement = this.scrollRef.nativeElement;
    // let parent: HTMLElement = scrollElm.parentElement;
    // let height = parent.offsetParent.getBoundingClientRect().height;
    // this.width = scrollElm.offsetParent.getBoundingClientRect().width;
    // this.height = height;
    // this.height = scrollElm.offsetParent.getBoundingClientRect().height;
    // this.width = scrollElm.offsetParent.getBoundingClientRect().width;
    // console.log(this.height, this.width);
    
  }

}