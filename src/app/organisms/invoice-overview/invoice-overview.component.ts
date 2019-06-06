import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice } from "src/services/invoice.models";
import { promise } from 'protractor';

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

declare let paypal: any;

@Component({
  selector: "app-invoice-overview",
  templateUrl: "./invoice-overview.component.html",
  styleUrls: ["./invoice-overview.component.css"]
})
export class InvoiceOverviewComponent implements OnInit, AfterViewChecked {
  @ViewChild("downloadPdfLink") private downloadPdfLink: ElementRef;

  private payments: Payment[] = [];
  private finalAmount: number;
  private addScript: boolean = false;
  // invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {
    this.finalAmount = 1;
  }

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

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AfQdRQ1To1ZVQ7d9sIwwVzdboyFe9xkCjdkjbs7HKAAbiAWbWIROPY1CDsCfibzFAw4gZ4Hr4E4RQTmr'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          redirect_urls:{
            return_url:'http://mijn.rekeningrijden.fontys-project.nl/',
            cancel_url:'http://portal.rekeningrijden.fontys-project.nl/'
          },
          transactions: [
            { amount: { total: this.finalAmount, currency: 'EUR'} }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment succes
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, 'paypal-checkout-btn');
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}
