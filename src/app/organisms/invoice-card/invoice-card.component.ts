import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceCard, DrivenStep, Invoice } from 'src/services/invoice.models';
import { InvoiceService } from 'src/services/invoice.service';
import { saveAs } from 'browser-filesaver/FileSaver.js'

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.css']
})
export class InvoiceCardComponent implements OnInit {
  @Input() invoiceCard: InvoiceCard;
  @Output() refreshRequired = new EventEmitter<boolean>();

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
  }

  private paymentProcessed(success: boolean) {
    if (success) {
      this.invoiceService.setPaid(this.invoiceCard.invoice.payment);
      this.refreshRequired.emit();
    }
  }


  private getPdfFile(invoiceCard: InvoiceCard) {
    this.invoiceService.getPdfFile(1, invoiceCard.year, invoiceCard.month).subscribe((data: Blob) => {
      var blob = new Blob([data], { type: 'application/pdf' });

      var filename = "Rekeningrijden - " + invoiceCard.invoice.personalInformation.fullname + " - " + invoiceCard.year + "-" + invoiceCard.month;

      saveAs(blob, filename);
    });
  }

  private needsToPay(invoice: Invoice): boolean {
    return !invoice.payment.isPaid;
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
