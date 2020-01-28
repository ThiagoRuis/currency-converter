import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  polledCurrency: any;
  ultimaAtualizacao: any;
  currencyFrom: string;
  currencyTo: string;
  language = 'pt-br';
  amount: number;

  constructor(private http: HttpClient) { }

  currencyLookup() {
    const timerRequest = timer(0, 5000);

    timerRequest.subscribe(() => {
      this.jiraya();
    });
  }

  jiraya() {
    debugger;
    if (false) {
      this.http.get('https://blockchain.info/ticker').subscribe(
        (data: any) => this.polledCurrency = data.USD.last
      );
    }

    if (true) {
      this.http.get('https://api.exchangerate-api.com/v4/latest/USD').subscribe(
        (data: any) => this.polledCurrency = data.rates.AUD
      );
    }

    const now = moment();
    this.ultimaAtualizacao = now.format('HH:MM:ss'); // en
    console.log(this.currencyTo);
    moment.locale('pt-BR');
    console.log(now.locale()); // pt-BR
    console.log('PAsei');
  }

  setCurrencyFrom(value) {
    this.currencyFrom = value;
  }

  setCurrencyTo(value) {
    this.currencyTo = value;
  }

  setLanguage(language) {
    this.language = language;
  }
}
