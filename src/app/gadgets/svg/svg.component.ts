import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Gadget } from 'app/core/gadget';
import { Svg } from 'app/core/svg';
import { SectionService } from "app/core/section.service";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {
  @Input() gadget: Svg;
  img: any = 'assets/server/plholder.svg';

  constructor(private renderer: Renderer2, private sectionServ: SectionService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.img = this.gadget.file;
  }

  prepare(svgElm: SVGElement) {
    this.gadget.setReady();
    const touchables = svgElm.getElementsByClassName('touchable');
    for(let i = 0; i < touchables.length; i++) {
      let touchable = touchables[i];
      this.renderer.listen(touchable, 'click', (evt) => {
        const state = this.sectionServ.currentState;
        console.log(state.behavior.onTouch);

        state.behavior.onTouch(touchable.id);
      })
    }
  }

}
