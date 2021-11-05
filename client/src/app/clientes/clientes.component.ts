import { Component, OnInit } from '@angular/core';
import { Cliente } from '../_models/cliente';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clienteSelecionado: Cliente;

  clientes = [
    {id: 1, nome: 'Thiago', telefone: '11952026549', cpf: '48171145841', email: 'thiagocampos2002@gmail.com'},
    {id: 2, nome: 'Tatiana', telefone: '11212212121', cpf: '11111111111', email: 'tatiana@gmail.com'},
    {id: 3, nome: 'Thiago', telefone: '11952026549', cpf: '48171145841', email: 'thiagocampos2002@gmail.com'},
    {id: 4, nome: 'Tatiana', telefone: '11212212121', cpf: '11111111111', email: 'tatiana@gmail.com'},
    {id: 5, nome: 'Thiago', telefone: '11952026549', cpf: '48171145841', email: 'thiagocampos2002@gmail.com'},
    {id: 6, nome: 'Tatiana', telefone: '11212212121', cpf: '11111111111', email: 'tatiana@gmail.com'},
    {id: 7, nome: 'Thiago', telefone: '11952026549', cpf: '48171145841', email: 'thiagocampos2002@gmail.com'},
    {id: 8, nome: 'Tatiana', telefone: '11212212121', cpf: '11111111111', email: 'tatiana@gmail.com'},
    {id: 9, nome: 'Thiago', telefone: '11952026549', cpf: '48171145841', email: 'thiagocampos2002@gmail.com'},
    {id: 10, nome: 'Tatiana', telefone: '11212212121', cpf: '11111111111', email: 'tatiana@gmail.com'},
  ]

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  clienteSelect(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  voltar(){
    this.clienteSelecionado = null;
  }

}
