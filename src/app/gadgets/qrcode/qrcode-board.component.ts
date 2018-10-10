import { Component, OnInit, Input } from '@angular/core';

import { Qrcode } from 'app/core/qrcode';

@Component({
  selector: 'app-qrcode-board',
  templateUrl: './qrcode-board.component.html',
  styleUrls: ['./qrcode-board.component.css']
})
export class QrcodeBoardComponent implements OnInit {

  @Input() gadget: Qrcode;

  constructor() { }

  ngOnInit() {
  }
}
