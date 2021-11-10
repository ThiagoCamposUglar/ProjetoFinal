import { RegistroAluguel } from './../_models/registroAluguel';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-registros-alugueis',
  templateUrl: './registros-alugueis.component.html',
  styleUrls: ['./registros-alugueis.component.css'],
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
  public novoRegistroForm: FormGroup;
  modalRef?: BsModalRef;
  private _filtroLista: string = '';
  public registrosFiltrados: any[];
  idUsuarioAtual: number;


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
    this.http.get(this.baseUrl).subscribe(response => {
      this.registros = response;
      this.registrosFiltrados = this.registros;
      console.log(this.registros);
    }, error => {
      console.log(error);
    });
  }

  getCarros(){
    this.http.get(this.carrosUrl).subscribe(response => {
      this.carros = response;
      console.log(this.carros);
    }, error => {
      console.log(error);
    });
  }

  getFuncionarios(){
    this.http.get(this.funcionariosUrl).subscribe(response => {
      this.funcionarios = response;
      console.log(this.funcionarios);
    }, error => {
      console.log(error);
    });
  }

  getClientes(){
    this.http.get(this.clientesUrl).subscribe(response => {
      this.clientes = response;
      console.log(this.clientes);
    }, error => {
      console.log(error);
    });
  }

  registroSubmit(){
    console.log(this.registroForm.value);
    this.http.put(`${this.baseUrl}/${this.registroSelecionado.id}`, this.registroForm.value).subscribe(registro => {
      this.registroSelecionado = registro;
      window.alert('Dados atualizados com sucesso');
      this.getRegistros();
    }, error => {
      console.log(error);
    });
  }

  postRegistro(){
    console.log(this.novoRegistroForm.value);
    if(this.novoRegistroForm.value.dataFim < this.novoRegistroForm.value.dataInicio){
      window.alert('A data de devolução deve ser depois da data de retirada');
    }
    else{
      this.http.post(this.baseUrl, this.novoRegistroForm.value).subscribe(registro => {
        registro;
        window.alert('Cadastrado com sucesso');
        this.modalRef.hide();
        this.getRegistros();
      }, error => {
        console.log(error);
      })
    }
  }

  criarForm(){
    this.registroForm = this.fb.group({
      id:['', Validators.required],
      clienteId:['', Validators.required],
      carroId:['', Validators.required],
      funcionarioId:['', Validators.required],
      dataInicio:['', Validators.required],
      dataFim:['', Validators.required],
      valorAluguel:['', Validators.required]
    })
  }

  criarNovoRegistroForm(){
    this.novoRegistroForm = this.fb.group({
      dataInicio:['', Validators.required],
      dataFim:['', Validators.required],
      clienteId:['', Validators.required],
      funcionarioId:['', Validators.required],
      carroId:['', Validators.required],
      // valorAluguel:['']
    })
  }

  registroSelect(registro: RegistroAluguel){
    this.registroSelecionado = registro;
    this.registroForm.patchValue(registro);
    console.log(this.registroSelecionado);
  }

  voltar(){
    this.registroSelecionado = null;
  }

  filtrarRegistros(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.registros.filter((registro: {dataInicio: Date; dataFim: Date; valorAluguel: number}) => registro.dataInicio.toLocaleString().indexOf(filtrarPor) !== -1 ||
    registro.dataFim.toLocaleString().indexOf(filtrarPor) !== -1 ||
    registro.valorAluguel.toLocaleString().indexOf(filtrarPor) !== -1);
  }

}
