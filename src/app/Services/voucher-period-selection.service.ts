
import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherPeriodSelectionService {

  constructor(private http:HttpClient) { }
   baseURL=environment.URL;

   GetVoucherType(data:any)
    {
     return this.http.post(this.baseURL +'VoucherPeriodSelection/GetVoucherType',data);
 
    }

  GetPeriod(data:any)
  {
     return this.http.post(this.baseURL +'VoucherPeriodSelection/GetPeriod',data);
 
  }
}
