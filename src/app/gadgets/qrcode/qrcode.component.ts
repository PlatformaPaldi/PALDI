import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Qrcode } from 'app/core/qrcode';
import { SectionService } from 'app/core/section.service';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  @Input() gadget: Qrcode;

  
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  enableCamera = true;

  avaliableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.scanner.cssClass = "['scanner']";
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.avaliableDevices = devices;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.selectedDevice = device;
      //         break;
      //     }
      // }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  ngAfterViewInit() {
    this.gadget.setReady();
  }

  camerasFoundHandler(cameras) {
    console.log('found', cameras);
    this.enableCamera = false;
    this.scanner.startScan(cameras[1]);
  } 

  scanSuccessHandler(event) {
    console.log('success', event);
    this.enableCamera = false;
    //this.showQuestion(event);

    //Globals[pagename] = event?
  }


  scanErrorHandler(event) {
    console.log('error', event);
  }

  scanFailureHandler(event) {
    console.log('failure', event);
  }

  scanCompleteHandler(event) {
    console.log('complete', event);
  }

  selectDevice(deviceID) {
    this.selectedDevice = this.scanner.getDeviceById(deviceID);
  }
}
