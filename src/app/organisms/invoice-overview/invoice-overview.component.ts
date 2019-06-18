import {
  Component,
  OnInit
} from "@angular/core";
import { InvoiceService } from "src/services/invoice.service";
import { Invoice, InvoiceCard } from "src/services/invoice.models";

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
    // Will start at july 2019 and create invoices for every month before it in 2019 and add it to the list
    // Done like this to minimize load 
    this.getPreviousMonth(9998, 2019, 7);
  }

  private getPreviousMonth(brpId: number, year: number, month: number) {
    this.invoiceService.getInvoice(brpId, year, month).subscribe((res: Invoice) => {
      const invoicecard: InvoiceCard = { invoice: res, year: year, month: month };
      console.log(invoicecard);
      this.invoiceCards.push(invoicecard);
      if (month > 1) {
        this.getPreviousMonth(brpId, year, (month - 1));
      }
    });
  }

  private refreshData() {
    this.invoiceCards.length = 0;
    this.getPreviousMonth(9998, 2019, 7);
  }
}
