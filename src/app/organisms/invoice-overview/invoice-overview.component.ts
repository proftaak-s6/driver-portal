import {
  Component,
  OnInit
} from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice, InvoiceCard, DrivenStep } from "src/services/invoice.models";
import { saveAs } from 'browser-filesaver/FileSaver.js'

@Component({
  selector: "app-invoice-overview",
  templateUrl: "./invoice-overview.component.html",
  styleUrls: ["./invoice-overview.component.css"]
})
export class InvoiceOverviewComponent implements OnInit {

  private invoiceCards: InvoiceCard[] = [];

  constructor(private invoiceService: InvoiceService) {
  }


  ngOnInit() {
    this.invoiceService.getInvoice(9998, 2019, 6).subscribe((res: Invoice) => {
      const invoicecard: InvoiceCard = { invoice: res, year: 2019, month: 6 };
      this.invoiceCards.push(invoicecard);
    });
  }

  private getPdfFile(invoiceCard: InvoiceCard) {
    this.invoiceService.getPdfFile(9998, invoiceCard.year, invoiceCard.month).subscribe((data: Blob) => {
      var blob = new Blob([data], { type: 'application/pdf' });

      var filename = "Rekeningrijden - " + invoiceCard.invoice.personalInformation.fullname + " - " + invoiceCard.year + "-" + invoiceCard.month;

      saveAs(blob, filename);
    });
  }

  private paymentProcessed(success: boolean) {
    console.log("Payment processed " + success);
  }

  private calculateTotalCarDistance(steps: DrivenStep[]): number {
    let totalcost: number = 0;
    for (let entry of steps) {
      totalcost += entry.priceToPay;
    }

    return totalcost;
  }

  private calculateTotalCarCost(steps: DrivenStep[]): number {
    let totaldistance: number = 0;
    for (let entry of steps) {
      totaldistance += entry.distance;
    }

    return totaldistance / 1000;
  }

  private calculateTotalInvoiceCost(invoice: Invoice) {
    let totalcost: number = 0;
    for (let entry of invoice.cars) {
      totalcost += this.calculateTotalCarCost(entry.drivenSteps);
    }

    return totalcost.toFixed(2);
  }
}
