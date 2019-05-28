import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice } from "src/services/invoice.models";

export enum Month {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December"
}

export class Payment {
  private invoice: Invoice;
  private year: number;
  private month: Month;
  private isPaid: boolean;

  constructor(
    invoice: Invoice,
    year: number,
    month: Month,
    isPaid: boolean = true
  ) {
    this.invoice = invoice;
    this.year = year;
    this.month = month;
    this.isPaid = isPaid;
  }

  public pay() {
    this.isPaid = true;
  }
}

@Component({
  selector: "app-invoice-overview",
  templateUrl: "./invoice-overview.component.html",
  styleUrls: ["./invoice-overview.component.css"]
})
export class InvoiceOverviewComponent implements OnInit {
  @ViewChild("downloadPdfLink") private downloadPdfLink: ElementRef;

  private payments: Payment[] = [];
  // invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.getInvoice().subscribe(res => {
      // Extra invoices can be activated by uncommenting, but it gets very crouded
      // this.payments.push(new Payment(res, 2018, Month.January));
      // this.payments.push(new Payment(res, 2018, Month.February));
      // this.payments.push(new Payment(res, 2018, Month.March));
      // this.payments.push(new Payment(res, 2018, Month.April));
      // this.payments.push(new Payment(res, 2018, Month.May));
      // this.payments.push(new Payment(res, 2018, Month.June));
      // this.payments.push(new Payment(res, 2018, Month.July));
      this.payments.push(new Payment(res, 2018, Month.August));
      this.payments.push(new Payment(res, 2018, Month.September));
      this.payments.push(new Payment(res, 2018, Month.October));
      this.payments.push(new Payment(res, 2018, Month.November));
      this.payments.push(new Payment(res, 2018, Month.December));
      this.payments.push(new Payment(res, 2019, Month.January));
      this.payments.push(new Payment(res, 2019, Month.February));
      this.payments.push(new Payment(res, 2019, Month.March));
      this.payments.push(new Payment(res, 2019, Month.April));
      this.payments.push(new Payment(res, 2019, Month.May, false));
    });
  }

  private initiateInvoicePayment(payment: Payment) {
    console.log("Time to pay the VehicleInvoice!");
    console.log(payment);

    payment.pay();
  }

  private getPdfFile(invoice: Invoice) {
    this.invoiceService.getPdfFile().subscribe(blob => {
      console.log(blob);

      const url = window.URL.createObjectURL(blob);

      const link = this.downloadPdfLink.nativeElement;
      link.href = url;
      link.download = "invoice.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    });
  }
}
