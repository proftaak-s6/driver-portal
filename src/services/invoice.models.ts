export interface Address {
  streetname: string;
  housenumber: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface PersonalInformation {
  fullname: string;
  address: Address;
}

export interface Payment {
  id: number;
  bsn: string;
  month: string;
  year: number;
  isPaid: boolean;
}

export interface Tracker {
  id: number;
  manufacturer: string;
  activationDate: string;
}

export interface Start {
  name: string;
  lat: number;
  lng: number;
}

export interface Location {
  date: string;
  lat: number;
  lng: number;
}

export interface DrivenStep {
  distance: number;
  start: Start;
  locations: Location[];
  priceToPay: number;
}

export interface Car {
  id: number;
  ownerId: number;
  ownershipHistoryList: any[];
  licensePlateNumber: string;
  brand: string;
  series: string;
  vehicleType: string;
  engineType: string;
  fuelType: string;
  energyLabel: string;
  tracker: Tracker;
  drivenSteps: DrivenStep[];
}

export interface Invoice {
  invoiceDate: string;
  personalInformation: PersonalInformation;
  payment: Payment;
  cars: Car[];
}

export class InvoiceCard {
  invoice: Invoice;
  year: number;
  month: number;
}
