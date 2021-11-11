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
  funcionarios: any;
  cargos: any;
  public funcionarioSelecionado: any;
  public funcionarioForm: FormGroup;
  public novoFuncionarioForm: FormGroup;
  modalRef?: BsModalRef;
  private _filtroLista: string = "";
  public funcionariosFiltrados: any = [];


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

  funcionarioSubmit(){
    //não vai ter
  }

  postFuncionario(){
    this.http.post(this.accountRegisterUrl, this.novoFuncionarioForm.value).subscribe(funcionario => {
      funcionario;
      window.alert('Cadastrado com sucesso');
      this.modalRef.hide();
      this.getfuncionarios();
    }, error => {
      console.log(error);
    });
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

  registrosSelect(){
    this.funcionarioSelecionado;
  }

  filtrarFuncionarios(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.funcionarios.filter((funcionario:{nomeFuncionario: string; login: string}) => funcionario.nomeFuncionario.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
    funcionario.login.toLocaleLowerCase().indexOf(filtrarPor) !== -1)
  }

}
