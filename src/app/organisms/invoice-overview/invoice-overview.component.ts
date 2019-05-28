import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice, VehicleInvoice } from "src/services/invoice.models";

@Component({
  selector: "app-invoice-overview",
  templateUrl: "./invoice-overview.component.html",
  styleUrls: ["./invoice-overview.component.css"]
})
export class InvoiceOverviewComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.getInvoice().subscribe(res => {this.invoices.push(res);this.invoices.push(res);this.invoices.push(res);this.invoices.push(res);this.invoices.push(res);this.invoices.push(res);});
  }

  private initiateInvoicePayment(invoice: Invoice) {
    console.log("Time to pay the VehicleInvoice!");
    console.log(invoice);
  }

  private getPdf(invoice: Invoice){
    this.invoiceService.getPdf(invoice);
  }
}
