import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {
  @Input() amountToPay: number;
  @Output() paymentProcessed = new EventEmitter<boolean>();

  ngOnInit() {
  }

  private addScript: boolean = false;

  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox:
        "AfQdRQ1To1ZVQ7d9sIwwVzdboyFe9xkCjdkjbs7HKAAbiAWbWIROPY1CDsCfibzFAw4gZ4Hr4E4RQTmr"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          redirect_urls: {
            return_url: "http://mijn.rekeningrijden.fontys-project.nl/",
            cancel_url: "http://portal.rekeningrijden.fontys-project.nl/"
          },
          transactions: [
            { amount: { total: this.amountToPay, currency: "EUR" } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        this.paymentProcessed.emit(true);
      }, err => this.paymentProcessed.emit(false));
    }
  };


  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "paypal-checkout-btn");
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
