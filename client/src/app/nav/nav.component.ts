import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  usuarioAtual: any;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.usuarioAtual = JSON.parse(localStorage.getItem('user'))
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.usuarioAtual = JSON.parse(localStorage.getItem('user'))
    }, error => {
      console.log(error);
      window.alert('Usuário ou senha inválidos')
    });
  }

  logout(){
    this.accountService.logout();
  }

}
