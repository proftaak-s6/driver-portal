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
  private brpId = 1;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.refreshData(this.brpId, 2019, 6);
  }

  private refreshData(brpId: number, year: number, month: number) {
    this.invoiceCards.length = 0;
    this.invoiceService.getInvoice(brpId, year, month).subscribe((res: Invoice) => {
      const invoicecard: InvoiceCard = { invoice: res, year: year, month: month };
      console.log(invoicecard);
      this.invoiceCards.push(invoicecard);
    });
  }
}
