import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Locação de veículos';
  clientes: any;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.http.get('https://localhost:5001/api/clientes').subscribe(response => {
      this.clientes = response;
    }, error => {
      console.log(error);
    });
  }
}
