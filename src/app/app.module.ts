import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaInicialComponent } from './PaginaInicial/PaginaInicial.component';
import { LoginComponent } from './Login/Login.component';
import { AuthGuard } from './autenticacao/auth-guard';
import { PadraoService } from './service/padrao-service';
import { bObservableUsuario,ObservableBlockPanel } from './util/observable-util';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EmpresaComponent } from './empresa/empresa.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { InputCpfCnpjComponent } from './base/Component/input-cpf-cnpj/input-cpf-cnpj.component';
import { PipeCpfCnpj } from './util/pipe-cpf-cnpj';
import { PaginationDataTable } from './base/pagination-data-table.component';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay'
import { SpinnerComponent } from './base/spinner.component';
import { VisualizarEmpresaComponent } from './empresa/crud/visualizar-empresa/visualizar-empresa.component';
import { AdicionarEditarEmpresaComponent } from './empresa/crud/adicionar-editar-empresa/adicionar-editar-empresa.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogConfirmation } from './base/dialog-confirmation.component';
import { MinhaEmpresaComponent } from './empresa/minha-empresa/minha-empresa.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';
import { LocalicazaoComponent } from './empresa/localicazao/localicazao.component';
import {MatDividerModule} from '@angular/material/divider';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { registerLocaleData } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import localebr from '@angular/common/locales/pt';


registerLocaleData(localebr);


export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    LoginComponent,
    EmpresaComponent,
    InputCpfCnpjComponent,
    PipeCpfCnpj,
    PaginationDataTable,
    VisualizarEmpresaComponent,
    AdicionarEditarEmpresaComponent,
    DialogConfirmation,
    MinhaEmpresaComponent,
    FuncionarioComponent,
    LocalicazaoComponent,
    MeuPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule ,
    FormsModule,
    NgxMaskModule.forRoot(options),
    MatSidenavModule,
    MatCheckboxModule,
    ScrollingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FlexLayoutModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatStepperModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9TL1CgSdWOj4HsLsRSfzuUDfWnvZuvDA',
      libraries: ['places']
    }),
    MatMomentDateModule
  ],
  providers: [AuthGuard,PadraoService,bObservableUsuario,ObservableBlockPanel,SpinnerComponent, MatSpinner,
    PipeCpfCnpj,MatDatepickerModule,  
    {provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
  entryComponents: [ MatSpinner,DialogConfirmation ],
})
export class AppModule { }
