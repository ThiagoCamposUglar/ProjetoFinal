import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-registros-alugueis',
  templateUrl: './registros-alugueis.component.html',
  styleUrls: ['./registros-alugueis.component.css']
})
export class RegistrosAlugueisComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
