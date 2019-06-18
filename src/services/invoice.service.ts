import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Invoice, Payment } from "./invoice.models";
import { Observable } from "rxjs";

@Injectable()
export class InvoiceService {
  private readonly baseurl = "http://invoice.fontys-project.nl";

  constructor(private http: HttpClient) { }

  public getInvoice(
    brpId: number,
    year: number,
    month: number
  ): Observable<Invoice> {
    const url = this.baseurl + "/" + brpId + "/" + year + "/" + month;

    return this.http.get<Invoice>(url);
  }

  public getPdfFile(
    brpId: number,
    year: number,
    month: number
  ): Observable<Blob> {
    const url = this.baseurl + "/pdf/" + brpId + "/" + year + "/" + month;

    let headers = new HttpHeaders();

    return this.http.post<Blob>(url, null, {
      headers,
      responseType: "blob" as "json"
    });
  }

  private getPaymentById(id: number) {
    const url = this.baseurl + "/payment/" + id;

    return this.http.get<Payment>(url);
  }

  private updatePayment(payment: Payment) {
    const url = this.baseurl + "/payment";

    return this.http.put<Payment>(url, payment);
  }

  public setPaid(payment: Payment): void {
    this.getPaymentById(payment.id).subscribe(freshPayment => {
      freshPayment.isPaid = true;

      // .subscribe is hier verplicht!
      this.updatePayment(freshPayment).subscribe();
    })
  }
}
