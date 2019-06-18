import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice, Payment, InvoiceCard } from "src/services/invoice.models";
import { promise } from "protractor";
import { saveAs } from 'browser-filesaver/FileSaver.js'

declare let paypal: any;

@Component({
  selector: "app-invoice-overview",
  templateUrl: "./invoice-overview.component.html",
  styleUrls: ["./invoice-overview.component.css"]
})
export class InvoiceOverviewComponent implements OnInit, AfterViewChecked {

  constructor(private invoiceService: InvoiceService) {
    this.finalAmount = 1;
  }

  private invoiceCards: InvoiceCard[] = [];
  private finalAmount: number;
  private addScript: boolean = false;

  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox:
        "AfQdRQ1To1ZVQ7d9sIwwVzdboyFe9xkCjdkjbs7HKAAbiAWbWIROPY1CDsCfibzFAw4gZ4Hr4E4RQTmr"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          redirect_urls: {
            return_url: "http://mijn.rekeningrijden.fontys-project.nl/",
            cancel_url: "http://portal.rekeningrijden.fontys-project.nl/"
          },
          transactions: [
            { amount: { total: this.finalAmount, currency: "EUR" } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        //Do something when payment succes
      });
    }
  };

  ngOnInit() {
    this.invoiceService.getInvoice(9998, 2019, 6).subscribe((res: Invoice) => {
      const invoicecard: InvoiceCard = { invoice: res, year: 2019, month: 6 };
      this.invoiceCards.push(invoicecard);
    });
  }

  private initiatePayment(payment: Payment) {
    // this.finalAmount = payment.
    console.log("Time to pay the VehicleInvoice!");
    console.log(payment);


    payment.isPaid = true;
  }

  private getPdfFile(invoiceCard: InvoiceCard) {
    this.invoiceService.getPdfFile(9998, invoiceCard.year, invoiceCard.month).subscribe((data: Blob) => {
      var blob = new Blob([data], { type: 'application/pdf' });

      var filename = "Rekeningrijden - " + invoiceCard.invoice.personalInformation.fullname + " - " + invoiceCard.year + "-" + invoiceCard.month;

      saveAs(blob, filename);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "paypal-checkout-btn");
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
