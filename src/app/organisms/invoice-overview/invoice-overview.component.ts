import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice, VehicleInvoice } from "src/services/invoice.models";

@Component({
  selector: "app-invoice-overview",
  templateUrl: "./invoice-overview.component.html",
  styleUrls: ["./invoice-overview.component.css"]
})
export class InvoiceOverviewComponent implements OnInit {
  invoice: Invoice;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.getInvoice().subscribe(res => (this.invoice = res));
  }

  private initiateInvoicePayment(vehicleInvoice: VehicleInvoice) {
    console.log("Time to pay the VehicleInvoice!");
    console.log(vehicleInvoice);
  }
}
