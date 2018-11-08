import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectComponent} from './components/select/select.component';
import {ColumnsComponent} from './components/columns/columns.component';

const routes: Routes = [
  { path: 'select', component: SelectComponent},
  { path: 'columns', component: ColumnsComponent},
  { path: '', redirectTo: '/select', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
