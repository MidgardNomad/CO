import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackagePricingService {

  private packagePriceInEGP:number=1999;
  private packagePriceInUSD:number=49;

  constructor() { }

  getPackagePriceAndCurrency(country:string) :{price:number,currency:string}{
    const price= country === 'Egypt' ? this.packagePriceInEGP: this.packagePriceInUSD;
    const currency= country === 'Egypt' ? 'EGP': 'USD';
    return {price:price,currency:currency};
  }
}
