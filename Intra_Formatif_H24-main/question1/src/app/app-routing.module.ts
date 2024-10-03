import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { formatifGuard } from './formatif.guard';
import { catGuard } from './cat.guard';
import { dogGuard } from './dog.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent ,canActivate : [formatifGuard,catGuard]},
  { path: 'dog', component: DogComponent ,canActivate : [formatifGuard,dogGuard]},
  { path: 'home', component: HomeComponent , canActivate : [formatifGuard]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
