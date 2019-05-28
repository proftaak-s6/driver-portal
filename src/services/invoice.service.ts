import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Invoice } from "./invoice.models";
import { Observable } from "rxjs";

@Injectable()
export class InvoiceService {
  private readonly baseurl = "http://invoice.fontys-project.nl";

  constructor(private http: HttpClient) {}

  public getInvoice(): Observable<Invoice> {
    return this.http.get<Invoice>(this.baseurl + "/invoice/sample");
  }

  public getPdfFile(): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/pdf");

    const url = this.baseurl + "/pdf";

    return this.http.get<Blob>(url, {
      headers,
      responseType: "blob" as "json"
    });
  }
}
