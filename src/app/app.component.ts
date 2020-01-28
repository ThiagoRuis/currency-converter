import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  polledCurrency: any;
  ultimaAtualizacao: any;
  timer: any;
  currencyFrom: string;
  currencyTo: string;
  language = 'pt-br';
  amount: number;

  constructor(private http: HttpClient, private translate: TranslateService) {
      translate.setDefaultLang('pt-br');
      this.currencyFrom = 'BRL';
   }

  currencyLookup() {
    if(this.timer) {
      this.timer.unsubscribe();
    }
    const timerRequest = timer(0, 15000);

    this.timer = timerRequest.subscribe(() => {
      this.jiraya();
    });
  }

  jiraya() {
    if(this.amount === 0 ) {
      this.polledCurrency = 0;
      this.timer.unsubscribe();
      return null;
    }

    if (this.currencyTo === this.currencyFrom) {
      this.polledCurrency = this.amount;
      this.timer.unsubscribe();
      return null;
    }

    if(this.currencyTo === 'BTN') {
      this.http.get('https://blockchain.info/ticker').subscribe(
        (data: any) => this.polledCurrency = this.amount / data[this.currencyFrom].last
      );
    } else {
      this.http.get(`https://api.exchangerate-api.com/v4/latest/${this.currencyFrom}`).subscribe(
        (data: any) => this.polledCurrency = this.amount * data.rates[this.currencyTo]
      );
    }


    const now = moment();
    this.ultimaAtualizacao = now.format('HH:MM:ss'); // en
  }

  setCurrencyFrom(value) {
    this.currencyFrom = value;
    if(this.timer) {
      this.timer.unsubscribe();
    }
  }

  setCurrencyTo(value) {
    this.currencyTo = value;
    if(this.timer) {
      this.timer.unsubscribe();
    }
  }

  setLanguage(language) {
    this.translate.use(language);
    if(language === 'en-us') {
      this.currencyFrom = 'USD';
    }
    if(language === 'en-uk') {
      this.currencyFrom = 'EUR';
    }
    if(language === 'pt-br') {
      this.currencyFrom = 'BRL';
    }
  }
}
