import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Invoice } from "./invoice.models";
import { Observable } from "rxjs";

@Injectable()
export class InvoiceService {
  private readonly baseurl = "http://invoice.fontys-project.nl";

  constructor(private http: HttpClient) {}

  public getInvoice(): Observable<Invoice> {
    return this.http.get<Invoice>(this.baseurl + "/invoice/sample");
  }

  async getPdf(invoice: Invoice) {
   const response = await fetch(this.baseurl + "/pdf");
   const blobie = await response.blob();
   console.log(blobie);
  }
}
