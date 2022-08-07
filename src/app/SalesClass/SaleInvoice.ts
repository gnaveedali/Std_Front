import { DecimalPipe } from "@angular/common";

export class MasterData {
    InvoiceId: number = 0
}

export class DetailData {

    InvoiceItemID!: number;
    InvoiceId!: number;
    ItemCode!: string;
    Description!: string;
    RateEnt!: number;
    IssueRate!: number;
    Cost_Of_Sales!: number;
    Stock!: number;
    Qty!: number;
    Rate!: number;
    SaleRate!: number;
    DiscountPercentage!: number;
    DiscountAmount!: number;
    SalesTaxPercentage !: number;
    SalesTaxAmount!: number;
    Value!: number;
    Net_Value!: number;
}