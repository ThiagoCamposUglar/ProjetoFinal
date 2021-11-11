import { Funcionario } from './../_models/funcionario';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/funcionarios';
  accountRegisterUrl = 'https://localhost:5001/api/account/register';
  cargosUrl = 'https://localhost:5001/api/cargos';
  registrosUrl = 'https://localhost:5001/api/registrosalugueis';
  funcionarios: any;
  cargos: any;
  registros: any;
  public funcionarioSelecionado: any;
  public funcionarioForm: FormGroup;
  public novoFuncionarioForm: FormGroup;
  modalRef?: BsModalRef;
  private _filtroLista: string = "";
  public funcionariosFiltrados: any = [];
  funcionarioSelecionadoDelete: any;
  funcionarioSelecionado2: any;
  funcionarioAtual: any;


  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.funcionariosFiltrados = this.filtroLista ? this.filtrarFuncionarios(this.filtroLista): this.funcionarios;
  }

  openModal(template: TemplateRef<any>){
    console.log(this.cargos);
    this.modalRef = this.modalService.show(template);
  }

  constructor(public accountService: AccountService, private http: HttpClient, private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
    this.criarNovoFuncionarioForm();
  }

  ngOnInit(): void {
    this.getfuncionarios();
    this.getCargos();
    this.getRegistros();
    this.funcionarioAtual = JSON.parse(localStorage.getItem('user'))
  }

  getfuncionarios(){
    this.http.get(this.baseUrl).subscribe(response => {
      this.funcionarios = response;
      this.funcionariosFiltrados = this.funcionarios;
    }, error => {
      console.log(error);
    });
  }

  getCargos(){
    this.http.get(this.cargosUrl).subscribe(response => {
      this.cargos = response;
    }, error => {
      console.log(error);
    });
  }

  getRegistros(){
    this.http.get(this.registrosUrl).subscribe(response => {
      this.registros = response;
      console.log(this.registros);
    }, error => {
      console.log(error);
    });
  }

  funcionarioSubmit(){
    //não vai ter
  }

  postFuncionario(){
    if(this.funcionarioAtual.cargoId != 1){
      window.alert('Você não tem permissão para realizar esta ação')
    }
    else{
      this.http.post(this.accountRegisterUrl, this.novoFuncionarioForm.value).subscribe(funcionario => {
        funcionario;
        window.alert('Cadastrado com sucesso');
        this.modalRef.hide();
        this.getfuncionarios();
      }, error => {
        console.log(error);
      });
    }
  }

  deleteFuncionario(){
    if(this.funcionarioAtual.cargoId != 1){
      window.alert('Você não tem permissão para realizar esta ação')
    }
    else{
      this.http.delete(`${this.baseUrl}/${this.funcionarioSelecionadoDelete.id}`).subscribe(funcionario => {
        this.funcionarioSelecionadoDelete = funcionario;
        window.alert('Funcionário desativado com secesso');
        this.modalRef.hide();
        this.getfuncionarios();
      }, error => {
        console.log(error);
      })
    }
  }

  criarForm(){
    //não vai ter
  }

  criarNovoFuncionarioForm(){
    this.novoFuncionarioForm = this.fb.group({
      nomeFuncionario:['', Validators.required],
      login:['', Validators.required],
      senha:['', Validators.required],
      cargoId:['', Validators.required]
    })
  }

  registrosSelect(funcionario: Funcionario){
    this.funcionarioSelecionado2 = funcionario;
  }

  funcionarioSelectDelete(funcionario: Funcionario){
    this.funcionarioSelecionadoDelete = funcionario;
  }

  filtrarFuncionarios(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.funcionarios.filter((funcionario:{nomeFuncionario: string; login: string}) => funcionario.nomeFuncionario.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
    funcionario.login.toLocaleLowerCase().indexOf(filtrarPor) !== -1)
  }

}
