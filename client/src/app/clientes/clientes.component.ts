import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cliente } from '../_models/cliente';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/clientes';
  public clienteSelecionado: Cliente;
  clientes: any;
  public clienteForm: FormGroup;
  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private http: HttpClient, public accountService: AccountService, private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.getClientes();
  }

  criarForm(){
    this.clienteForm = this.fb.group({
      nomeCliente: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  clienteSubmit(){
    console.log(this.clienteForm.value);
  }

  clienteSelect(cliente: Cliente){
    this.clienteSelecionado = cliente;
    this.clienteForm.patchValue(cliente);
  }

  voltar(){
    this.clienteSelecionado = null;
  }

  getClientes(){
    this.http.get(this.baseUrl).subscribe(response => {
      this.clientes = response;
    }, error => {
      console.log(error);
    });
  }
}
