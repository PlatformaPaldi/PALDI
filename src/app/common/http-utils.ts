import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class HttpUtils {

  static extractData(res: Response) {
    if (res.status < 200 || res.status >= 400) {
      throw new Error('Bad server response status: ' + res.status);
    }
    return res.json() || {};
  }

  static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}