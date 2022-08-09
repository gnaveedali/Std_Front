import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetailData, MasterData } from 'src/app/SalesClass/SaleInvoice';
import { SalesService } from 'src/app/Services/sales.service';
import { MatPaginator } from "@angular/material/paginator"
import { SegSegmentManagementService } from 'src/app/Services/seg-segment-management.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { timeout } from 'rxjs-compat/operator/timeout';
import { VoucherPeriodSelectionService } from 'src/app/Services/voucher-period-selection.service';
import * as moment from 'moment';



@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.scss']
})


export class SaleInvoiceComponent implements OnInit {

  @ViewChild('openPeriodSelectionModal') openPeriodSelectionModal!: TemplateRef<any>;

  
  
  GRDData = new MatTableDataSource();
 
  constructor(private router: Router,
    private saleServices:SalesService,
    private sm:SegSegmentManagementService,
    private voucherService:VoucherPeriodSelectionService,
    private fb:FormBuilder,
    private toaster: ToastrService,
    public dialog: MatDialog,
    ) { }

  

     // Objects
  CartColor: any;
  DataSource: any;
  LOVSource: any;
  PeriodSource:any;
  SMS: any;
  WareHouseData:any;
  SalesManData:any;
  InvoiceTypeData:any;
  SelectedDate:any;
  minDate:any;
  maxDate :any;
  InvoiceType:number =0;
  AddorEdit:string='ADD';
  // Btn
  btnNew: boolean = true;
  btnEdit: boolean = true;
  btnDelete: boolean = false;
  btnSave: boolean = false;
  btnFind: boolean = true;
  btnCancel: boolean = false;
  btnLOV: boolean = false;
  btnAttachBarcode: boolean = false;
  btnBarcodePrint: boolean = false;
  Locked: boolean = false;
  ReadOnly: boolean = false;
  filedlock: boolean = true;
  DefaultSaleTaxPercentage:number = 17.0;
  PeriodID:number =0;
  
  //Pagination
  currentIndex = 0;
  page = 1;
  count = 0;
  tableSize = 1;
  tableSizes = [3, 6, 9, 12];
  Index = 0;
  ItemCode: string = '';
  ItemDescription: string = '';

  //Footer Master Value
  TotalSalesTaxPercentage: number = 0;
  TotalSalesTaxAmt: number = 0;
  TotalDiscountAmt: number = 0;
  TotalQuantity: number = 0;
  TotalValue: number = 0;
  TotalInvoiceAmount: number = 0;
  // employeeForm: FormGroup;
  counter: number = 0;
  remove: boolean = false;
  Value: number = 0;
  DisPer: number = 0;
  DisAmt: number = 0;
  NetValue: number = 0;

  MasterData = new MasterData();
  masterData: MasterData[] = [];
  DetailData = new DetailData();
  detailData: DetailData[] = [];
  filterData: DetailData[] = [];

  displayColumns = [
    'id',
    'ItemCode',
    'Description',
    'Stock',
    'Qty',
    'Rate',
    'IssueRate',
    'RateEnt',
    'CostOfSales',
    'DiscountPercentage',
    'DiscountAmount',
    'Value',
    'NetValue',
    'SalesOrderItemID',
    'Remove'
  ];


  SeleInvoiceForm: FormGroup = this.fb.group(
    {
      // Master Data
      InvoiceID: ['Invoice ID', [Validators.required]],
      InvoiceNo: ['Invoice No', [Validators.required]],
      InvoiceDate: ['Invoice Date', [Validators.required]],
      InvoiceType:['0', [Validators.required]],
      WareHouse: ['Ware House'],
      Saleman: ['Saleman'],
      CustomerId: ['Customer ID', [Validators.required]],
      CustomerName: ['Customer Name'],
      RefrenceNo: ['Refrence No'],
      CustomerAddress: ['Customer Address'],
      EmailAddress:['Email Address'],
      ContactNo: ['Contact No'],
      STNNo: ['STN No'],
      NTNNo: ['NTN No'],
      Remarks: ['Remarks'],
      //Footer Data
      TotalQuantity: ['0.00'],
      TotalValue: ['0.00'],
      FreightAmount: ['0.00'],
      DiscountPercentage: ['0.00'],
      DiscountAmount: ['0.00'],
      SaleTaxPercentage: ['0.00'],
      SalesTaxAmount:['0.00'],
      InvoiceAmount:['0.00'],
      // GRD Data
      'GRD': this.fb.array([
        this.addGRDFormGroup()
      ])
    });

   

    addGRDFormGroup(): FormGroup {
      return this.fb.group({
        ItemCode: ['', Validators.required],
        Description: [''],
        Stock: ['0.00', Validators.required],
        Qty: ['0.00', Validators.required],
        RateEnt: ['0.00', Validators.required],
        IssueRate: ['0.00', Validators.required],
        Rate: ['0.00', Validators.required],
        CostOfSales: ['0.00', Validators.required],
        DiscountPercentage: ['0.00'],
        DiscountAmount: ['0.00' ],
        Value: ['0.00', Validators.required],
        NetValue: ['0.00', Validators.required],
        SalesOrderItemID: ['0']
       
      });
    }

  
  ngOnInit(): void {
    this.GetVoucherType();
    this.getDataValues();
   
   
  }
  ngAfterViewInit()
  {
     this.PeriodSelectionModal()
   
  }
  PeriodSelectionModal(): void {
    
    this.dialog.open(this.openPeriodSelectionModal, {
      width: '280px',
      height: '300px',
      disableClose: true,
     
    });
    
}
Close():boolean
{

if(this.SelectedDate == undefined)
{
  this.toaster.error('Please Select Invoice Date','Period Selection', {timeOut: 2000})
  return  false;
}

else if(this.SeleInvoiceForm.value.InvoiceType == null)
 {
  
 this.toaster.error('Please Select Invoice Type','Period Selection', {timeOut: 2000})
 return  false;
 }
 else{
  this.SeleInvoiceForm.get('InvoiceDate')?.setValue(this.SelectedDate);
  
  const key={
    FrontDate:this.SelectedDate,
  }

  this.voucherService.GetPeriod(key).subscribe(data=>
  {
    this.PeriodSource = data;
  
 
    if(this.PeriodSource.length == 0)
    {
      this.toaster.error('Period is not define or has been closed for entry','Period Selection', {timeOut: 2000})
     
    }
    else{
     
      this.minDate = this.PeriodSource.periodStDate; 
      this.maxDate= this.PeriodSource.periodEnDate; 
      this.PeriodID = this.PeriodSource.sPeriod;
      this.dialog.closeAll(); 
      this.BlankMaster();
    }
  });

    return  true; 
}

}


Cancel():void
{

  this.router.navigate(['home']);
  this.dialog.closeAll();
}
 
  // openDialog() {
  //   const dialogRef = this.dialog.open(UserLoginComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  LoadMaster() {
  
    this.saleFormArray.clear();
    this.masterData = [];
    this.detailData = [];
    const key={
      PeriodId:202212,
    }

    this.saleServices.LoadMaster(key).subscribe(data=>{
      this.DataSource=data;
    
     
      for (let i = 0; i < this.DataSource.length; i++) {
        this.masterData.push(this.DataSource[i].InvoiceId)
      }
      this.onTableDataChange(1)
    })

    this.ButtonCancel();
   
  }
  BlankMaster()
  {
    let data:any;
    this.SeleInvoiceForm.reset();
    this.saleFormArray.clear();
    this.masterData = [];
    this.detailData = [];

    console.log(this.SeleInvoiceForm.value)
    const key={
      InvoiceDate: this.SelectedDate,
      InvoiceType: this.InvoiceType,
    }
    this.saleServices.GetInvoiceNo(key).subscribe(res=> 
    {
        data = res;
        this.SeleInvoiceForm.get('InvoiceNo')?.setValue(data[0].InvoiceNo);
     
    });

    
    const Inv={
      InvoiceId:1
    }
   
    const row = this.fb.group({
      'ItemCode': null,
      'Description': null,
      'Stock': 10,
      'Qty': 0,
      'Rate': 0,
      'IssueRate': 0,
      'RateEnt': 0,
      'CostOfSales': 0,
      'DiscountPercentage': 0,
      'DiscountAmount': 0,
      'Value': 0,
      'NetValue':0,
      'SalesOrderItemID':0,
      });
      this.SeleInvoiceForm.get('InvoiceDate')?.setValue(this.SelectedDate);

      this.masterData.push(Inv);
      this.saleFormArray.push(row);
      this.GRDData.data = this.saleFormArray.controls;
      this.CountTotal();
      this.ButtonNew();
  }

  
  get saleFormArray(): FormArray {
    return this.SeleInvoiceForm.get('GRD') as FormArray;
  }

  getActualIndex(index: number) {

    return index;
  }

  addRow(Index : number) {
      
    var compareItem = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(Index) as FormGroup).get('ItemCode');
   
     for (let i =0; i< this.saleFormArray.length-1;i++)
     {
      var ItemCode = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(i) as FormGroup).get('ItemCode');
     
      if(ItemCode?.value === compareItem?.value )
      {
       var OldQty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(i) as FormGroup).get('Qty');
      
       let IncreQty : number = 1;
        let Qty: number = parseFloat(OldQty?.value)+ IncreQty;
        ((this.SeleInvoiceForm.get('GRD') as FormArray).at(i) as FormGroup).get('Qty')?.patchValue(Qty);
        
         this.removeRow(Index);
       }
      }

        const row = this.fb.group({
        'ItemCode': null,
        'Description': null,
        'Stock': 10,
        'Qty': 0,
        'Rate': 0,
        'IssueRate': 0,
        'RateEnt': 0,
        'CostOfSales': 0,
        'DiscountPercentage': 0,
        'DiscountAmount': 0,
        'Value': 0,
        'NetValue':0,
        'SalesOrderItemID':0
       
        });
        this.saleFormArray.push(row);
        this.GRDData.data = this.saleFormArray.controls;
       
  }

  removeRow(i: number): void {

    if (i != 0) {
      this.saleFormArray.removeAt(i);
      this.GRDData.data = this.saleFormArray.controls;
      // this.CountTotal();
    }
  }

  onTableDataChange(e: any) {
   
    this.page = e;
    this.Index = e - 1;
    this.detailData=[];
    this.saleFormArray.clear();
    this.SeleInvoiceForm.get('InvoiceID')?.setValue(this.DataSource[this.Index]?.InvoiceId);
    this.SeleInvoiceForm.get('InvoiceNo')?.setValue(this.DataSource[this.Index]?.InvoiceNo);
    this.SeleInvoiceForm.get('InvoiceDate')?.setValue(this.DataSource[this.Index]?.InvoiceDate);
    this.SeleInvoiceForm.get('WareHouse')?.setValue(this.DataSource[this.Index]?.WareHouse);
    this.SeleInvoiceForm.get('Saleman')?.setValue(this.DataSource[this.Index]?.Saleman);
    this.SeleInvoiceForm.get('RefrenceNo')?.setValue(this.DataSource[this.Index]?.RefrenceNo);
    this.SeleInvoiceForm.get('CustomerId')?.setValue(this.DataSource[this.Index]?.CustomerId);
    this.SeleInvoiceForm.get('CustomerName')?.setValue(this.DataSource[this.Index]?.CustomerName);
    this.SeleInvoiceForm.get('CustomerAddress')?.setValue(this.DataSource[this.Index]?.CustomerAddress);
    this.SeleInvoiceForm.get('EmailAddress')?.setValue(this.DataSource[this.Index]?.Email_Address);
    this.SeleInvoiceForm.get('NTNNo')?.setValue(this.DataSource[this.Index]?.NTN_No);
    this.SeleInvoiceForm.get('STNNo')?.setValue(this.DataSource[this.Index]?.NTN_No);
    this.SeleInvoiceForm.get('ContactNo')?.setValue(this.DataSource[this.Index]?.CustomerCell);
    this.SeleInvoiceForm.get('Remarks')?.setValue(this.DataSource[this.Index]?.Remarks);
    this.SeleInvoiceForm.get('FreightAmount')?.setValue(this.DataSource[this.Index]?.Freight_Amount);
    
    this.detailData =this.DataSource[this.Index].InvoiceItems
   
    if(this.detailData.length>0)
    {
    for(let i =0; i< this.detailData.length;i++)
    {
      const row = this.fb.group({
        'InvoiceID': this.detailData[i].InvoiceId,
        'ItemCode': this.detailData[i].ItemCode,
        'Description': this.detailData[i].Description,
        'Stock': this.detailData[i].Stock,
        'Qty': this.detailData[i].Qty,
        'Rate': this.detailData[i].Rate,
        'IssueRate': this.detailData[i].IssueRate,
        'RateEnt': this.detailData[i].RateEnt,
        'CostOfSales': this.detailData[i].Cost_Of_Sales,
        'DiscountPercentage': this.detailData[i].DiscountPercentage,
        'DiscountAmount': this.detailData[i].DiscountAmount,
        'Value': this.detailData[i].Value,
        'NetValue': this.detailData[i].Net_Value,
        'SalesOrderItemID':0,
       });
      this.saleFormArray.push(row);
    }
  }
  else{
    const row = this.fb.group({
      'ItemCode': null,
      'Description': null,
      'Stock': 0,
      'Qty': 0,
      'Rate': 0,
      'IssueRate': 0,
      'RateEnt': 0,
      'CostOfSales': 0,
      'DiscountPercentage': 0,
      'DiscountAmount': 0,
      'Value': 0,
      'NetValue':0,
      'SalesOrderItemID':0,
      });
      this.saleFormArray.push(row);
      this.GRDData.data = this.saleFormArray.controls;
  }
    this.GRDData.data = this.saleFormArray.controls;
    this.CountTotal();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.Index = event - 1;

  }

  CountTotal() {

    this.TotalQuantity = 0;
    this.TotalValue = 0;
    this.TotalDiscountAmt = 0
   
    let SaleTaxAmount = 0,
    FreightAmountAndDiscount=0,
    netValue=0

    this.Index = 0;

    this.GRDData.data = this.saleFormArray.controls;


    for (let i=0; i<= this.saleFormArray.controls.length-1;i++) {
      
      var Qty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(i) as FormGroup).get('Qty');
      var Value = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(i) as FormGroup).get('Value');
      var TotalDiscountAmt = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(i) as FormGroup).get('DiscountAmount');
      this.TotalQuantity += this.TotalQuantity = parseFloat(Qty?.value);
      this.TotalValue +=  this.TotalValue = parseFloat(Value?.value);
      this.TotalDiscountAmt += this.TotalDiscountAmt = parseFloat(TotalDiscountAmt?.value);
    }
   // console.log(this.TotalQuantity)

   FreightAmountAndDiscount = this.TotalValue+this.SeleInvoiceForm.value.FreightAmount-this.TotalDiscountAmt;
   SaleTaxAmount = FreightAmountAndDiscount*this.SeleInvoiceForm.value.SaleTaxPercentage/100;
   netValue = FreightAmountAndDiscount+SaleTaxAmount
 
  
  this.SeleInvoiceForm.patchValue(
  {
    TotalQuantity: this.TotalQuantity,
    TotalValue :this.TotalValue,
    DiscountAmount:this.TotalDiscountAmt,
    SalesTaxAmount:SaleTaxAmount,
    InvoiceAmount:netValue
  });
  }

Validation(e:any):boolean
{
  var Stock = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Stock');
  var Qty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Qty');
  var Rate = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Rate');
  var DisAmt = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('DiscountAmount');
  var DisPecent = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('DiscountPercentage');
  
   if(parseFloat(Qty?.value) == 0.00 || Qty?.value == null)
   {
  
   this.toaster.error('Qty greather then Zero', 'Sale Invoice', {timeOut: 2000});
    return  false;
   }
   else if(parseFloat(Rate?.value) == 0.00 || Rate?.value == null)
   {
 
     this.toaster.error('Rate greather then Zero', 'Sale Invoice', {timeOut: 2000});
     return  false;
   }
   else if(DisAmt?.value == null)
   {
    
    this.toaster.error('Dis Amt Null value not Allowed', 'Sale Invoice', {timeOut: 2000});
     return  false;
   }
   else if(DisPecent?.value == null)
   {
    
     this.toaster.error('Dis Percent Null value not Allowed', 'Sale Invoice', {timeOut: 2000});
     return  false;
   }
   else if(parseFloat(Qty.value) > parseFloat(Stock?.value))
   {
   
     this.toaster.error('Stock less then Qty', 'Sale Invoice', {timeOut: 2000});
     return  false;
   }
   else{
    return  true;
   }
}

Stock(e:any)
{
  this.Validation(e)
}
Qty(e:any)
{
  if(this.Validation(e) == true)
  {
    var Qty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Qty');
    var Issue_Rate = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('IssueRate');
    var Cost_Of_Sales = parseFloat(Qty?.value)* parseFloat(Issue_Rate?.value);
    ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('CostOfSales')?.patchValue(Cost_Of_Sales);
  
  }
}

Rate(e:any) {
 
  
  if(this.Validation(e) == true)
  {
  var Qty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Qty');
  var Rate = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Rate');
  this.Value = parseFloat(Qty?.value) * parseFloat(Rate?.value);
  this.NetValue = this.Value;
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Value')?.patchValue(this.Value);
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('NetValue')?.patchValue(this.NetValue);
  this.CountTotal();
  }
}
DiscountPercent(e:any) {
  
  if(this.Validation(e) == true)
  {
   
  var Qty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Qty');
  var Rate = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Rate');
  var DisPecent = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('DiscountPercentage');

  this.Value = parseFloat(Qty?.value) * parseFloat(Rate?.value);
  this.DisAmt = this.Value * parseFloat(DisPecent?.value) / 100;
  this.NetValue = this.Value + this.DisAmt;
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('DiscountAmount')?.patchValue(this.DisAmt);
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Value')?.patchValue(this.Value);
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('NetValue')?.patchValue(this.NetValue);
  this.CountTotal();
  }
}
DiscountAmount(e:any) {

  if(this.Validation(e) == true)
  {
  var Qty = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Qty');
  var Rate = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Rate');
  var DisAmt = ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('DiscountAmount');
  this.Value = parseFloat(Qty?.value) * parseFloat(Rate?.value);
  this.DisPer = parseFloat(DisAmt?.value) * 100 / this.Value;
  this.DisAmt = this.Value * this.DisPer / 100;
  this.NetValue = this.Value + this.DisAmt;
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('DiscountPercentage')?.patchValue(this.DisPer);
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('Value')?.patchValue(this.Value);
  ((this.SeleInvoiceForm.get('GRD') as FormArray).at(e) as FormGroup).get('NetValue')?.patchValue(this.NetValue);
  this.CountTotal();
  }
}

SelectDate(event:any):void
{
 this.SelectedDate = new Date(event.value);
}

SelectInvoiceType(InvoiceTypeID:number):void{
  this.InvoiceType = InvoiceTypeID;
}

  //API Calling
  GetVoucherType():void{
  const InvoiceType ={
    voucherType :"INV"
  }
  this.voucherService.GetVoucherType(InvoiceType).subscribe(data =>{
    this.InvoiceTypeData=data;
  })
}
  
getDataValues():void{
  const warehouse ={
    ValueSetID:5
  }
  this.sm.LoadDataValues(warehouse).subscribe(data =>{
    this.WareHouseData=data;
  })

  const saleman ={
    ValueSetID:12
  }
  this.sm.LoadDataValues(saleman).subscribe(data =>{
    this.SalesManData=data;
  })

  }

  FindMaster() {
   
  }
  EditMaster() {
    this.ButtonEdit();
  }
  SaveMaster() {

 let InvId = 0;
  if(this.AddorEdit ==='ADD')//Naveed Comments
  {
    InvId=0
  }
  
  else
  {
    InvId= this.SeleInvoiceForm.value.InvoiceID;
    this.AddorEdit ='EDIT'
  }
    
    let InvoiceDetail=[];
    for(let i=0;i<this.SeleInvoiceForm.value.GRD.length;i++)
    {
      const key={
        InvoiceID:InvId,
        ItemCode:this.SeleInvoiceForm.value.GRD[i].ItemCode,
        RateEnt:this.SeleInvoiceForm.value.GRD[i].Rate,
        Rate:this.SeleInvoiceForm.value.GRD[i].Rate,
        IssueRate:this.SeleInvoiceForm.value.GRD[i].IssueRate,
        Qty:this.SeleInvoiceForm.value.GRD[i].Qty,
        Cost_Of_Sales:this.SeleInvoiceForm.value.GRD[i].Cost_Of_Sales,
        DiscountPercentage:this.SeleInvoiceForm.value.GRD[i].DiscountPercentage,
        DiscountAmount:this.SeleInvoiceForm.value.GRD[i].DiscountAmount,
        Value:this.SeleInvoiceForm.value.GRD[i].Value,
        Net_Value:this.SeleInvoiceForm.value.GRD[i].NetValue,
        Sales_Order_Item_ID:this.SeleInvoiceForm.value.GRD[i].SalesOrderItemID,
      }
      InvoiceDetail.push(key)
    }

    const obj={
      PeriodId:this.PeriodID,
      InvoiceType:this.InvoiceType,
      AddorEdit:this.AddorEdit,

      InvoiceId:InvId,
      InvoiceNo:this.SeleInvoiceForm.value.InvoiceNo,
      InvoiceDate:this.SeleInvoiceForm.value.InvoiceDate,
      WareHouse:this.SeleInvoiceForm.value.WareHouse,
      Saleman:this.SeleInvoiceForm.value.Saleman,
      CustomerId:this.SeleInvoiceForm.value.CustomerId,
      CustomerName:this.SeleInvoiceForm.value.CustomerName,
      CustomerCell:this.SeleInvoiceForm.value.ContactNo,
      RefrenceNo:this.SeleInvoiceForm.value.RefrenceNo,
      Remarks:this.SeleInvoiceForm.value.Remarks,
      Freight_Amount:this.SeleInvoiceForm.value.FreightAmount?null:0,
      SalesTaxPercentage:this.SeleInvoiceForm.value.SaleTaxPercentage?null:0,
      SalesTaxAmount:this.SeleInvoiceForm.value.SalesTaxAmount?null:0,
      DiscountPercentage:this.SeleInvoiceForm.value.DiscountPercentage?null:0,
      DiscountAmount:this.SeleInvoiceForm.value.DiscountAmount?null:0,
      InvoiceAmount:this.SeleInvoiceForm.value.InvoiceAmount,
      InvoiceItems:InvoiceDetail,

    }
    this.saleServices.SaveMaster(obj).subscribe(data=>{

    })
    console.log(obj)

   this.ButtonSave();
  }
  DeleteMaster() {

  }

  // Button Setting

  ButtonSave() {
    this.btnDelete = false;
    this.btnSave = false;
    this.btnNew = true;
    this.btnEdit = true;
    this.btnFind = true;
    this.btnCancel = true;
    this.btnAttachBarcode = false;
    this.btnBarcodePrint = true;
    this.FieldLock();

  }
  ButtonEdit() {
    this.btnCancel = true;
    this.btnSave = true;
    this.filedlock = false;
    this.btnNew = false;
    this.btnEdit = false;
    this.btnFind = false;
    this.btnDelete = false;
    this.btnAttachBarcode = true;
    this.btnBarcodePrint = false;
    // this.utility.AddorEdit = "Edit";
    this.FieldLock();

  }
  ButtonCancel() {
    this.btnCancel = false;
    this.btnSave = false;
    this.btnNew = true;
    this.btnEdit = true;
    this.btnFind = true;
    this.btnDelete = true;
    this.filedlock = true;
    this.btnAttachBarcode = false;
    this.btnBarcodePrint = true;
    this.FieldLock();

  }
  ButtonNew() {
    this.btnNew = false;
    this.btnEdit = false;
    this.filedlock = false;
    this.btnDelete = false;
    this.btnSave = true;
    this.btnFind = false;
    this.Locked = false;
    this.btnLOV = false;
    this.btnCancel = true;
    this.btnAttachBarcode = true;
    this.btnBarcodePrint = false;
    // this.utility.AddorEdit = "Add";
    this.FieldLock();

  }
  FieldLock() {
    if (this.filedlock == true) {
      this.Locked = true;
      this.ReadOnly = true;
  
    }
    else {
      this.Locked = false;
      this.ReadOnly = false;
    }
  }

}
function DialogAnimationsExampleDialog(DialogAnimationsExampleDialog: any, arg1: { width: string; enterAnimationDuration: string; exitAnimationDuration: string; }) {
  throw new Error('Function not implemented.');
}

