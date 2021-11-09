import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-registros-alugueis',
  templateUrl: './registros-alugueis.component.html',
  styleUrls: ['./registros-alugueis.component.css']
})
export class RegistrosAlugueisComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/registrosalugueis';
  carrosUrl = 'https://localhost:5001/api/carros';
  funcionariosUrl = 'https://localhost:5001/api/funcionarios';
  clientesUrl = 'https://localhost:5001/api/clientes';
  registros: any;
  carros: any;
  funcionarios: any;
  clientes: any;
  public registroSelecionado: any;
  public registroForm: FormGroup;
  modalRef?: BsModalRef;
  private _filtroLista: string = '';
  public registrosFiltrados: any[];

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.registrosFiltrados = this.filtroLista ? this.filtrarRegistros(this.filtroLista): this.registros;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  constructor(private http: HttpClient, public accountService: AccountService, private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
    this.criarNovoRegistroForm();
  }

  ngOnInit(): void {
    this.getRegistros();
    this.getCarros();
    this.getFuncionarios();
    this.getClientes();
  }

  getRegistros(){

  }

  getCarros(){

  }

  getFuncionarios(){

  }

  getClientes(){

  }

  criarForm(){

  }

  criarNovoRegistroForm(){

  }

  filtrarRegistros(filtrarPor: string): any{

  }

}
