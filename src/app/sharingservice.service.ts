import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharingserviceService {
private _share= new Subject<string>();
share$= this._share.asObservable();
senddata(message:string){
  this._share.next(message);
}
  constructor() { }
}