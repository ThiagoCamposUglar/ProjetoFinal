import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Carro } from '../_models/carro';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/carros';
  gruposUrl = 'https://localhost:5001/api/grupos';
  grupos: any;
  carros: any;
  public carroSelecionado: any;
  public carroForm: FormGroup;
  public novoCarroForm: FormGroup;
  modalRef?: BsModalRef;
  private _filtroLista: string = '';
  public carrosFiltrados: any = [];



  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.carrosFiltrados = this.filtroLista ? this.filtrarCarros(this.filtroLista): this.carros;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private http: HttpClient, public accountService: AccountService, private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
    this.criarNovoCarroForm();
   }

  ngOnInit(): void {
    this.getCarros();
    this.getGrupos();
  }

  getGrupos(){
    this.http.get(this.gruposUrl).subscribe(response => {
      this.grupos = response;
      console.log(this.grupos);
    }, error => {
      console.log(error);
    });
  }

  getCarros(){
    this.http.get(this.baseUrl).subscribe(response => {
      this.carros = response;
      this.carrosFiltrados = this.carros;
    }, error => {
      console.log(error);
    });
  }

  carroSubmit(){
    console.log(this.carroForm.value);
    this.http.put(`${this.baseUrl}/${this.carroSelecionado.id}`, this.carroForm.value).subscribe(carro => {
      this.carroSelecionado = carro;
      window.alert('Dados alterados com sucesso');
      this.getCarros();
    }, error => {
      console.log(error);
    });
  }

  postCarro(){
    console.log(this.novoCarroForm.value);
    this.http.post(this.baseUrl, this.novoCarroForm.value).subscribe(carro => {
      carro;
      window.alert('Cadastrado com sucesso');
      this.getCarros();
    }, error => {
      console.log(error);
    });
  }

  criarForm(){
    this.carroForm = this.fb.group({
      id:['', Validators.required],
      modelo:['', Validators.required],
      marca:['', Validators.required],
      placa:['', Validators.required],
      ano:['', Validators.required],
      valorDiaria:['', Validators.required].toString(),
      cor:['', Validators.required],
      grupoId:['', Validators.required],
    })
  }

  criarNovoCarroForm(){
    this.novoCarroForm = this.fb.group({
      modelo:['', Validators.required],
      marca:['', Validators.required],
      placa:['', Validators.required],
      ano:['', Validators.required],
      valorDiaria:['', Validators.required],
      cor:['', Validators.required],
      grupoId:['', Validators.required],
    })
  }

  carroSelect(carro: Carro){
    this.carroSelecionado = carro;
    this.carroForm.patchValue(carro);
    console.log(this.carroSelecionado);
  }

  voltar(){
    this.carroSelecionado = null;
  }

  filtrarCarros(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.carros.filter((carro:{modelo: string; marca: string; placa: string; ano: string; valorDiaria: number; cor: string;}) => carro.modelo.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
     carro.marca.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
     carro.placa.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
     carro.ano.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
     carro.valorDiaria.toLocaleString().indexOf(filtrarPor) !== -1 ||
     carro.cor.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

}
