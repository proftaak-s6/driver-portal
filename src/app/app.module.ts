import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Angular Material Imports
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatChipsModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderBarComponent } from "./molecules/header-bar/header-bar.component";
import { InvoiceOverviewComponent } from "./organisms/invoice-overview/invoice-overview.component";
import { InvoiceService } from "src/services/invoice.service";
import { PaypalButtonComponent } from './atoms/paypal-button/paypal-button.component';
import { InvoiceCardComponent } from './organisms/invoice-card/invoice-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    InvoiceOverviewComponent,
    PaypalButtonComponent,
    InvoiceCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule
  ],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
