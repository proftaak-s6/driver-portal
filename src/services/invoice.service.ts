import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Invoice } from "./invoice.models";
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });

    return this.http.post<Blob>(url, {
      headers,
      responseType: "blob"
    });
  }
}
