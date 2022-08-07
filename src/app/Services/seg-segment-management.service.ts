import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegSegmentManagementService {

  constructor(private http:HttpClient) { }
  
  baseURL=environment.URL;

  LoadDataValues(data:any)
  {
     return this.http.post(this.baseURL +'SegmentManagement/GetDataValueById',data);
 
  }
}
