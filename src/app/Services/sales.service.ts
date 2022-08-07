import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient) { }

  baseURL=environment.URL;


  GetInvoiceNo(data:any)
  {
     return this.http.post(this.baseURL +'SaleInvoice/GetInvoiceNo',data);
 
  }
  LoadMaster(data:any)
  {
     return this.http.post(this.baseURL +'SaleInvoice/LoadMaster',data);
 
  }
  SaveMaster(data:any)
  {
     return this.http.post(this.baseURL +'SaleInvoice/SaveMaster',data);
 
  }
}
