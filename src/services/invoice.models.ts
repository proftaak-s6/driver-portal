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

export interface SupplierInformation {
  companyName: string;
  address: Address;
  btwnumberString: string;
  kvknumberString: string;
  ibanstring: string;
}

export interface Vehicle {
  displayName: string;
  licensePlate: string;
}

export interface RegionalInvoiceLine {
  region: string;
  registrationMoment: any;
  regionalPriceBeforeTaxes: number;
  accountedPriceBeforeTaxes: number;
}

export interface KilometerInvoiceLine {
  roadType: string;
  drivenDistanceInMeters: number;
  pricePerKilometerBeforeTaxes: number;
}

export interface VehicleInvoice {
  vehicle: Vehicle;
  regionalInvoiceLines: RegionalInvoiceLine[];
  kilometerInvoiceLines: KilometerInvoiceLine[];
}

export interface Invoice {
  invoiceNumberString: string;
  invoiceDate: number;
  personalInformation: PersonalInformation;
  supplierInformation: SupplierInformation;
  vehicleInvoices: VehicleInvoice[];
}
