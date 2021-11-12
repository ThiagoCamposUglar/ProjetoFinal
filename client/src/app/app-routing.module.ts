import { HomeComponent } from './home/home.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { CarrosComponent } from './carros/carros.component';
import { RegistrosAlugueisComponent } from './registros-alugueis/registros-alugueis.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'registros-alugueis', component: RegistrosAlugueisComponent},
  {path: 'carros', component: CarrosComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'home', component: HomeComponent},
  {path:'',redirectTo:'registros-alugueis', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
