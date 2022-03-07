// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridsterModule } from 'angular-gridster2';
import { ChartsModule } from 'ng2-charts';

// CSS FRAMEWORK ICONS
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';

// CONST
import { ROUTES } from './app.routes';

// COMPONENTS
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { GenericChartComponent } from './components/generic-chart/generic-chart.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { DashboardModalComponent } from './components/dashboard-modal/dashboard-modal.component';
import { WidgetModalComponent } from './components/widget-modal/widget-modal.component';
import { EditWidgetModalComponent } from './components/edit-widget-modal/edit-widget-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    GenericChartComponent,
    ModalComponent,
    DashboardModalComponent,
    WidgetModalComponent,
    EditWidgetModalComponent,
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(ROUTES),
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
