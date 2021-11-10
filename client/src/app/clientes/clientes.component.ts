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
  public clienteSelecionado: any;
  clientes: any;
  public clienteForm: FormGroup;
  public novoClienteForm: FormGroup;
  modalRef?: BsModalRef;
  private _filtroLista: string = '';
  public clientesFiltrados: any = [];

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ? this.filtrarClientes(this.filtroLista): this.clientes;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private http: HttpClient, public accountService: AccountService, private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
    this.criarNovoClienteForm();
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.http.get(this.baseUrl).subscribe(response => {
      this.clientes = response;
      this.clientesFiltrados = this.clientes;
    }, error => {
      console.log(error);
    });
  }


  clienteSubmit(){
    console.log(this.clienteForm.value);
    this.http.put( `${this.baseUrl}/${this.clienteSelecionado.id}`, this.clienteForm.value).subscribe(cliente => {
      this.clienteSelecionado = cliente;
      window.alert('Dados alterados com sucesso');
      this.getClientes();
    }, error => {
      console.log(error);
    });
  }

  postCliente(){
    console.log(this.novoClienteForm.value);
    this.http.post(this.baseUrl, this.novoClienteForm.value).subscribe(cliente => {
      cliente;
      window.alert('Cadastrado com sucesso');
      this.modalRef?.hide();
      this.getClientes();
    }, error => {
      console.log(error);
    });
  }



  criarForm(){
    this.clienteForm = this.fb.group({
      id:['', Validators.required],
      nomeCliente: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  criarNovoClienteForm(){
    this.novoClienteForm = this.fb.group({
      nomeCliente: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  clienteSelect(cliente: Cliente){
    this.clienteSelecionado = cliente;
    this.clienteForm.patchValue(cliente);
    console.log(this.clienteSelecionado);
  }

  voltar(){
    this.clienteSelecionado = null;
  }


  filtrarClientes(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter((cliente:{nomeCliente: string; telefone: string; cpf: string; email: string}) => cliente.nomeCliente.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || cliente.telefone.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || cliente.cpf.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || cliente.email.toLocaleLowerCase().indexOf(filtrarPor) !== -1)
  }
}
