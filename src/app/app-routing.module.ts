import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InvoiceOverviewComponent } from "./organisms/invoice-overview/invoice-overview.component";

const routes: Routes = [{ path: "", component: InvoiceOverviewComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
