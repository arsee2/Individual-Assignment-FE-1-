import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  source = interval(5000);
  title = 'mtsrest';
  date = "date"
  time ="time"
  fontColor = 'color:red;'
  background = 'background-color:grey;'
  
  private updateValues(){
    this.http.get('http://localhost:8080/calendar/date').toPromise().then(res =>{
      this.date = res['date']
    }).catch(err=> {console.log(err)});

    this.http.get('http://localhost:8080/calendar/time').toPromise().then(res =>{
      this.time = res['time']
    }).catch(err=> {console.log(err)});
    
    this.http.get('http://localhost:8080/theme').toPromise().then(res =>{
      this.background = 'background-color:'+res['backgroundColor']+";"
      this.fontColor = 'color:'+res['fontColor']+";"
    }).catch(err=> {console.log(err)});
  }

  updater =  setInterval(this.updateValues,1000);
  ngOnInit(){
    this.subscription = this.source.subscribe(val => this.updateValues());
  }

  

  constructor(private readonly http:HttpClient){    
    this.updateValues()
  }
 
    
}
