import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductComponent } from './modules/dashboard/dashboard-components/product/product.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { isLoggedInGuard } from './core/gaurds/is-logged-in.guard';
import { isLoggedOutGuard } from './core/gaurds/is-logged-out.guard';

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    canActivate:[isLoggedInGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'courses', loadChildren: () => import('./modules/courses/courses.module').then(m => m.CoursesModule) },
      { path: 'students', loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule) },
      { path: 'career', loadChildren: () => import('./modules/career/career.module').then(m => m.CareerModule) },
      // { path: "alerts", component: AlertsComponent },
      // { path: "table", component: ProductComponent },
      // { path: "menu", component: MenuComponent },
      // { path: "grid-list", component: GridListComponent },
      // {path:"forms", component:FormsComponent},
      // {path:"tabs", component:TabsComponent},
      // {path:"expansion", component:ExpansionComponent},
      // {path:"chips", component:ChipsComponent},
      // {path:"progress", component:ProgressComponent},
      // {path:"toolbar", component:ToolbarComponent},
      // {path:"progress-snipper", component:ProgressSnipperComponent},
      // {path:"snackbar", component:SnackbarComponent},
      // {path:"slider", component:SliderComponent},
      // {path:"slide-toggle", component:SlideToggleComponent},
      // {path:"tooltip", component:TooltipsComponent},
      // {path:"button", component:ButtonsComponent},
    ]
  },
  // { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path:'auth',
    canActivate:[isLoggedOutGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: "**", redirectTo: "/home", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
